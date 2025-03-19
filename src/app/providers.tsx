'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </Provider>
  );
} 