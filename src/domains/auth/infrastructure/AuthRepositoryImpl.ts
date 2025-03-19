import { AuthRepository } from '../domain/AuthRepository';
import { User } from '../domain/AuthTypes';

import { API_ENDPOINTS, API_HEADERS } from './API';
export class AuthRepositoryImpl implements AuthRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  constructor() {}

  async login(credentials: { email: string; password: string; dynamicKey: string }): Promise<User> {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(API_ENDPOINTS.auth.logout, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
} 