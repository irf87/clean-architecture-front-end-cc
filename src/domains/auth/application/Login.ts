import { Auth } from '@/domains/auth/domain/Auth';
import { LoginCredentials } from '@/domains/auth/domain/AuthTypes';
import { AuthRepository } from '@/domains/auth/infrastructure/AuthRepository';

export class LoginUseCase {
  constructor(
    private auth: Auth,
    private authRepository: AuthRepository
  ) {}

  async execute(credentials: LoginCredentials): Promise<void> {
    try {
      this.auth.setLoading(true);
      this.auth.setError(null);

      if (!this.auth.validateLoginCredentials(credentials)) {
        throw new Error('Invalid credentials');
      }

      const user = await this.authRepository.login(credentials);
      this.auth.setUser(user);
    } catch (error) {
      this.auth.setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      this.auth.setLoading(false);
    }
  }
} 