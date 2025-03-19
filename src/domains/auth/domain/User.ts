import { User as UserType } from './AuthTypes';

export class User {
  private id: string;
  private email: string;
  private name: string;
  private role: string;

  constructor(user: UserType) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }

  toJSON(): UserType {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
    };
  }
} 