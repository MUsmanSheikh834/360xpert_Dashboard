export type ApiResponse<T> = {
  data: T;
  error?: { message: string; code?: string };
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  token: string;
  user: { id: string; email: string; role: "user" | "admin" };
};

// UserModule API response types
export type UserModuleApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
};

export type UserModuleErrorResponse = {
  success: false;
  message: string;
};
