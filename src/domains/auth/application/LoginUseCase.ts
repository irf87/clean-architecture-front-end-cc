import { IAuthLoginInternal } from '@/domains/auth/domain/AuthRepository';
import { User } from '@/domains/auth/domain/AuthTypes';
import { Response } from '@/shared/types/Response';

export class LoginUseCase {
  constructor(private authRepository: IAuthLoginInternal) {}

  async execute(email: string, password: string, dynamicKey: string): Promise<Response<User>> {
    const userResponse = await this.authRepository.login({ email, password, dynamicKey });
    return userResponse;
  }
}