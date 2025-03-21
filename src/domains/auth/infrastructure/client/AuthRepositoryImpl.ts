import { User } from '@/domains/auth/domain/AuthTypes';
import { API_ENDPOINTS_CLIENT, API_HEADERS } from '@/domains/auth/infrastructure/API';
import { AuthClientRepository } from '@/domains/auth/infrastructure/AuthRepository';
import { Response } from '@/shared/types/Response';
export class AuthRepositoryImpl implements AuthClientRepository {

  constructor() {}

  async login(credentials: { email: string; password: string; dynamicKey: string }): Promise<Response<User>> {
    try {
      const response = await fetch(API_ENDPOINTS_CLIENT.auth.login, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(API_ENDPOINTS_CLIENT.auth.logout, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
} 