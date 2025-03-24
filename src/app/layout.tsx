import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { AuthProvider } from '@/domains/auth/presentation/AuthProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/presentation/design-system/providers/ThemeProvider';
import { Providers } from '@/store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi Apoyo Front End Technical Test',
  description: 'Technical test for Multi Apoyo Front End position',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Providers>
              <AuthProvider>
                {children}
              </AuthProvider>
            </Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
