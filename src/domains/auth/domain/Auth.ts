import { User, LoginCredentials, RegisterCredentials } from './AuthTypes';

export class Auth {
  private user: User | null = null;
  private isAuthenticated: boolean = false;
  private isLoading: boolean = false;
  private error: string | null = null;

  constructor() {}

  setUser(user: User | null): void {
    this.user = user;
    this.isAuthenticated = !!user;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  setError(error: string | null): void {
    this.error = error;
  }

  getState() {
    return {
      user: this.user,
      isAuthenticated: this.isAuthenticated,
      isLoading: this.isLoading,
      error: this.error,
    };
  }

  validateLoginCredentials(credentials: LoginCredentials): boolean {
    return !!credentials.email && !!credentials.password;
  }

  validateRegisterCredentials(credentials: RegisterCredentials): boolean {
    return (
      !!credentials.email &&
      !!credentials.password &&
      credentials.password === credentials.confirmPassword
    );
  }
} 