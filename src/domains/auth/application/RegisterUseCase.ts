import { AuthRepository } from '@/domains/auth/domain/AuthRepository';
import { User } from '@/domains/auth/domain/AuthTypes';

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: { email: string; password: string }): Promise<User> {
    return this.authRepository.register(userData);
  }
} 