import { AuthRepository } from '../domain/AuthRepository';

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
} 