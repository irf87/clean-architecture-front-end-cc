import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from '@/domains/auth/ui/LoginForm';
import { render } from '@/test/test-utils';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useLogin hook
vi.mock('@/domains/auth/application/useLogin', () => ({
  useLogin: () => ({
    login: vi.fn(),
    isLoading: false,
    error: null,
  }),
}));

describe('LoginForm', () => {
  it('should show validation errors for empty fields', async () => {
    const { getByRole, getByLabelText, findByText } = render(<LoginForm />);
    
    // Find the submit button and inputs
    const submitButton = getByRole('button', { name: /login/i });
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    
    // Initially the button should be disabled
    expect(submitButton).toBeDisabled();
    
    // Submit the form to trigger validation
    const form = emailInput.closest('form');
    fireEvent.submit(form!);
    
    // Check for validation messages
    const emailError = await findByText('El email es requerido');
    const passwordError = await findByText('La contraseña es requerida');
    
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('should show error for invalid email format', async () => {
    const { getByLabelText, findByText } = render(<LoginForm />);
    
    const emailInput = getByLabelText(/email/i);
    const form = emailInput.closest('form');
    
    // Type invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(form!);
    
    // Check for validation message
    const emailError = await findByText('Correo electrónico inválido');
    expect(emailError).toBeInTheDocument();
  });

  it('should enable submit button when form is valid', async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByRole('button', { name: /login/i });
    
    // Initially button should be disabled
    expect(submitButton).toBeDisabled();
    
    // Fill in valid data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Button should become enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should handle form submission with valid data', async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    
    // Fill in valid data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Form should be valid and button enabled
    await waitFor(() => {
      const submitButton = getByRole('button', { name: /login/i });
      expect(submitButton).not.toBeDisabled();
    });
  });
}); 