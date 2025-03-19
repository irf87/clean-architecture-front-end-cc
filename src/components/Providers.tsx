'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AuthProvider } from '../domains/auth/ui/AuthProvider';
import { Navigation } from './Navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
} 