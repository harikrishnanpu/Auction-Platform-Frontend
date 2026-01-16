
'use client';

import { AdminLoginForm } from "@/features/admin/auth/components/login-form";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userRole } from "@/features/auth/types";
import { useEffect } from "react";

const AdminLoginPage = () => {

    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user?.roles.includes(userRole.ADMIN)) {
            window.location.href = '/admin';
        }
    },[isAuthenticated, user])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
            <main className="min-h-screen flex items-center justify-center p-4 py-20 relative">
                <AdminLoginForm />
            </main>
        </div>
    );
};

export default AdminLoginPage;
