import { IAuthLogout } from '@/domains/auth/domain/AuthRepository';

export class LogoutUseCase {
  constructor(private authRepository: IAuthLogout) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
} 