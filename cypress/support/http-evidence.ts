/// <reference types="cypress-mochawesome-reporter" />

// These limits affect report copies only. Add credential names without changing tests.
export const httpEvidenceOptions = {
  maxFieldCharacters: 16 * 1024,
  additionalSensitiveKeys: [] as string[],
};

const REDACTED = '[REDACTED]';
const sensitiveKeys = new Set([
  'authorization', 'proxyauthorization', 'cookie', 'cookies', 'setcookie',
  'token', 'accesstoken', 'refreshtoken', 'idtoken', 'authtoken', 'xauthtoken',
  'bearer', 'password', 'passwd', 'pass', 'secret', 'clientsecret',
  'apikey', 'xapikey', 'privatekey',
]);
const normalizeKey = (key: string) => key.toLowerCase().replace(/[-_\s]/g, '');
const isSensitiveKey = (key: string) => sensitiveKeys.has(normalizeKey(key))
  || httpEvidenceOptions.additionalSensitiveKeys.some((extra) => normalizeKey(extra) === normalizeKey(key));

const usefulHeaders = new Set([
  'content-type', 'location', 'x-request-id', 'x-correlation-id',
  'request-id', 'correlation-id', 'traceparent', 'tracestate',
  'x-trace-id', 'x-amzn-trace-id', 'x-ms-request-id',
]);

function formatHeaders(headers: unknown): string {
  if (!headers || typeof headers !== 'object') return '(not available)';
  const relevant = Object.fromEntries(Object.entries(headers).filter(([key]) =>
    usefulHeaders.has(key.toLowerCase()) && !isSensitiveKey(key)));
  return formatHttpEvidence(relevant);
}

function sanitizeText(text: string): string {
  // Do not JSON.parse strings: doing so could round numeric literals in raw JSON.
  // Opaque JSON/form text with credential fields is omitted instead of guessed at.
  const jsonKeys = text.matchAll(/"([^"\\]+)"\s*:/g);
  for (const [, key] of jsonKeys) {
    if (isSensitiveKey(key)) return '[REDACTED: text containing credentials]';
  }
  for (const [, key] of text.matchAll(/(?:^|[?&;\s])([^\s=&;?]+)=/g)) {
    try {
      if (isSensitiveKey(decodeURIComponent(key))) return '[REDACTED: text containing credentials]';
    } catch {
      return '[Omitted: invalid encoded text]';
    }
  }
  return text.replace(/\b(Bearer|Basic)\s+[A-Za-z0-9+\/._~=-]+/gi, `$1 ${REDACTED}`);
}

function truncate(text: string, maximum = httpEvidenceOptions.maxFieldCharacters): string {
  const marker = '\n[TRUNCATED: evidence only]';
  return text.length <= maximum ? text : text.slice(0, Math.max(0, maximum - marker.length)) + marker;
}

/** Serialize a sanitized copy, preserving strings and the values Cypress actually yielded. */
export function formatHttpEvidence(value: unknown): string {
  if (value === undefined) return '(not available)';
  try {
    const seen = new WeakSet<object>();
    const formatted = JSON.stringify(value, (key, item: unknown) => {
      if (isSensitiveKey(key)) return REDACTED;
      if (typeof item === 'string') return sanitizeText(item);
      if (typeof item === 'bigint') return item.toString();
      if (item && typeof item === 'object') {
        if (ArrayBuffer.isView(item) || item instanceof ArrayBuffer || item instanceof Blob) {
          return '[Omitted: binary body]';
        }
        if (seen.has(item)) return '[Circular reference]';
        seen.add(item);
      }
      return item;
    }, 2);
    return truncate(formatted ?? '(not available)');
  } catch {
    // Reporting must not cause a functional request/assertion to fail.
    return '[Evidence unavailable: value cannot be serialized safely]';
  }
}

function requestUrl(url: string | undefined): string {
  if (!url) return '(not available)';
  try {
    const parsed = new URL(url, Cypress.config('baseUrl') || undefined);
    for (const key of new Set(parsed.searchParams.keys())) {
      if (isSensitiveKey(key)) parsed.searchParams.set(key, REDACTED);
    }
    // Show the endpoint; omit the origin, URL credentials and fragment.
    return truncate(`${parsed.pathname}${parsed.search}`.replace(/\b(Bearer|Basic)\s+[A-Za-z0-9+\/._~=-]+/gi, `$1 ${REDACTED}`));
  } catch {
    return '[Omitted: URL could not be sanitized safely]';
  }
}

// Cypress bundles support and specs separately. Share the sequence across both
// when a spec imports the helper directly as well as using custom commands.
const state = (Cypress as typeof Cypress & {
  httpEvidenceState?: { exchangeNumber: number };
}).httpEvidenceState ??= { exchangeNumber: 0 };
Cypress.on('test:before:run', () => { state.exchangeNumber = 0; });

/** Keep cy.api's options, status handling, retries and yielded response unchanged. */
export function apiWithEvidence(options: Partial<Cypress.RequestOptions>): Cypress.Chainable<Cypress.Response<any>> {
  return cy.then(() => {
    const number = ++state.exchangeNumber;
    const attempt = Cypress.currentRetry > 0 ? ` (attempt ${Cypress.currentRetry + 1})` : '';
    const title = `HTTP #${number}  ${options.method || 'GET'} ${requestUrl(options.url)}${attempt}`;
    const request = [
      'Request',
      `Query params:\n${formatHttpEvidence(options.qs)}`,
      `Headers:\n${formatHeaders(options.headers)}`,
      `Body:\n${formatHttpEvidence(options.body)}`,
    ].join('\n\n');
    const context = {
      title,
      value: `${request}\n\nResponse\n(not available: cy.api has not yielded a response)`,
    };

    // Attach before execution so a Cypress failure still leaves request evidence.
    // The installed reporter keeps this context object until test:after:run.
    cy.addTestContext(context);
    return cy.api(options).then((response) => {
      context.value = [
        `Status: ${response.status}`,
        `Duration: ${response.duration} ms`,
        request,
        `Sent request headers:\n${formatHeaders(response.requestHeaders)}`,
        'Response',
        `Headers:\n${formatHeaders(response.headers)}`,
        `Body:\n${formatHttpEvidence(response.body)}`,
      ].join('\n\n');
      return response;
    });
  });
}
