import { User } from './AuthTypes';

export interface AuthRepository {
  login(credentials: { email: string; password: string }): Promise<User>;
  register(userData: { email: string; password: string }): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
} 