"use client";

import React, { useEffect } from "react";
import { ModeratorLandingView } from "@/components/moderator/landing-view";
import { useAppSelector } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ModeratorLandingPage() {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;
    }

    if (!isAuthenticated) return null;

    return <ModeratorLandingView />;
}