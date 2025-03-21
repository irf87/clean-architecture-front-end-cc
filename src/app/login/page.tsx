'use client';
import { LoginForm } from '@/domains/auth/ui/LoginForm';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-subtle p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Login</h1>
        
        <div className="bg-surface rounded-lg shadow-card p-6 space-y-4">
          <Button variant="primary" size="medium">
            Click me
          </Button>

          <Button variant="secondary" size="small" isLoading>
            Loading...
          </Button>

          <Button variant="tertiary" size="large" fullWidth>
            Full Width Button
          </Button>

          <LoginForm />
        </div>
      </div>
    </div>
  );
} 