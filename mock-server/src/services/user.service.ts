import { randomUUID } from 'node:crypto';
import { userRepository } from '../repositories/user.repository';
import type { CreateUserInput, User } from '../types/user.types';

export class DuplicateUserEmailError extends Error {
  constructor() {
    super('A user with this email already exists.');
    this.name = 'DuplicateUserEmailError';
  }
}

export class UserService {
  constructor(private readonly repository = userRepository) { }

  create(input: CreateUserInput): User {
    const email = input.email.toLowerCase();
    if (this.repository.findByEmail(email)) throw new DuplicateUserEmailError();

    const timestamp = new Date().toISOString();
    return this.repository.create({
      ...input,
      email,
      id: randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}

export const userService = new UserService();
