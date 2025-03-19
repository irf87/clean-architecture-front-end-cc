import { LoginCredentials, RegisterCredentials, User } from '../domain/AuthTypes';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<User>;
  register(credentials: RegisterCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
} 