"use client";

import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminLogin } from "../hooks/useAdminlogin";


export const AdminLoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors, onSubmit, isSubmitting } = useAdminLogin();
    const params = useSearchParams();
    const error = params.get('error');

    return (

        <>


            <div className="w-full max-w-md bg-[#F0F6FA]/80  backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] shadow-xl p-8 md:p-10 relative overflow-hidden dark:bg-blue-500/10 fade-in dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Admin Login
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your admin credentials to access the dashboard.
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

                    {(errors.root || error) && (
                        <div className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-3 rounded-xl mb-4 font-medium animate-in fade-in slide-in-from-top-2">
                            {errors.root?.message || error}
                        </div>
                    )}



                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer bg-black hover:bg-[#333333] dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

            </div>



        </>
    );
};

