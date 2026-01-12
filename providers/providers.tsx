'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';
import StoreProvider from './store-provider';
import AuthInitializer from '@/features/auth/components/auth-initializer';

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
