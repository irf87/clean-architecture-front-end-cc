import { LoginCredentials, User } from '@/domains/auth/domain/AuthTypes';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
} 