import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { userRole } from './features/auth/types';

const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/login', '/register', '/admin/login', '/forgot-password'];
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/home',
  '/seller',
  '/moderator'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const JWT_SECRET = process.env.JWT_SECRET_ACCESS_TOKEN;
  if (!JWT_SECRET) {
    console.log('JWT_SECRET_ACCESS_TOKEN is not defined');
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken')?.value;

  let userPayload = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      userPayload = payload;
    } catch (err) {
      console.log('Token verification failed:', err);
    }
  }

  const isAuthenticated = !!userPayload;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  const isAdminLogin = pathname === '/admin/login';

  if (!isAuthenticated) {
    if (isAdminRoute && !isAdminLogin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (isProtectedRoute) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }


  const roles = (userPayload?.roles as string[]) || [];
  const isAdmin = roles.includes(userRole.ADMIN);
  const isUser = roles.includes(userRole.USER);

  if (isAuthRoute) {
    if (isAdminLogin && isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (!isAdminLogin) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  if (isAdminRoute && !isAdminLogin) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  if (isProtectedRoute && !isUser) {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};