import { AuthRepository } from '../domain/AuthRepository';
import { User } from '../domain/AuthTypes';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  async login(credentials: { email: string; password: string }): Promise<User> {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async register(userData: { name: string; email: string; password: string }): Promise<User> {
    const response = await fetch(`${this.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.API_URL}/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await fetch(`${this.API_URL}/auth/me`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  }
} 