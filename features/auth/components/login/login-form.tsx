"use client";

import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";
import { useTheme } from "next-themes";
import { useState } from "react";


const LoginForm = () => {

    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors, onSubmit, isSubmitting } = useLogin();

    return (

        <>

            {/* Main Content */}

            <div className="w-full max-w-md bg-[#F0F6FA]/80  backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] shadow-xl p-8 md:p-10 relative overflow-hidden fade-in dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your credentials to access your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors w-5 h-5" />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="name@example.com"
                                className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                            <a
                                href="/auth/recover-password"
                                className="text-xs font-semibold text-black dark:text-white hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors w-5 h-5" />
                            </div>
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="block w-full pl-11 pr-12 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
                        )}
                    </div>

                    {errors.root && (
                        <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-2 rounded">{errors.root.message}</div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black hover:bg-[#333333] dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin dark:border-black/30 dark:border-t-black"></span>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#F0F6FA] dark:bg-[#252525] text-gray-500 dark:text-gray-400 rounded-lg">Or continue with</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Social Buttons (kept as UI placeholders for now as logic isn't requested yet) */}
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors bg-white/50 dark:bg-transparent">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors bg-white/50 dark:bg-transparent">
                        <svg className="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 24 24">
                            <path d="M17.5 13c.24 3.65 3.19 4.87 3.33 4.92-.04.14-.52 1.77-1.72 3.53-1.04 1.52-2.12 3.03-3.83 3.06-1.67.03-2.21-.99-4.13-.99-1.93 0-2.53 1-4.23 1.04-1.68.04-2.98-1.68-4.06-3.24-2.21-3.21-3.9-9.08-1.63-13.01 1.13-1.96 3.15-3.21 5.35-3.24 1.61-.03 3.13 1.08 4.12 1.08 1 0 2.86-1.34 4.82-1.14 1.64.12 3.1.84 4.09 2.21-.11.07-2.43 1.41-2.4 5.39zM15.58 2.22c.86-1.04 1.44-2.48 1.28-3.92-1.24.05-2.73.83-3.62 1.86-.8.92-1.49 2.4-1.3 3.82 1.38.11 2.78-.73 3.64-1.76z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Apple</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-bold text-black dark:text-white hover:underline transition-all">
                            Create Account
                        </Link>
                    </p>
                </div>

            </div>



        </>
    );
};

export default LoginForm;