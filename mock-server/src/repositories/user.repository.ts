import type { User } from '../types/user.types';

export class UserRepository {
  private readonly users = new Map<string, User>();

  findByEmail(email: string): User | undefined {
    return [...this.users.values()].find((user) => user.email === email);
  }

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }
}

export const userRepository = new UserRepository();
