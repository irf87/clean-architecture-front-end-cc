// Interface Segregation Principle (ISP) from SOLID principle

import { LoginCredentials, LoginInternalCredentials, User } from '@/domains/auth/domain/AuthTypes';
import { Response } from '@/shared/types/Response';

export interface IAuthLoginInternal {
  login(credentials: LoginInternalCredentials): Promise<Response<User>>;
}

export interface IAuthLogin {
  login(credentials: LoginCredentials): Promise<Response<User>>;
}

export interface IAuthLogout {
  logout(): Promise<void>;
}

export interface AuthClientRepository extends IAuthLoginInternal, IAuthLogout {}