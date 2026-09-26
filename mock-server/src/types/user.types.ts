export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: UserStatus;
}

export interface User extends CreateUserInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
