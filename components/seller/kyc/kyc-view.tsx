"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/layout/navbars/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PersonalInfo } from "@/components/shared/kyc/personal-info";
import { DocumentUpload } from "@/components/shared/kyc/document-upload";
import { LivenessCheck } from "@/components/shared/kyc/liveness-check";
import { KycStatus } from "@/components/shared/kyc/kyc-status";

import { useState, useEffect } from "react";
import { kycService } from "@/features/kyc/services/kyc.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { kycSubmissionSchema } from "@/features/kyc/schemas/kyc.schema";
import { UploadedFile } from "@/components/shared/kyc/document-upload";

export function SellerKycView() {
    const [status, setStatus] = useState<string>('loading');
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [livenessCompleted, setLivenessCompleted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const data = await kycService.getStatus();
            setStatus(data.status || 'NOT_SUBMITTED');

            // If there's an existing profile, we might want to populate uploadedFiles
            if (data.profile) {
                const files: UploadedFile[] = [];
                if (data.profile.id_front_url) {
                    files.push({ documentType: 'id_front', fileKey: data.profile.id_front_url, fileName: 'ID Front', fileSize: 0, status: 'success' });
                }
                if (data.profile.id_back_url) {
                    files.push({ documentType: 'id_back', fileKey: data.profile.id_back_url, fileName: 'ID Back', fileSize: 0, status: 'success' });
                }
                if (data.profile.address_proof_url) {
                    files.push({ documentType: 'address_proof', fileKey: data.profile.address_proof_url, fileName: 'Address Proof', fileSize: 0, status: 'success' });
                }
                setUploadedFiles(files);

                // Assuming if they have documents, liveness might have been done too,
                // but usually, liveness is a separate flag. Check if profile has it.
                if (data.profile.verification_status === 'PENDING' || data.profile.verification_status === 'VERIFIED') {
                    setLivenessCompleted(true);
                }
            }
        } catch (error) {
            console.log("Failed to load KYC status", error);
            setStatus('NOT_SUBMITTED');
        }
    };

    const handleUploadSuccess = (file: UploadedFile) => {
        setUploadedFiles(prev => [
            ...prev.filter(f => f.documentType !== file.documentType),
            file
        ]);
    };

    const handleSubmit = async () => {
        try {
            // Validate using Zod
            const validationData = {
                idFront: uploadedFiles.find(f => f.documentType === 'id_front' && f.status === 'success')?.fileKey || "",
                idBack: uploadedFiles.find(f => f.documentType === 'id_back' && f.status === 'success')?.fileKey || "",
                addressProof: uploadedFiles.find(f => f.documentType === 'address_proof' && f.status === 'success')?.fileKey || "",
                livenessCheck: livenessCompleted,
            };

            const parseResult = kycSubmissionSchema.safeParse(validationData);

            if (!parseResult.success) {
                const errors = parseResult.error.flatten().fieldErrors;
                if (errors.idFront) toast.error(errors.idFront[0]);
                else if (errors.idBack) toast.error(errors.idBack[0]);
                else if (errors.addressProof) toast.error(errors.addressProof[0]);
                else if (errors.livenessCheck) toast.error(errors.livenessCheck[0]);
                return;
            }

            setLoading(true);
            await kycService.submitKyc();
            toast.success("KYC submitted for approval successfully!");
            setStatus('PENDING');
            window.scrollTo(0, 0); // Scroll to top to see status
        } catch (error: any) {
            console.log("Submit error:", error);
            toast.error(error.response?.data?.message || "Failed to submit KYC");
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen font-sans bg-background text-foreground flex items-center justify-center">
                <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </div>
        );
    }

    // If Pending or Verified, show a focused Status View (or redirect logic if that was preferred, but in-place is better)
    if (status === 'PENDING' || status === 'VERIFIED' || status === 'REJECTED') {
        return (
            <div className="min-h-screen font-sans transition-colors duration-300 bg-background text-foreground">
                <DashboardHeader />
                <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-4 font-serif">
                            KYC Application Status
                        </h1>
                        <p className="text-muted-foreground">
                            Here is the current status of your application.
                        </p>
                    </div>
                    <KycStatus status={status} />

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => router.push('/seller/landing')}
                            className="text-primary hover:underline"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans transition-colors duration-300 bg-background text-foreground">
            {/* Background Gradient */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(135deg,var(--background)_0%,var(--muted)_100%)]" />

            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
                        Seller KYC Verification
                    </h1>
                    <p className="text-muted-foreground">
                        Complete your identity verification to unlock selling privileges and
                        list high-value luxury assets.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form Area (Left) */}
                    <div className="lg:col-span-8 space-y-6">
                        <PersonalInfo />
                        <DocumentUpload
                            uploadedFiles={uploadedFiles}
                            onUploadSuccess={handleUploadSuccess}
                        />
                        <LivenessCheck
                            isCompleted={livenessCompleted}
                            onComplete={setLivenessCompleted}
                        />
                    </div>

                    {/* Sidebar Status (Right) */}
                    <div className="lg:col-span-4 space-y-6">
                        <KycStatus status={status} />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex justify-end gap-4 border-t border-border pt-6">
                    <button className="px-6 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                        Save Draft
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-foreground text-background px-8 py-3 rounded-lg text-sm font-bold hover:bg-foreground/90 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : "Submit for Approval"} <ArrowRight size={16} />
                    </button>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
