import { describe, it, expect } from 'vitest';
import { authReducer, setUser, setLoading, setError, logout } from '@/domains/auth/store/authSlice';
import { AuthState, User } from '@/domains/auth/domain/AuthTypes';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    token: 'test-token',
  };

  describe('setUser reducer', () => {
    it('should handle setting user and update authentication state', () => {
      const nextState = authReducer(initialState, setUser(mockUser));

      expect(nextState.user).toEqual(mockUser);
      expect(nextState.isAuthenticated).toBe(true);
    });

    it('should handle setting user to null and update authentication state', () => {
      // First set a user
      const stateWithUser = authReducer(initialState, setUser(mockUser));
      // Then set user to null
      const nextState = authReducer(stateWithUser, setUser(null));

      expect(nextState.user).toBeNull();
      expect(nextState.isAuthenticated).toBe(false);
    });
  });

  describe('setLoading reducer', () => {
    it('should handle setting loading state to true', () => {
      const nextState = authReducer(initialState, setLoading(true));

      expect(nextState.isLoading).toBe(true);
    });

    it('should handle setting loading state to false', () => {
      // First set loading to true
      const loadingState = authReducer(initialState, setLoading(true));
      // Then set loading to false
      const nextState = authReducer(loadingState, setLoading(false));

      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('setError reducer', () => {
    it('should handle setting error message', () => {
      const errorMessage = 'Test error message';
      const nextState = authReducer(initialState, setError(errorMessage));

      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle clearing error message', () => {
      // First set an error
      const errorState = authReducer(initialState, setError('Test error'));
      // Then clear the error
      const nextState = authReducer(errorState, setError(null));

      expect(nextState.error).toBeNull();
    });
  });

  describe('logout reducer', () => {
    it('should reset auth state to initial values', () => {
      // First set up a logged-in state
      const loggedInState = authReducer(
        initialState,
        setUser({
          id: '1',
          email: 'test@example.com',
          token: 'test-token',
        })
      );

      // Then logout
      const nextState = authReducer(loggedInState, logout());

      expect(nextState.user).toBeNull();
      expect(nextState.isAuthenticated).toBe(false);
      // Other state properties should remain unchanged
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
    });
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      const nextState = authReducer(undefined, { type: 'unknown' });

      expect(nextState).toEqual(initialState);
    });
  });
}); 