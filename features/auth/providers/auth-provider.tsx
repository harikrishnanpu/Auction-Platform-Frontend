"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getCurrentUserThunk } from "@/store/features/auth/auth.thunk";
import { useEffect, useRef } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { isHydrated, isLoading } = useAppSelector((state) => state.auth);
    const initiated = useRef(false);

    useEffect(() => {
        if (!initiated.current) {
            initiated.current = true;
            dispatch(getCurrentUserThunk());
        }
    }, [dispatch]);

    if (!isHydrated) {
        // Show a loading screen while we verify the session from cookies
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
}
