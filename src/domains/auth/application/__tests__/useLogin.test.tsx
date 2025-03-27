import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LoginUseCase } from '@/domains/auth/application/LoginUseCase';
import { useLogin } from '@/domains/auth/application/useLogin';
import { User } from '@/domains/auth/domain/AuthTypes';
import { authReducer } from '@/domains/auth/store/authSlice';
import { generateDynamicKey } from '@/utils/keyGenerator';


// Mock dependencies
vi.mock('@/domains/auth/application/LoginUseCase');
vi.mock('@/utils/keyGenerator');
vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

describe('useLogin', () => {
  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    token: 'test-token',
  };

  const mockDynamicKey = 'test-dynamic-key';

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    (generateDynamicKey as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDynamicKey);
  });

  it('should handle successful login', async () => {
    // Mock successful login response
    (LoginUseCase.prototype.execute as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockUser,
      error: null,
    });

    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    let userResponse: User | undefined;
    await act(async () => {
      userResponse = await result.current.login('test@example.com', 'password');
    });

    expect(userResponse).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(LoginUseCase.prototype.execute).toHaveBeenCalledWith(
      'test@example.com',
      'password',
      mockDynamicKey
    );
  });

  it('should handle login failure', async () => {
    const errorMessage = 'Invalid credentials';
    // Mock failed login response
    (LoginUseCase.prototype.execute as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: null,
      error: errorMessage,
    });

    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.login('test@example.com', 'wrong-password');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle login with no data and no error', async () => {
    // Mock response with no data and no error
    (LoginUseCase.prototype.execute as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: null,
      error: null,
    });

    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Login failed');
  });

  it('should set loading state during login process', async () => {
    // Mock a delayed response to test loading state
    (LoginUseCase.prototype.execute as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: mockUser, error: null }), 100))
    );

    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    expect(result.current.isLoading).toBe(false);

    let loginPromise: Promise<User | undefined>;
    await act(async () => {
      loginPromise = result.current.login('test@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      await loginPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });
}); 