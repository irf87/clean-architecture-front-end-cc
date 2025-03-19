import { Auth } from '../domain/Auth';
import { RegisterCredentials } from '../domain/AuthTypes';
import { AuthRepository } from '../infrastructure/AuthRepository';

export class RegisterUseCase {
  constructor(
    private auth: Auth,
    private authRepository: AuthRepository
  ) {}

  async execute(credentials: RegisterCredentials): Promise<void> {
    try {
      this.auth.setLoading(true);
      this.auth.setError(null);

      if (!this.auth.validateRegisterCredentials(credentials)) {
        throw new Error('Invalid registration data');
      }

      const user = await this.authRepository.register(credentials);
      this.auth.setUser(user);
    } catch (error) {
      this.auth.setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      this.auth.setLoading(false);
    }
  }
} 