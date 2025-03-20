import { IAuthLoginInternal } from '@/domains/auth/infrastructure/AuthRepository';
import { Response } from '@/shared/types/Response';
import { User } from '@/domains/auth/domain/AuthTypes';

export class LoginUseCase {
  constructor(private authRepository: IAuthLoginInternal) {}

  async execute(email: string, password: string, dynamicKey: string): Promise<Response<User>> {
    const userResponse = await this.authRepository.login({ email, password, dynamicKey });
    return userResponse;
  }
}