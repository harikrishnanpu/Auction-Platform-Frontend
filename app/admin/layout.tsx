'use client';

import React, { useState } from 'react';
import { Sun, Moon, Search } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false); // In real app, integrate with ThemeProvider

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-[#E9F1FA] text-[#1e293b]'}`}>
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 bg-[#E9F1FA]/90 dark:bg-[#0f172a]/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-8">
                            <a
                                href="/admin"
                                className="flex items-center gap-2 font-bold text-xl tracking-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                HammerDown <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-[#111111] text-white uppercase tracking-wider">Admin</span>
                            </a>
                            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                                <a className="hover:text-[#111111] dark:hover:text-white transition-colors" href="/admin">Dashboard</a>
                                <a className="text-[#111111] dark:text-white font-semibold transition-colors" href="/admin/users">Users</a>
                                <a className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Auctions</a>
                                <a className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Financials</a>
                                <a className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Risks & Fraud</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Search size={18} />
                                </span>
                                <input
                                    className="pl-10 pr-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-[#111111] focus:border-[#111111] w-64 transition-all dark:text-white"
                                    placeholder="Search..."
                                    type="text"
                                />
                            </div>
                            <button
                                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                <img alt="Admin" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcbgxIAadH3YDtBYk8l1qRgQumeh1TigTJUFCcrbB_D1C3KsoBRIERM8vfrf_84SZZq4Rdqd2lJwtDwu8l_T27wr4zfKLVicUwellQQBHT05srHyQGcRnQWKDSOgdBKz9zzB-RpgMOJWcQXHr0HJ7h67_VchvtlalJJOTwbiCFm8O6-KFSIqUcjQJfwswKh3tI9y4qzLH4LHMJk0oSwBgSOi6Vzfwivk8D54WkBk-Hhxa3sU6HRoo-oALvuEzSSIjs_wGDMVoqF_Mn" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-gray-800 mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">HammerDown Admin Panel</span> v2.4.0
                        </div>
                        <div className="flex gap-6 text-xs text-gray-500 dark:text-gray-400">
                            <a className="hover:text-[#111111] dark:hover:text-white" href="#">Support</a>
                            <a className="hover:text-[#111111] dark:hover:text-white" href="#">System Status</a>
                            <a className="hover:text-[#111111] dark:hover:text-white" href="#">Documentation</a>
                        </div>
                        <div className="text-xs text-gray-400">
                            © 2023 HammerDown Inc. Internal use only.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
