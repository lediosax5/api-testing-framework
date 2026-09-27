export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: UserStatus;
}

export type PatchUserInput = Partial<CreateUserInput>;

export interface User extends CreateUserInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type UserSortField = 'firstName' | 'lastName' | 'email' | 'age' | 'status' | 'createdAt' | 'updatedAt';

export interface ListUsersOptions {
  page: number;
  limit: number;
  status?: UserStatus;
  search?: string;
  sortBy: UserSortField;
  order: 'asc' | 'desc';
}

export interface ListUsersResult {
  items: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
