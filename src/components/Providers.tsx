'use client';

import { Provider } from 'react-redux';

import { AuthProvider } from '../domains/auth/presentation/AuthProvider';
import { store } from '../store/store';

import { Navigation } from './Navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigation />
        {children}
      </AuthProvider>
    </Provider>
  );
} 