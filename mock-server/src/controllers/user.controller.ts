import type { Request, Response } from 'express';
import { DuplicateUserEmailError, userService } from '../services/user.service';
import type { CreateUserInput } from '../types/user.types';

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
