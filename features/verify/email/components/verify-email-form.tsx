"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "../../../../features/auth/services/auth.service";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks/hooks";
import { verifyEmailThunk } from "@/store/features/auth/auth.thunk";

export function VerifyEmailForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [resendCount, setResendCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const dispatch = useAppDispatch();

    const RESEND_INTERVALS = [10, 20, 60, 120];
    const TIMER_KEY = `verify_timer`;

    useEffect(() => {
        if (!email) {
            setError("Email is missing from the verification request.");
            return;
        }

        const stored = localStorage.getItem(TIMER_KEY!);
        let targetTime: number;
        let count = 0;

        if (stored) {
            const parsed = JSON.parse(stored);
            targetTime = parsed.expiresAt;
            count = parsed.count;
            setResendCount(count);
        } else {
            const duration = RESEND_INTERVALS[0];
            targetTime = Date.now() + duration * 1000;
            localStorage.setItem(TIMER_KEY!, JSON.stringify({ expiresAt: targetTime, count: 0 }));
            setResendCount(0);
        }

        const calculateTimeLeft = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
            setTimeLeft(diff);
            return diff;
        };

        calculateTimeLeft();

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            if (remaining <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [email, TIMER_KEY]);

    const handleChange = (target: EventTarget & HTMLInputElement, index: number) => {
        const val = target.value;
        if (isNaN(Number(val))) return;

        const newOtp = [...otp];
        newOtp[index] = val.substring(val.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (val && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").split("");
        const newOtp = [...otp];
        data.forEach((char, i) => {
            if (i < 6 && !isNaN(Number(char))) {
                newOtp[i] = char;
            }
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(data.length, 5)]?.focus();
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter the complete 6-digit code.");
            return;
        }

        if (!email) {
            setError("Email address is missing.");
            return;
        }

        setIsVerifying(true);
        try {
            await dispatch(verifyEmailThunk({ email, otp: otpCode })).unwrap();
            setSuccess("Email verified successfully! Redirecting...");
            toast.success("Email verified successfully!");
            if (TIMER_KEY) localStorage.removeItem(TIMER_KEY);
            router.push("/home");
        } catch (err: any) {
            const msg = typeof err === 'string' ? err : (err.response?.data?.message || "Verification failed. Please try again.");
            setError(msg);
            toast.error(msg);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!email || !TIMER_KEY) return;
        try {
            await authService.resendOtp({ email });

            // Increment resend count and update timer
            const nextCount = resendCount + 1;
            const duration = RESEND_INTERVALS[Math.min(nextCount, RESEND_INTERVALS.length - 1)];
            const targetTime = Date.now() + duration * 1000;

            localStorage.setItem(TIMER_KEY, JSON.stringify({
                expiresAt: targetTime,
                count: nextCount
            }));

            setResendCount(nextCount);
            setTimeLeft(duration);

            setError(null);
            setSuccess("A new verification code has been sent.");
            toast.success("OTP resent successfully!");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Failed to resend OTP.";
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="w-full max-w-lg bg-card/80 backdrop-blur-xl border border-border rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden animate-in fade-in zoom-in duration-500">

            {/* Back Button */}
            <Link
                href="/register"
                className="absolute top-6 left-6 p-2 hover:bg-black/5 rounded-full transition-colors dark:text-white"
            >
                <ArrowLeft size={20} />
            </Link>

            {/* Security Badge */}
            <div className="absolute top-6 right-6 text-xs italic opacity-60 font-serif text-gray-500 dark:text-gray-400">
                security check
            </div>

            <div className="text-center mb-10 mt-2">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Verify it's you
                </h1>
                <p className="text-sm md:text-base leading-relaxed max-w-xs mx-auto text-gray-600 dark:text-gray-400">
                    We've sent a 6-digit code to <span className="font-semibold text-gray-900 dark:text-white">{email}</span>.
                </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
                <div className="flex justify-center gap-2 sm:gap-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { inputRefs.current[index] = el }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            autoFocus={index === 0}
                            className="otp-input w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    ))}
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-2 rounded animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/10 p-2 rounded animate-in fade-in slide-in-from-top-2">
                        {success}
                    </div>
                )}

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full sm:w-auto px-10 py-3 bg-black hover:bg-[#333333] dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-sm font-medium tracking-wide uppercase rounded-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isVerifying ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Verify Code
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="text-center pt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Didn't receive the code?
                    {timeLeft > 0 ? (
                        <span className="font-semibold ml-1 text-gray-900 dark:text-white">
                            Resend in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="font-semibold hover:underline ml-1 text-gray-900 dark:text-white"
                        >
                            Resend Now
                        </button>
                    )}
                </p>
            </div>

            <div className="mt-10 flex justify-center gap-6 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Secure
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Instant
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Encrypted
                </div>
            </div>

        </div>
    );
}