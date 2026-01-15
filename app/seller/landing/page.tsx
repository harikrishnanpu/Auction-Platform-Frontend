'use client';

import React, { useEffect } from "react";
import { SellerLandingView } from "@/components/seller/landing-view";
import { useAppSelector } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { userRole } from "@/features/auth/types";
import { Loader2 } from "lucide-react";

import { SellerStatusGuard } from "@/components/seller/seller-status-guard";

export default function SellerLandingPage() {
    const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login");
            }
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;
    }

    if (!isAuthenticated) return null;

    return (
        <SellerStatusGuard>
            <SellerLandingView />
        </SellerStatusGuard>
    );
}