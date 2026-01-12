"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { authService } from "@/features/auth/services/auth.service";
import { toast } from "sonner";

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!token || !email) {
        return (
            <div className="w-full max-w-md bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/20 dark:border-white/10 text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Invalid Link</h1>
                <p className="text-muted-foreground mb-6">
                    This password reset link is invalid or missing required information.
                </p>
                <a href="/forgot-password" className="text-primary hover:underline font-medium">Request a new link</a>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.resetPassword({
                email,
                otp: token, // Mapping token to otp field as backend expects
                newPassword
            });

            if (response.success) {
                toast.success("Password reset successfully! Please login.");
                router.push("/login");
            } else {
                toast.error(response.message || "Failed to reset password");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid token or request failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/20 dark:border-white/10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground mb-6 shadow-lg">
                    <Lock className="text-background w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-3xl font-bold mb-3 text-foreground font-serif">
                    Reset Password
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    Enter your new password below.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">
                        New Password
                    </label>
                    <div className="relative group">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full px-4 py-4 bg-background/50 border-none rounded-xl text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-inner outline-none"
                            placeholder="******"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">
                        Confirm Password
                    </label>
                    <div className="relative group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full px-4 py-4 bg-background/50 border-none rounded-xl text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-inner outline-none"
                            placeholder="******"
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Change Password
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
