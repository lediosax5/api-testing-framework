import type { NextFunction, Request, Response } from 'express';
import { validateCreateUser, validatePatchUser } from '../schemas/user.schema';

export interface ApiErrorBody {
  type: string;
  title: string;
  status: number;
  code: string;
  detail: string;
  instance: string;
  errors?: Array<{ field: string; message: string }>;
}

function validateUserBodyRequest(
  request: Request,
  response: Response,
  next: NextFunction,
  instance: string,
): void {
  const result = validateCreateUser(request.body as unknown);
  if (result.errors.length > 0) {
    const body: ApiErrorBody = {
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

export function validateCreateUserRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  validateUserBodyRequest(request, response, next, '/api/v1/users');
}

export function validateReplaceUserRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  validateUserBodyRequest(request, response, next, `${request.baseUrl}${request.path}`);
}

export function validatePatchUserRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const result = validatePatchUser(request.body as unknown);
  if (result.errors.length > 0) {
    const body: ApiErrorBody = {
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
