"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth";

type ViewState = "forgot" | "otp";

export function RecoverPasswordForm() {
    const [view, setView] = useState<ViewState>("forgot");
    const [email, setEmail] = useState("");

    // OTP State
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Form handling for Email step
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    // Timer logic for OTP
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);

    // --- Handlers ---

    const onEmailSubmit = async (data: ForgotPasswordValues) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Password reset requested for:", data.email);
        setEmail(data.email);
        setView("otp");
        setIsActive(true);
        setTimeLeft(30);
        setIsLoading(false);
    };

    const onOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const otpValue = otp.join("");
        console.log("Verifying Recovery OTP:", otpValue);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value.substring(element.value.length - 1);
        setOtp(newOtp);

        if (element.value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        setTimeLeft(30);
        setIsActive(true);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    };

    // --- Render Steps ---

    if (view === "otp") {
        return (
            <div className="w-full max-w-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
                <button
                    onClick={() => setView("forgot")}
                    className="absolute top-6 left-6 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="absolute top-6 right-6 text-xs italic opacity-60 font-serif text-muted-foreground">
                    security check
                </div>

                <div className="text-center mb-10 mt-2">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground font-serif">
                        Verify it's you
                    </h1>
                    <p className="text-sm md:text-base leading-relaxed max-w-xs mx-auto text-muted-foreground">
                        We've sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>.
                    </p>
                </div>

                <form onSubmit={onOtpSubmit} className="space-y-8">
                    <div className="flex justify-center gap-2 sm:gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="number"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                autoFocus={index === 0}
                                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm bg-background text-foreground"
                            />
                        ))}
                    </div>
                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-10 py-6 text-sm font-medium tracking-wide uppercase rounded-sm shadow-lg hover:shadow-xl transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse mr-2"></span>
                                    Verify Code
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                <div className="text-center pt-6">
                    <p className="text-xs text-muted-foreground">
                        Resend in {formatTime(timeLeft)}
                    </p>
                </div>
            </div>
        );
    }

    // Default: Forgot Password View
    return (
        <div className="w-full max-w-md bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/20 dark:border-white/10 relative overflow-hidden animate-in fade-in slide-in-from-left-8 duration-500">
            {/* Security Badge */}
            <div className="absolute top-6 right-6 text-xs font-serif italic text-muted-foreground opacity-70">
                security check
            </div>

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground mb-6 shadow-lg">
                    <Lock className="text-background w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground font-serif">
                    Recover Password
                </h1>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                    Don't worry, it happens. Enter your email and we'll send you a secure link to reset it.
                </p>
            </div>

            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="text-muted-foreground group-focus-within:text-foreground transition-colors w-5 h-5" />
                        </div>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="block w-full pl-11 pr-4 py-4 bg-background/50 border-none rounded-xl text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-inner outline-none"
                            aria-invalid={!!errors.email}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
                    )}
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
                            Send Reset Link
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Remember your password?</span>
                    <a href="/login" className="font-bold text-foreground hover:underline decoration-2 underline-offset-4">Login Now</a>
                </div>
            </div>
        </div>
    );
}
