import { IAuthLogin } from '@/domains/auth/domain/AuthRepository';
import { User } from '@/domains/auth/domain/AuthTypes';
import { Response } from '@/shared/types/Response';

export class LoginUseCase {
  constructor(private authRepository: IAuthLogin) {}

  async execute(email: string, password: string): Promise<Response<User>> {
    const userResponse = await this.authRepository.login({ email, password });    
    return userResponse;
  }
}