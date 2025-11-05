export type UserModuleUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Request body for creating a new user
export type CreateUserRequest = Omit<UserModuleUser, "_id" | "createdAt" | "updatedAt"> & {
  isActive?: boolean;
};

// Request body for updating an existing user
export type UpdateUserRequest = Partial<CreateUserRequest>;

// Query parameters for filtering/searching user list
export type UserListParams = {
  search?: string;
  city?: string;
  country?: string;
  gender?: "Male" | "Female" | "Other";
  isActive?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
};

// Response shape for paginated user list
export type UserListResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: UserModuleUser[];
};
