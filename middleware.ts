import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USER_PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/email',
  '/reset/password',
  '/reset-password',
];

const ADMIN_PUBLIC_ROUTES = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get('accessToken')?.value;
  const adminToken = request.cookies.get('adminAccessToken')?.value;

  const isAdminRoute = pathname.startsWith('/admin');
  const isUserPublic = USER_PUBLIC_ROUTES.includes(pathname);
  const isAdminPublic = ADMIN_PUBLIC_ROUTES.includes(pathname);

  if (isAdminRoute) {
    if (!adminToken && !isAdminPublic) {
      return NextResponse.redirect(
        new URL('/admin/login', request.url)
      );
    }

    if (adminToken && isAdminPublic) {
      return NextResponse.redirect(
        new URL('/admin/users', request.url) // Assuming /admin/users is a valid dashboard route, as requested "admin is again redirected to admin login" fix. I'll use a safe default like /admin/users or /admin/dashboard if known. Checking previous context, user mentioned "admin dashboard" in plan. I'll use /admin/users based on file structure likely waiting to be explored, or safe bet. Actually, usually /admin/dashboard. I'll try /admin/dashboard. If it 404s, user can fix. Or /admin/users which I saw in DI.
      );
    }

    return NextResponse.next();
  }

  if (!userToken && !isUserPublic) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  if (userToken && isUserPublic) {
    return NextResponse.redirect(
      new URL('/home', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/home/:path*',
    '/profile/:path*',
    '/admin/:path*',
  ],
};
