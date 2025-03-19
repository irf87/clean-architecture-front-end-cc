import { AuthRepository } from '@/domains/auth/domain/AuthRepository';

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
} 