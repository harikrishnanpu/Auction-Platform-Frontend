"use client";

import { useAppSelector } from "@/store/hooks/hooks";
import { userRole } from "@/features/auth/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: userRole[];
    requireAuth?: boolean;
}

export default function AuthGuard({
    children,
    allowedRoles,
    requireAuth = true
}: AuthGuardProps) {
    const { user, isAuthenticated, isHydrated, error } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isHydrated) return;

        if (requireAuth && !isAuthenticated) {
            const errorParam = error ? `?error=${encodeURIComponent(error)}` : '';
            if (window.location.pathname.startsWith('/admin')) {
                router.replace(`/admin/login${errorParam}`);
            } else {
                router.replace(`/login${errorParam}`);
            }
            return;
        }

        if (allowedRoles && user) {
            const hasPermission = allowedRoles.some(role => user.roles.includes(role));
            if (!hasPermission) {
                if (user.roles.includes(userRole.USER)) {
                    router.replace('/home');
                } else if (user.roles.includes(userRole.ADMIN)) {
                    router.replace('/admin');
                } else {
                    router.replace('/');
                }
            }
        }
    }, [isHydrated, isAuthenticated, user, allowedRoles, requireAuth, router]);

    if (!isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) return null;

    if (allowedRoles && user) {
        const hasPermission = allowedRoles.some(role => user.roles.includes(role));
        if (!hasPermission) return null;
    }

    return <>{children}</>;
}
