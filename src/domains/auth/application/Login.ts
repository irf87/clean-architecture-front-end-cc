import { Auth } from '../domain/Auth';
import { LoginCredentials } from '../domain/AuthTypes';
import { AuthRepository } from '../infrastructure/AuthRepository';

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