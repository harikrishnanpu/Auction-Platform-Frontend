'use client';

import React, { useEffect } from "react";
import { SellerLandingView } from "@/components/seller/landing-view";
import { useAppSelector } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { userRole } from "@/features/auth/types";
import { Loader2 } from "lucide-react";

export default function SellerLandingPage() {
    const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login");
            } else if (user && !user.roles.includes(userRole.SELLER)) {
                // Or maybe redirect to home if they are just a user but not a seller? 
                // Actually they might be applying to be a seller, so accessing landing is fine?
                // The user said "make the seller/landing ... only for logged in users".
                // So generic auth check is fine. Role check might block aspiring sellers.
                // Let's stick to auth check only for landing.
            }
        }
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;
    }

    if (!isAuthenticated) return null; // or loader, useEffect will redirect

    return <SellerLandingView />;
}