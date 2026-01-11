'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon, ArrowLeft, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import api from '@/lib/axios';
import { setCredentials } from '@/store/slices/auth/auth.slice';
import Link from 'next/link';
import { RootState } from '@/store/store';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const email = searchParams.get('email');

    // Authentication Guard
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/home');
        }
    }, [isAuthenticated, router]);

    // Redirect if no email (only if not authenticated)
    useEffect(() => {
        if (!email && !isAuthenticated) {
            router.push('/register');
        }
        setMounted(true);
    }, [email, router, isAuthenticated]);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);

    // Input Handlers
    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;
        const newOtp = [...otp];
        newOtp[index] = element.value.slice(-1);
        setOtp(newOtp);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Clear error when user types
        if (error) setError('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        if (!/^\d+$/.test(data)) return;

        const splitData = data.split('').slice(0, 6);
        const newOtp = [...otp];

        splitData.forEach((digit, i) => {
            newOtp[i] = digit;
        });
        setOtp(newOtp);

        const focusIndex = Math.min(splitData.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleResend = async () => {
        try {
            await api.post('/auth/resend-otp', { email });
            setTimeLeft(30);
            setIsActive(true);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            setSuccess('Code resent successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend code');
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Please enter a complete 6-digit code');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            const response = await api.post('/auth/verify-email', { email, otp: otpValue });

            setSuccess('Email verified successfully!');

            // If the backend returns user/token, log them in
            if (response.data.user || response.data.token) {
                // Adjust based on your API response structure, assuming standard wrapper
                // If api wrapper strips 'data', use response directly
                // Check axios setup structure. Usually response.data is the payload
                dispatch(setCredentials({ user: response.data.user }));
            }

            // Redirect to home page
            setTimeout(() => {
                router.push('/home');
            }, 1000);

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    if (!mounted) return null;

    const toggleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800`}>

            {/* Navigation */}
            <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
                <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Hammr.Down
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/register" className="hidden md:block text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Register</Link>
                    <button
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        onClick={toggleDarkMode}
                    >
                        {theme === 'dark' ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-gray-900" />}
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>

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
                                    type="number"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index)}
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
            </main>

            {/* Footer */}
            <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
                <div>© 2024 Hammr.Down Inc.</div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
                </div>
            </footer>

            <style jsx global>{`
        .otp-input::-webkit-inner-spin-button,
        .otp-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .otp-input {
          -moz-appearance: textfield;
        }
      `}</style>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}