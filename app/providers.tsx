'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import AuthInitializer from '@/components/auth/auth-initializer';
import { store } from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </AuthInitializer>
        </Provider>
    );
}
