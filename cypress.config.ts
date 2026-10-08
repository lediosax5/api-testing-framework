import { defineConfig } from 'cypress';

const configuredApiBaseUrl = process.env.API_BASE_URL?.trim();
const configuredPort = process.env.PORT?.trim();
const port = configuredPort || '3000';
const baseUrl = configuredApiBaseUrl || `http://localhost:${port}`;
const invalidBaseUrlMessage = configuredApiBaseUrl
  ? `Invalid API_BASE_URL: "${configuredApiBaseUrl}". Expected a valid HTTP or HTTPS URL.`
  : `Invalid Cypress API target: "${baseUrl}". Expected a valid HTTP or HTTPS URL.`;

let parsedBaseUrl: URL;
try {
  parsedBaseUrl = new URL(baseUrl);
} catch {
  throw new Error(invalidBaseUrlMessage);
}

if (parsedBaseUrl.protocol !== 'http:' && parsedBaseUrl.protocol !== 'https:') {
  throw new Error(invalidBaseUrlMessage);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports',
    reportTitle: `API Test Execution - ${timestamp}`,
    reportPageTitle: 'API Testing Framework',
    reportFilename: `api-test-report_${timestamp}`,
    overwrite: false,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  video: false,

  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/apis/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      console.log(`[Cypress] API target: ${config.baseUrl}`);
      require('cypress-mochawesome-reporter/plugin')(on);

      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToConsole: 'onFail',
        printLogsToFile: 'always',
        outputRoot: `${config.projectRoot}/logs/`,
        specRoot: 'cypress/e2e',
        outputTarget: {
          'cypress-logs|txt': 'txt',
        },
      });

      return config;
    },
  },
});
