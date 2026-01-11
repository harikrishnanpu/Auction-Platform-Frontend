import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow /admin/login to be accessed without authentication
    // Admin routes are protected at the application level using admin tokens in localStorage
    // The middleware just ensures /admin/login is accessible
    if (pathname.startsWith('/admin')) {
        // Allow login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }
        
        // For other admin routes, let them through - protection happens in the app
        // (checking adminToken from localStorage is done client-side)
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
