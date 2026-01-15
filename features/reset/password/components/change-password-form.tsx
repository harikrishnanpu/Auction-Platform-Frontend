
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { useChangePassword } from "../hooks/useChangePassword";

export function ResetPasswordForm() {
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [showPassword, setShowPassword] = useState(false); 

    const { register, handleSubmit, errors, isSubmitting, onSubmit } = useChangePassword();

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">
                        New Password
                    </label>
                    <div className="relative group">
                        <input
                            {...register("newPassword")}
                            type={showPassword ? "text" : "password"}
                            className="block w-full px-4 py-4 bg-background/50 border-none rounded-xl text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-inner outline-none"
                            placeholder="******"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.newPassword.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">
                        Confirm Password
                    </label>
                    <div className="relative group">
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            className="block w-full px-4 py-4 bg-background/50 border-none rounded-xl text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-inner outline-none"
                            placeholder="******"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div>
                    {
                        errors.root && (
                            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-2 rounded">{errors.root.message}</div>
                        )
                    }
                </div>



                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                    {isSubmitting ? (
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
