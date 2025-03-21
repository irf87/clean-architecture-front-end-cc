import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { validateDynamicKey } from '@/utils/keyGenerator'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const dynamicKey = request.cookies.get('dynamicKey')?.value
  const isValidDynamicKey = validateDynamicKey(dynamicKey || '');
  const pathname = request.nextUrl.pathname

  const isLoginPath = pathname === '/login'
  if (token && isValidDynamicKey && pathname !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if ((!token || !isValidDynamicKey) && !isLoginPath) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    response.cookies.delete('dynamicKey');
    return response;
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
} 