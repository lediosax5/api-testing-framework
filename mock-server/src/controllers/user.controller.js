const { DuplicateUserEmailError, userService } = require('../services/user.service');

function createUser(_request, response) {
  const input = response.locals.createUserInput;
  try {
    const user = userService.create(input);
    response.location(`/api/v1/users/${user.id}`).status(201).json(user);
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      response.status(409).json({
        type: 'conflict',
        title: 'Resource Conflict',
        status: 409,
        code: 'USR-409-01',
        detail: 'A user with this email already exists.',
        instance: '/api/v1/users',
      });
      return;
    }
    throw error;
  }
}

function getUsers(_request, response) {
  const options = response.locals.listUsersOptions;
  response.status(200).json(userService.getAll(options));
}

function getUserById(request, response) {
  const id = response.locals.userId;
  const user = userService.getById(id);
  if (!user) {
    response.status(404).json({
      type: 'not-found',
      title: 'Resource Not Found',
      status: 404,
      code: 'USR-404-01',
      detail: 'User was not found.',
      instance: `${request.baseUrl}${request.path}`,
    });
    return;
  }
  response.status(200).json(user);
}

function replaceUser(request, response) {
  const id = response.locals.userId;
  const input = response.locals.createUserInput;
  try {
    const user = userService.replace(id, input);
    if (!user) {
      response.status(404).json({
        type: 'not-found',
        title: 'Resource Not Found',
        status: 404,
        code: 'USR-404-01',
        detail: 'User was not found.',
        instance: `${request.baseUrl}${request.path}`,
      });
      return;
    }
    response.status(200).json(user);
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      response.status(409).json({
        type: 'conflict',
        title: 'Resource Conflict',
        status: 409,
        code: 'USR-409-01',
        detail: 'A user with this email already exists.',
        instance: `${request.baseUrl}${request.path}`,
      });
      return;
    }
    throw error;
  }
}

function patchUser(request, response) {
  const id = response.locals.userId;
  const input = response.locals.patchUserInput;
  try {
    const user = userService.patch(id, input);
    if (!user) {
      response.status(404).json({
        type: 'not-found',
        title: 'Resource Not Found',
        status: 404,
        code: 'USR-404-01',
        detail: 'User was not found.',
        instance: `${request.baseUrl}${request.path}`,
      });
      return;
    }
    response.status(200).json(user);
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      response.status(409).json({
        type: 'conflict',
        title: 'Resource Conflict',
        status: 409,
        code: 'USR-409-01',
        detail: 'A user with this email already exists.',
        instance: `${request.baseUrl}${request.path}`,
      });
      return;
    }
    throw error;
  }
}

function deleteUser(request, response) {
  const id = response.locals.userId;
  if (!userService.delete(id)) {
    response.status(404).json({
      type: 'not-found',
      title: 'Resource Not Found',
      status: 404,
      code: 'USR-404-01',
      detail: 'User was not found.',
      instance: `${request.baseUrl}${request.path}`,
    });
    return;
  }
  response.status(204).send();
}

module.exports = { createUser, getUsers, getUserById, replaceUser, patchUser, deleteUser };
