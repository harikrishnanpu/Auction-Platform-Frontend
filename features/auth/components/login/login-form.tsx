"use client";

import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import { SiginWithGoogleButton } from "@/components/ui/buttons/google-signin";
import { useSearchParams } from "next/navigation";


const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors, onSubmit, isSubmitting } = useLogin();

    const params = useSearchParams();
    const error = params.get('error');

    return (

        <>


            <div className="w-full max-w-md bg-[#F0F6FA]/80  backdrop-blur-xl border dark:bg-blue-500/10 rounded-[2rem] shadow-xl p-8 md:p-10 relative overflow-hidden fade-in dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your credentials to access your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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


                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                            <Link
                                href="/reset/password"
                                className="text-xs font-semibold text-black dark:text-white hover:underline"
                            >
                                Forgot Password?
                            </Link>
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


            {(errors.root || error ) && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-2 rounded">{errors.root?.message || error}</div>
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
                <div className="grid grid-cols-1 gap-4">

                    <SiginWithGoogleButton handleClick={() => {
                        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                        window.location.href = `${backendUrl}user/auth/google?callBack=login`;
                    }} />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
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