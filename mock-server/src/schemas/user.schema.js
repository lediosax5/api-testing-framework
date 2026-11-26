const { z } = require('zod');

const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.email().max(100),
  age: z.number().int().min(18).max(120),
  status: z.enum(['ACTIVE', 'INACTIVE']),
}).strict();

const patchUserSchema = createUserSchema.partial();

const fieldOrder = ['firstName', 'lastName', 'email', 'age', 'status'];

const messages = {
  firstName: 'Must contain between 2 and 50 characters.',
  lastName: 'Must contain between 2 and 50 characters.',
  email: 'Must be a valid email address.',
  age: 'Must be an integer.',
  status: 'Must be one of: ACTIVE, INACTIVE.',
};

function validateUserInput(value, schema, requireAllFields) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { errors: [{ field: 'body', message: 'Must be a JSON object.' }] };
  }

  const result = schema.safeParse(value);

  const input = value;
  const unknownKeys = result.success ? [] : result.error.issues
    .filter((issue) => issue.code === 'unrecognized_keys')
    .flatMap((issue) => issue.code === 'unrecognized_keys' ? issue.keys : [])
    .sort();
  if (result.success) {
    if (requireAllFields || fieldOrder.some((field) => field in input) || unknownKeys.length > 0) {
      return { data: result.data, errors: [] };
    }
    return { errors: [{ field: 'body', message: 'At least one field must be provided.' }] };
  }

  const errors = [];

  for (const field of fieldOrder) {
    const fieldIssues = result.error.issues.filter((issue) => issue.path[0] === field);
    if (fieldIssues.length === 0 && field in input) continue;

    if (!(field in input)) {
      if (requireAllFields) errors.push({ field, message: 'Field is required.' });
      continue;
    }

    const issue = fieldIssues[0];
    let message = messages[field];
    if (issue.code === 'invalid_type' || issue.code === 'invalid_value') {
      if (field === 'age') message = 'Must be an integer.';
      else if (field === 'status' && typeof input.status !== 'string') message = 'Must be a string.';
      else if (field !== 'status' && typeof input[field] !== 'string') message = 'Must be a string.';
    } else if (field === 'age' && issue.code === 'too_small') {
      message = 'Must be greater than or equal to 18.';
    } else if (field === 'age' && issue.code === 'too_big') {
      message = 'Must be less than or equal to 120.';
    } else if (field === 'email' && issue.code === 'too_big') {
      message = 'Must contain no more than 100 characters.';
    } else if ((field === 'firstName' || field === 'lastName') && issue.code === 'too_small') {
      message = 'Must contain between 2 and 50 characters.';
    } else if ((field === 'firstName' || field === 'lastName') && issue.code === 'too_big') {
      message = 'Must contain between 2 and 50 characters.';
    }

    errors.push({ field, message });
  }

  for (const key of unknownKeys) {
    errors.push({ field: key, message: 'Field is not allowed.' });
  }

  if (!requireAllFields && !fieldOrder.some((field) => field in input) && unknownKeys.length === 0) {
    errors.push({ field: 'body', message: 'At least one field must be provided.' });
  }

  return { errors };
}

function validateCreateUser(value) {
  return validateUserInput(value, createUserSchema, true);
}

function validatePatchUser(value) {
  return validateUserInput(value, patchUserSchema, false);
}

module.exports = {
  createUserSchema,
  patchUserSchema,
  validateCreateUser,
  validatePatchUser,
};
