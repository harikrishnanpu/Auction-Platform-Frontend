'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';
import AuthInitializer from '@/features/auth/components/auth-initializer';
import StoreProvider from './store-provider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AuthInitializer>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </AuthInitializer>
        </StoreProvider>
    );
}
