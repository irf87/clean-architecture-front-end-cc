import { AuthRepository } from '@/domains/auth/domain/AuthRepository';
import { User } from '@/domains/auth/domain/AuthTypes';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: { email: string; password: string }): Promise<User> {
    return this.authRepository.login(credentials);
  }
}