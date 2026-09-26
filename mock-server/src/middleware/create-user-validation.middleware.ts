import type { NextFunction, Request, Response } from 'express';
import { validateCreateUser } from '../schemas/user.schema';

export interface ApiErrorBody {
  type: string;
  title: string;
  status: number;
  code: string;
  detail: string;
  instance: string;
  errors?: Array<{ field: string; message: string }>;
}

export function validateCreateUserRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const result = validateCreateUser(request.body as unknown);
  if (result.errors.length > 0) {
    const body: ApiErrorBody = {
      type: 'validation-error',
      title: 'Validation Error',
      status: 400,
      code: 'USR-400-01',
      detail: 'Request validation failed.',
      instance: '/api/v1/users',
      errors: result.errors,
    };
    response.status(400).json(body);
    return;
  }

  response.locals.createUserInput = result.data;
  next();
}
