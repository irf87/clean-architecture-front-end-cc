export interface User {
  id: string;
  email: string;
  token?: string;
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

export interface LoginInternalCredentials extends LoginCredentials {
  dynamicKey: string;
}