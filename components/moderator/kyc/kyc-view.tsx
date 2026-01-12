"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/layout/navbars/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PersonalInfo } from "@/components/shared/kyc/personal-info";
import { DocumentUpload } from "@/components/shared/kyc/document-upload";
import { LivenessCheck } from "@/components/shared/kyc/liveness-check";
import { KycStatus } from "@/components/shared/kyc/kyc-status";

export function ModeratorKycView() {
    return (
        <div className="min-h-screen font-sans transition-colors duration-300 bg-background text-foreground">
            {/* Background Gradient */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(135deg,var(--background)_0%,var(--muted)_100%)]" />

            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
                        Moderator KYC Verification
                    </h1>
                    <p className="text-muted-foreground">
                        Complete your identity verification to access moderator privileges and high-value auction management.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form Area (Left) */}
                    <div className="lg:col-span-8 space-y-6">
                        <PersonalInfo />
                        <DocumentUpload />
                        <LivenessCheck />
                    </div>

                    {/* Sidebar Status (Right) */}
                    <div className="lg:col-span-4 space-y-6">
                        <KycStatus />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex justify-end gap-4 border-t border-border pt-6">
                    <button className="px-6 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                        Save Draft
                    </button>
                    <button className="bg-foreground text-background px-8 py-3 rounded-lg text-sm font-bold hover:bg-foreground/90 transition-all shadow-lg flex items-center gap-2">
                        Submit for Approval <ArrowRight size={16} />
                    </button>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
