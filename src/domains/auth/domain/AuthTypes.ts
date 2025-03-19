export interface User {
  id: string;
  email: string;
  role: string;
}

export type UserType = User;

export interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  confirmPassword: string;
} 