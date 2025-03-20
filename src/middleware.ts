import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateDynamicKey } from '@/utils/keyGenerator'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const dynamicKey = request.cookies.get('dynamicKey')?.value
  const isValidDynamicKey = validateDynamicKey(dynamicKey || '');
  const pathname = request.nextUrl.pathname
  console.log('\npathname', pathname);
  // Define public paths that don't require authentication
  const isLoginPath = pathname === '/login'
  console.log('token', token);
  console.log('dynamicKey 2', dynamicKey);
  // If trying to access auth pages while logged in
  if (token && isValidDynamicKey && pathname !== '/dashboard') {
    console.log('redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  console.log('isValidDynamicKey', isValidDynamicKey);
  // If trying to access protected pages without auth
  if ((!token || !isValidDynamicKey) && !isLoginPath) {
    console.log('redirecting to login');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    response.cookies.delete('dynamicKey');
    return response;
  }
  console.log('no redirect');

  // If token exists but dynamicKey is invalid
  // if (token && dynamicKey && !validateDynamicKey(dynamicKey)) {
  //   // Clear invalid cookies
  //   const response = NextResponse.redirect(new URL('/login', request.url))
  //   response.cookies.delete('token')
  //   response.cookies.delete('dynamicKey')
  //   return response
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
} 