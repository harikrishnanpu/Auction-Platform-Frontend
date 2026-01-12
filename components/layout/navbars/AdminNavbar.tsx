import { ModeToggle } from "@/components/ui/mode-toggle"
import { Search } from "lucide-react"
import Link from "next/link"



export const AdminNavabar = () => {
    return (
        
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
                                        <Link className="hover:text-[#111111] dark:hover:text-white transition-colors" href="/admin">Dashboard</Link>
                                        <Link className="text-[#090808] dark:text-white font-semibold transition-colors" href="/admin/users">Users</Link>
                                        <Link className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Auctions</Link>
                                        <Link className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Financials</Link>
                                        <Link className="hover:text-[#111111] dark:hover:text-white transition-colors" href="#">Risks & Fraud</Link>
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
                        <ModeToggle />
                                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                        <img alt="Admin" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcbgxIAadH3YDtBYk8l1qRgQumeh1TigTJUFCcrbB_D1C3KsoBRIERM8vfrf_84SZZq4Rdqd2lJwtDwu8l_T27wr4zfKLVicUwellQQBHT05srHyQGcRnQWKDSOgdBKz9zzB-RpgMOJWcQXHr0HJ7h67_VchvtlalJJOTwbiCFm8O6-KFSIqUcjQJfwswKh3tI9y4qzLH4LHMJk0oSwBgSOi6Vzfwivk8D54WkBk-Hhxa3sU6HRoo-oALvuEzSSIjs_wGDMVoqF_Mn" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
        )
}