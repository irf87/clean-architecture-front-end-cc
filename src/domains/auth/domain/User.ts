import { User as UserType } from './AuthTypes';

export class User {
  private id: string;
  private email: string;

  constructor(user: UserType) {
    this.id = user.id;
    this.email = user.email;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  toJSON(): UserType {
    return {
      id: this.id,
      email: this.email,
    };
  }
} 