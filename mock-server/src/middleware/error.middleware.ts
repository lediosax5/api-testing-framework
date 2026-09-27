import type { NextFunction, Request, Response } from 'express';

interface ParserError extends Error {
  type?: string;
}

export function errorHandler(
  error: ParserError,
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (error.type === 'entity.parse.failed' && /^\/api\/v1\/users(?:\/|$)/.test(request.path)) {
    response.status(400).json({
      type: 'invalid-json',
      title: 'Invalid JSON',
      status: 400,
      code: 'REQ-400-01',
      detail: 'Request body contains invalid JSON.',
      instance: request.path,
    });
    return;
  }
  next(error);
}
