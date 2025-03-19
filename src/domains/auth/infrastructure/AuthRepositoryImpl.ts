import { AuthRepository } from '../domain/AuthRepository';
import { User } from '../domain/AuthTypes';
import { EncryptionService } from '../../../services/encryption';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  private encryptionService: EncryptionService;

  constructor() {
    this.encryptionService = EncryptionService.getInstance();
  }

  async login(credentials: { email: string; password: string; dynamicKey: string }): Promise<User> {
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
      // Encrypt sensitive data before returning
      return this.encryptSensitiveUserData(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: { name: string; email: string; password: string }): Promise<User> {
    try {
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      // Encrypt sensitive data before returning
      return this.encryptSensitiveUserData(user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.API_URL}/auth/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.API_URL}/auth/me`);
      if (!response.ok) {
        return null;
      }
      const user = await response.json();
      // Encrypt sensitive data before returning
      return this.encryptSensitiveUserData(user);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  private encryptSensitiveUserData(user: User): User {
    // Only encrypt sensitive fields like token if they exist
    const encryptedUser = { ...user };
    if ('token' in encryptedUser && encryptedUser.token) {
      encryptedUser.token = this.encryptionService.encryptSensitiveData(encryptedUser.token);
    }
    return encryptedUser;
  }
} 