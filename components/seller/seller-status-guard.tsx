"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kycService } from "@/features/kyc/services/kyc.service";
import { Loader2 } from "lucide-react";

interface SellerStatusGuardProps {
    children: React.ReactNode;
}

export function SellerStatusGuard({ children }: SellerStatusGuardProps) {
    const [status, setStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const data = await kycService.getStatus();
                setStatus(data.status);

                // If they have already submitted, they should probably see the status
                // instead of the landing page which prompts for submission
                if (data.status === 'PENDING' || data.status === 'VERIFIED' || data.status === 'REJECTED') {
                    // Redirect to the KYC page which already handles showing the status
                    router.push('/seller/kyc');
                }
            } catch (error) {
                console.error("Failed to fetch KYC status in guard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkStatus();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    // If status is NOT_SUBMITTED, allow access to the landing page (which prompts to start)
    return <>{children}</>;
}
