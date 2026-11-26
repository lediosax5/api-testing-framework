const { validateCreateUser, validatePatchUser } = require('../schemas/user.schema');

function validateUserBodyRequest(request, response, next, instance) {
  const result = validateCreateUser(request.body);
  if (result.errors.length > 0) {
    const body = {
      type: 'validation-error',
      title: 'Validation Error',
      status: 400,
      code: 'USR-400-01',
      detail: 'Request validation failed.',
      instance,
      errors: result.errors,
    };
    response.status(400).json(body);
    return;
  }

  response.locals.createUserInput = result.data;
  next();
}

function validateCreateUserRequest(request, response, next) {
  validateUserBodyRequest(request, response, next, '/api/v1/users');
}

function validateReplaceUserRequest(request, response, next) {
  validateUserBodyRequest(request, response, next, `${request.baseUrl}${request.path}`);
}

function validatePatchUserRequest(request, response, next) {
  const result = validatePatchUser(request.body);
  if (result.errors.length > 0) {
    const body = {
      type: 'validation-error',
      title: 'Validation Error',
      status: 400,
      code: 'USR-400-01',
      detail: 'Request validation failed.',
      instance: `${request.baseUrl}${request.path}`,
      errors: result.errors,
    };
    response.status(400).json(body);
    return;
  }

  response.locals.patchUserInput = result.data;
  next();
}

module.exports = {
  validateCreateUserRequest,
  validateReplaceUserRequest,
  validatePatchUserRequest,
};
