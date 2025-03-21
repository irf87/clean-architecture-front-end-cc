'use client';
import { LoginForm } from '@/domains/auth/ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-subtle p-4 flex items-center justify-center">
      <div className="max-w-md w-full" id="login-form">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">Login</h1>
        
        <div className="bg-surface rounded-lg shadow-card p-6 space-y-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 