import type { Request, Response } from 'express';
import { userService } from '../services/user.service';

export function resetTestState(_request: Request, response: Response): void {
  userService.reset();
  response.status(204).send();
}
