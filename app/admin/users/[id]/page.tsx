'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Mail, Edit, MapPin, Phone, ShieldCheck, Flag, AlertTriangle, Wallet, TrendingUp,
    CheckCircle, ArrowLeft, Ban
} from 'lucide-react';
import axios from '@/lib/axios';

interface UserDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar_url?: string;
    roles: string[];
    is_active: boolean;
    is_blocked: boolean;
    is_verified: boolean;
    joined_at: string;
}

const AdminUserDetail = () => {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('bids');

    useEffect(() => {
        if (params.id) {
            fetchUser(params.id as string);
        }
    }, [params.id]);

    const fetchUser = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/users/${id}`);
            setUser(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center">User not found</div>;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            {/* Breadcrumb & Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <span
                                onClick={() => router.back()}
                                className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
                            >
                                <ArrowLeft size={14} /> Users
                            </span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 dark:text-white font-medium">User #{user.id.substring(0, 8)}</span>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {user.name}
                            {user.is_verified && (
                                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-sans font-bold tracking-wide uppercase border border-green-200 dark:border-green-800">Verified</span>
                            )}
                            {user.roles.includes('ADMIN') && (
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-sans font-bold tracking-wide uppercase border border-blue-200 dark:border-blue-800">Admin</span>
                            )}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-red-600 dark:text-red-400">
                            <Ban size={18} />
                            {user.is_blocked ? 'Unsuspend' : 'Suspend'}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Mail size={18} />
                            Message
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-xl text-sm font-medium hover:bg-gray-900 shadow-lg shadow-black/20 transition-all">
                            <Edit size={18} />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column: User Info & Risk */}
                <div className="lg:col-span-4 space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
                                <img
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                    src={user.avatar_url || "https://ui-avatars.com/api/?name=" + user.name.replace(' ', '+')}
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">User ID: {user.id.substring(0, 8)}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Joined {formatDate(user.joined_at)}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Email Address</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white break-all">{user.email}</p>
                                    {user.is_verified && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <CheckCircle size={10} className="text-green-500" />
                                            <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Verified</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Phone Number</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.phone}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <CheckCircle size={10} className="text-green-500" />
                                        <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Verified</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Shipping Address</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.address}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">KYC Status</span>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium border border-green-100 dark:border-green-800">
                                        Approved
                                        <ShieldCheck size={12} />
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Documents on file: PAN, Aadhar</p>
                            </div>
                        </div>
                    </div>

                    {/* Risk Assessment (Mock Data) */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Risk Assessment</h3>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500">Fraud Score</span>
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">12/100</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Low risk profile based on activity and verification.</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                                <div className="flex items-center gap-2">
                                    <Flag size={18} className="text-red-500" />
                                    <span className="text-sm font-medium text-red-700 dark:text-red-400">Payment Failed</span>
                                </div>
                                <span className="text-xs text-red-600 dark:text-red-400 opacity-70">2 months ago</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">0 Active Reports</span>
                                </div>
                                <span className="text-xs text-gray-400">Clean record</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Tables */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-[#111111] to-gray-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Wallet size={64} />
                            </div>
                            <p className="text-sm opacity-80 mb-1">Total Wallet Balance</p>
                            <h2 className="text-3xl font-bold tracking-tight">₹ 42,500</h2>
                            <div className="mt-4 flex items-center gap-2 text-xs opacity-70">
                                <TrendingUp size={14} />
                                <span>+15% from last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Active Deposits (Holds)</p>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">₹ 12,400</h2>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-4">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">35% of buying power utilized</p>
                        </div>
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Total Spent (Lifetime)</p>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">₹ 8.5L</h2>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex -space-x-2">
                                    <span className="w-6 h-6 rounded-full bg-yellow-400 border border-white dark:border-gray-800"></span>
                                    <span className="w-6 h-6 rounded-full bg-gray-400 border border-white dark:border-gray-800"></span>
                                </div>
                                <span className="text-xs text-gray-500">Top Categories: Watches, Art</span>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Table (Mock Data) */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex -mb-px px-6">
                                {['Bid History', 'Transactions', 'Logs'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                                        className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.toLowerCase().split(' ')[0]
                                            ? 'border-[#111111] text-[#111111] dark:text-white dark:border-white'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="p-0">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Oct 24, 10:42 AM</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 flex-shrink-0 rounded bg-gray-100 overflow-hidden mr-3">
                                                        {/* Mock Image */}
                                                        <div className="w-full h-full bg-gray-300" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Rolex OP 41</div>
                                                        <div className="text-xs text-gray-500">Lot #4410</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Live Bid</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">₹ 26,500</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase">Leading</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetail;
