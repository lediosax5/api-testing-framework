export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UsersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetUsersResponse {
  items: User[];
  pagination: UsersPagination;
}
