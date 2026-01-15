import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';



function hasAuth(roles: string[], role: string): Boolean {
    if (roles.includes(role)) {
        return true;
    }
    return false;
}

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedPath =
        path.startsWith('/dashboard') ||
        path.startsWith('/profile') ||
        path.startsWith('/admin') ||
        path.startsWith('/settings') ||
        path.startsWith('/home') ||
        path.startsWith('/seller') ||
        path.startsWith('/moderator');

    const tokenCookie = request.cookies.get('accessToken');
    const token = tokenCookie?.value;

    if (!token && isProtectedPath) {
        if (path == "/admin/login") {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    let userRoles = [];


    if (token) {
        try {
            console.log(process.env.JWT_SECRET_ACCESS_TOKEN)
            const result = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN || '') as any;
            userRoles = result.roles;
        } catch (error) {
            console.error("JWT Verification Error:", error);
        }
    }


    const isAuthPath = path === '/login' || path === '/register' || path === '/forgot-password' || path === '/reset-password';

    const isAdminAuthPath = path === '/admin/login';


    if (isProtectedPath) {
        if (path == "/admin/login") {
            return NextResponse.next();
        }
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(url);
    }

    if (isAdminAuthPath && hasAuth(userRoles, 'ADMIN')) {
        return NextResponse.redirect(new URL('/admin/', request.url));
    }

    if (isAuthPath && hasAuth(userRoles, 'USER')) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
