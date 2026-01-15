import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const hasAuth = request.cookies.has('accessToken') || request.cookies.has('refreshToken');
    const path = request.nextUrl.pathname;

    const isProtectedPath = path.startsWith('/dashboard') ||
        path.startsWith('/profile') ||
        path.startsWith('/admin') ||
        path.startsWith('/settings') ||
        path.startsWith('/home');

    const isAuthPath = path === '/login' || path === '/register';

    if (isProtectedPath && !hasAuth) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(url);
    }

    // Only redirect to /home if they are accessing an auth path AND have an active session cookie
    if (isAuthPath && hasAuth) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
