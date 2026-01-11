'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { getCurrentUserThunk } from '@/store/features/auth/auth.thunk';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const PUBLIC_ROUTES = ['/', '/login', '/register', '/email'];

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token && !isAuthenticated) {
                await dispatch(getCurrentUserThunk());
            }
            setIsInitialized(true);
        };

        if (!isInitialized) {
            initAuth();
        }
    }, [dispatch, isAuthenticated, isInitialized]);

    useEffect(() => {
        if (!isInitialized) return;

        // If authenticated and on a public route, redirect to home
        if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
            router.push('/home');
        }

        // If not authenticated and on a protected route (not public), redirect to login
        // Note: We need to be careful with "not public" check. 
        // Ideally we should list protected routes or just standard convention.
        // For now, assuming everything NOT public is protected.
        // Also need to allow some global public assets or unrelated routes if any.
        // Given user request "restrict from landing, verify, login, register pages", 
        // the main requirement is guarding these specific pages against logged in users.
        // And guarding protected pages against logged out users.

        if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
            // Check if it's a verify page with query params? No, strict check on pathname.
            // But pathname doesn't include query params.
            // /email is in PUBLIC_ROUTES, so it's allowed for unauthenticated.
            // But valid use case: User registers -> /email (authenticated? No, usually temporary token or no token yet?
            // Wait, verifyEmailThunk logs them in. BEFORE verification, they are NOT logged in.
            // So /email must be public.

            router.push('/');
        }
    }, [isInitialized, isAuthenticated, pathname, router]);

    if (!isInitialized || (isLoading && !isAuthenticated && localStorage.getItem('token'))) {
        // Show loader while initializing or valid token being checked
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
