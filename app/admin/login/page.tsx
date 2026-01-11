"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { LoginFormValues, loginSchema } from '@/features/auth/schemes/register-schema';
import { loginAdminThunk } from '@/store/features/admin/admin-auth.thunk';
import { useAppDispatch } from '@/store/hooks/hooks';

const AdminLoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        try {
            const result = await dispatch(loginAdminThunk(data)).unwrap();

            // Redirect happens after state update
            router.push('/admin');
        } catch (error: any) {
            console.error(error);
            setError('root', {
                message: error || 'Access Denied. Admin privileges required.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-100 font-sans p-4">
            <div className="w-full max-w-md bg-[#1e293b] border border-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
                    <p className="text-sm text-gray-400">Restricted access area. Please identify yourself.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="block w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                            placeholder="admin@hammerdown.com"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Password</label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type="password"
                                className="block w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-600">
                                <Lock size={16} />
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>
                        )}
                    </div>

                    {errors.root && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <AlertCircle size={18} className="flex-shrink-0" />
                            <span>{errors.root.message}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <span>Authenticate</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        Unauthorized access attempts will be logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
