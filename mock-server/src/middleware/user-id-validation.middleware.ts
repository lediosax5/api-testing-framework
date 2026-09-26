import { z } from 'zod';
import type { NextFunction, Request, Response } from 'express';

const userIdSchema = z.uuid();

export function validateUserId(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const parsedId = userIdSchema.safeParse(request.params.id);
  if (!parsedId.success) {
    response.status(400).json({
      type: 'validation-error',
      title: 'Validation Error',
      status: 400,
      code: 'USR-400-02',
      detail: 'Path parameter validation failed.',
      instance: `${request.baseUrl}${request.path}`,
      errors: [{ field: 'id', message: 'Must be a valid UUID.' }],
    });
    return;
  }
  response.locals.userId = parsedId.data;
  next();
}
