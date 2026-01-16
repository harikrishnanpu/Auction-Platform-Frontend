"use client";

import AuthGuard from "@/features/auth/components/auth-guard";
import { userRole } from "@/features/auth/types";
import { LandingFooter } from "@/components/layout/footers/landingFooter";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard allowedRoles={[userRole.USER]}>
            <div className="font-sans transition-colors duration-300 bg-background text-foreground dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
                <LandingFooter />
            </div>
        </AuthGuard>
    );
}
