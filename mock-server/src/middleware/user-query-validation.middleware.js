const knownParameters = ['page', 'limit', 'status', 'search', 'sortBy', 'order'];

const sortFields = ['firstName', 'lastName', 'email', 'age', 'status', 'createdAt', 'updatedAt'];
const statuses = ['ACTIVE', 'INACTIVE'];

function parseInteger(
  field,
  value,
  errors,
  minimum,
  maximum,
  defaultValue,
) {
  if (value === undefined) return defaultValue ?? minimum;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    errors.push({ field, message: 'Must be an integer.' });
    return defaultValue ?? minimum;
  }
  if (parsed < minimum) errors.push({ field, message: `Must be greater than or equal to ${minimum}.` });
  if (maximum !== undefined && parsed > maximum) errors.push({ field, message: `Must be less than or equal to ${maximum}.` });
  return parsed;
}

function validateUserListQuery(request, response, next) {
  const parameters = new URL(request.originalUrl, 'http://localhost').searchParams;
  const errors = [];
  const values = new Map();

  for (const field of knownParameters) {
    const allValues = parameters.getAll(field);
    if (allValues.length > 1) {
      errors.push({ field, message: 'Must contain a single value.' });
    } else if (allValues.length === 1) {
      values.set(field, allValues[0]);
    }
  }

  const unknownParameters = [...new Set([...parameters.keys()].filter((key) => !knownParameters.includes(key)))].sort();

  const page = parseInteger('page', values.get('page'), errors, 1, undefined, 1);
  const limit = parseInteger('limit', values.get('limit'), errors, 1, 100, 10);

  const rawStatus = values.get('status');
  if (rawStatus !== undefined && !statuses.includes(rawStatus)) {
    errors.push({ field: 'status', message: 'Must be one of: ACTIVE, INACTIVE.' });
  }

  const rawSearch = values.get('search');
  const search = rawSearch?.trim();
  if (search !== undefined && (search.length < 1 || search.length > 100)) {
    errors.push({ field: 'search', message: 'Must contain between 1 and 100 characters.' });
  }

  const rawSortBy = values.get('sortBy');
  if (rawSortBy !== undefined && !sortFields.includes(rawSortBy)) {
    errors.push({ field: 'sortBy', message: 'Must be one of: firstName, lastName, email, age, status, createdAt, updatedAt.' });
  }

  const rawOrder = values.get('order');
  if (rawOrder !== undefined && rawOrder !== 'asc' && rawOrder !== 'desc') {
    errors.push({ field: 'order', message: 'Must be one of: asc, desc.' });
  }

  const unknownErrors = unknownParameters.map((field) => ({ field, message: 'Query parameter is not allowed.' }));
  const orderedErrors = knownParameters.flatMap((field) => errors.filter((error) => error.field === field));
  orderedErrors.push(...unknownErrors);

  if (orderedErrors.length > 0) {
    response.status(400).json({
      type: 'validation-error',
      title: 'Validation Error',
      status: 400,
      code: 'USR-400-03',
      detail: 'Query parameter validation failed.',
      instance: request.originalUrl,
      errors: orderedErrors,
    });
    return;
  }

  const options = {
    page,
    limit,
    status: rawStatus,
    search,
    sortBy: rawSortBy ?? 'createdAt',
    order: rawOrder ?? 'asc',
  };
  response.locals.listUsersOptions = options;
  next();
}

module.exports = { validateUserListQuery };
