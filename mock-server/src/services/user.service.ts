import { randomUUID } from 'node:crypto';
import { userRepository } from '../repositories/user.repository';
import type { CreateUserInput, ListUsersOptions, ListUsersResult, User } from '../types/user.types';

export class DuplicateUserEmailError extends Error {
  constructor() {
    super('A user with this email already exists.');
    this.name = 'DuplicateUserEmailError';
  }
}

export class UserService {
  constructor(private readonly repository = userRepository) { }

  private normalizeSearchValue(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

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

  getById(id: string): User | undefined {
    return this.repository.findById(id);
  }

  getAll(options: ListUsersOptions): ListUsersResult {
    let users = this.repository.findAll();
    if (options.status) users = users.filter((user) => user.status === options.status);
    if (options.search) {
      const search = this.normalizeSearchValue(options.search);
      users = users.filter((user) =>
        this.normalizeSearchValue(user.firstName).includes(search)
        || this.normalizeSearchValue(user.lastName).includes(search)
        || this.normalizeSearchValue(user.email).includes(search));
    }

    const direction = options.order === 'asc' ? 1 : -1;
    users.sort((left, right) => {
      const leftValue = left[options.sortBy];
      const rightValue = right[options.sortBy];
      let comparison: number;
      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        comparison = leftValue - rightValue;
      } else {
        const leftString = String(leftValue).toLowerCase();
        const rightString = String(rightValue).toLowerCase();
        comparison = leftString < rightString ? -1 : leftString > rightString ? 1 : 0;
      }
      if (comparison === 0) comparison = left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
      return comparison * direction;
    });

    const total = users.length;
    const start = (options.page - 1) * options.limit;
    return {
      items: users.slice(start, start + options.limit),
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        totalPages: Math.ceil(total / options.limit),
      },
    };
  }
}

export const userService = new UserService();
