import { IAuthLogin } from '@/domains/auth/infrastructure/AuthRepository';
import { User } from '@/domains/auth/domain/AuthTypes';
import { Response } from '@/shared/types/Response';

import { API_ENDPOINTS_SERVER, API_HEADERS } from '@/domains/auth/infrastructure/API';

export class AuthRepositoryImpl implements IAuthLogin {

  constructor() {}

  async login(credentials: { email: string; password: string;  }): Promise<Response<User>> {
    let status = 200;
    try {
      const response = await fetch(API_ENDPOINTS_SERVER.auth.login, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      status = response.status;

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.error || 'Login failed');
      }

      const user = await response.json();
      return {
        data: user,
        status,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Login failed',
        status,
      };
    }
  }
} 