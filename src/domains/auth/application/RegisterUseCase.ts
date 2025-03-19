import { AuthRepository } from '../domain/AuthRepository';
import { User } from '../domain/AuthTypes';

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: { name: string; email: string; password: string }): Promise<User> {
    return this.authRepository.register(userData);
  }
} 