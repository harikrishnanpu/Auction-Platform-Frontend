import { ThemeProvider } from 'next-themes';
import React from 'react';
import StoreProvider from './store-provider';
import AuthProvider from '@/features/auth/providers/auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AuthProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </StoreProvider>
    );
}
