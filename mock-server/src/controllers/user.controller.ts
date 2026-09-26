import type { Request, Response } from 'express';
import { DuplicateUserEmailError, userService } from '../services/user.service';
import type { CreateUserInput } from '../types/user.types';
import type { ListUsersOptions } from '../types/user.types';

export function createUser(_request: Request, response: Response): void {
  const input = response.locals.createUserInput as CreateUserInput;
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

export function getUsers(_request: Request, response: Response): void {
  const options = response.locals.listUsersOptions as ListUsersOptions;
  response.status(200).json(userService.getAll(options));
}

export function getUserById(request: Request, response: Response): void {
  const id = response.locals.userId as string;
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
