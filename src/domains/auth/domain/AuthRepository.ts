import { User } from './AuthTypes';

export interface AuthRepository {
  login(credentials: { 
    email: string; 
    password: string;
    dynamicKey: string;
  }): Promise<User>;
  logout(): Promise<void>;
} 