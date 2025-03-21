import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from '@/store/provider';
import { AuthProvider } from '@/domains/auth/ui/AuthProvider';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider } from '@/presentation/design-system/providers/ThemeProvider';

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
                <ToastProvider>
                  {children}
                </ToastProvider>
              </AuthProvider>
            </Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
