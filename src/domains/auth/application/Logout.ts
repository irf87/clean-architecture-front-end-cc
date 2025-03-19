import { Auth } from '@/domains/auth/domain/Auth';
import { AuthRepository } from '@/domains/auth/infrastructure/AuthRepository';

export class LogoutUseCase {
  constructor(
    private auth: Auth,
    private authRepository: AuthRepository
  ) {}

  async execute(): Promise<void> {
    try {
      this.auth.setLoading(true);
      this.auth.setError(null);

      await this.authRepository.logout();
      this.auth.setUser(null);
    } catch (error) {
      this.auth.setError(error instanceof Error ? error.message : 'Logout failed');
      throw error;
    } finally {
      this.auth.setLoading(false);
    }
  }
} 