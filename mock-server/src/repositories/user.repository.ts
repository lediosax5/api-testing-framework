import type { User } from '../types/user.types';
import { usersSeed } from '../data/users.seed';

export class UserRepository {
  private readonly users = new Map<string, User>(usersSeed.map((user) => [user.id, user]));

  findAll(): User[] {
    return [...this.users.values()];
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  findByEmail(email: string): User | undefined {
    return [...this.users.values()].find((user) => user.email === email);
  }

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  update(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}

export const userRepository = new UserRepository();
