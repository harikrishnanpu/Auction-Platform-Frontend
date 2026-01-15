"use client";

import {
    CreditCard,
    Wallet,
    Heart,
    Timer,
    Trophy,
    Gavel,
    Edit2,
    Camera,
    Bike,
    Gamepad2,
    TrendingUp,
    Flame,
    Plus,
    ArrowUpRight,
    Armchair,
    Headphones,
    ArrowRight,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/navbars/navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DashboardView() {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen font-sans transition-colors duration-300 bg-gradient-to-b from-blue-200 via-blue-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 mt-8 space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-sm">
                        <div className="z-10 relative">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    Market Open
                                </p>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight font-serif">
                                Welcome back, {user?.name?.split(' ')[0] || 'User'}.
                            </h1>
                            <p className="text-muted-foreground max-w-lg text-lg">
                                You have{" "}
                                <span className="text-foreground font-semibold underline decoration-blue-300 underline-offset-4">
                                    3 active bids
                                </span>{" "}
                                requiring attention. Highest activity is in{" "}
                                <span className="italic">Luxury Watches</span> today.
                            </p>
                        </div>
                        <div className="z-10 relative mt-8 flex flex-wrap gap-4">
                            <button className="bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl text-sm font-medium shadow-lg transition flex items-center gap-2 group">
                                Explore New Lots{" "}
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>
                            <button onClick={() => router.push('/seller/landing')} className="bg-white/50 flex dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-foreground px-6 py-3 rounded-xl text-sm font-medium border border-white/20 transition backdrop-blur-sm align-middle flex items-center gap-2 group shadow-sm cursor-pointer">
                               Seller Hub
                                <ArrowRight />
                            </button>
                        </div>
                        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
                    </div>

                    {/* Wallet Card */}
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 text-foreground">
                            <Wallet size={96} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <div className="p-2 bg-white/60 dark:bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                    <CreditCard className="text-foreground" size={24} />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                                    +12.5%
                                </span>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Balance
                            </p>
                            <h2 className="text-4xl font-bold text-foreground mt-2 tracking-tight font-serif">
                                ₹ 42,500
                            </h2>
                        </div>
                        <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-2 gap-4 relative z-10">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">
                                    Wins
                                </p>
                                <p className="text-xl font-bold text-foreground">14</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">
                                    Pending
                                </p>
                                <p className="text-xl font-bold text-foreground">03</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Active Bids Section (Left 8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-2xl font-bold text-foreground font-serif">
                                Active Bids
                            </h3>
                            <a
                                href="#"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition flex items-center gap-1 group"
                            >
                                View All Activity{" "}
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </a>
                        </div>

                        {/* Featured Bid Card */}
                        <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 md:p-0 flex flex-col md:flex-row overflow-hidden shadow-sm border border-border group transition-all hover:shadow-lg">
                            <div className="w-full md:w-2/5 relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-8 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>{" "}
                                    Live
                                </div>
                                {/* Placeholder Image */}
                                <div className="relative z-10 w-40 h-40 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center shadow-inner">
                                    <span className="text-xs text-zinc-500">Item Image</span>
                                </div>
                                <div className="absolute inset-0 bg-[url(&apos;https://www.transparenttextures.com/patterns/cubes.png&apos;)] opacity-10"></div>
                            </div>
                            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors font-serif">
                                                Rolex Submariner Date
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Lot #4920 • Luxury Watches
                                            </p>
                                        </div>
                                        <button className="text-muted-foreground hover:text-red-500 transition p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wide">
                                                Current Bid
                                            </p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-2xl font-bold text-foreground">
                                                    ₹ 25,000
                                                </p>
                                                <span className="text-xs text-red-500 font-medium">
                                                    Outbid
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wide">
                                                Time Left
                                            </p>
                                            <p className="text-xl font-mono font-medium text-foreground bg-background px-3 py-1 rounded shadow-sm">
                                                02:14:58
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <form
                                    className="flex items-center gap-3"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <div className="flex-1 relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-serif">
                                            ₹
                                        </span>
                                        <input
                                            className="w-full pl-8 pr-4 py-3 bg-background border border-input rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground transition shadow-sm"
                                            placeholder="Enter amount..."
                                            type="number"
                                            defaultValue="26000"
                                        />
                                    </div>
                                    <button
                                        className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap"
                                        type="button"
                                    >
                                        Place Bid
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Smaller Bid Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl p-6 hover:border-blue-400/50 transition duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-orange-600 dark:text-orange-400">
                                        <Timer size={14} />
                                        <span className="text-xs font-bold uppercase tracking-wide">
                                            Ending Soon
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-medium text-muted-foreground">
                                        04h 12m
                                    </span>
                                </div>
                                <div className="flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full blur-2xl opacity-20 transform scale-75"></div>
                                    <Armchair
                                        size={64}
                                        strokeWidth={1}
                                        className="text-foreground relative z-10 group-hover:-translate-y-2 transition-transform duration-300"
                                    />
                                </div>
                                <h5 className="text-xl font-bold text-foreground mb-1 font-serif">
                                    Eames Lounge Chair
                                </h5>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Furniture & Design
                                </p>
                                <div className="flex justify-between items-end border-t border-border pt-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Current Bid
                                        </p>
                                        <p className="font-bold text-lg text-foreground">
                                            ₹ 12,400
                                        </p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 hover:scale-110 transition shadow-lg">
                                        <Gavel size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl p-6 hover:border-green-400/50 transition duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-600 dark:text-green-400">
                                        <Trophy size={14} />
                                        <span className="text-xs font-bold uppercase tracking-wide">
                                            Winning
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-medium text-muted-foreground">
                                        1d 05h
                                    </span>
                                </div>
                                <div className="flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 bg-green-200 dark:bg-green-900 rounded-full blur-2xl opacity-20 transform scale-75"></div>
                                    <Headphones
                                        size={64}
                                        strokeWidth={1}
                                        className="text-foreground relative z-10 group-hover:-translate-y-2 transition-transform duration-300"
                                    />
                                </div>
                                <h5 className="text-xl font-bold text-foreground mb-1 font-serif">
                                    Sony WH-1000XM5
                                </h5>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Electronics
                                </p>
                                <div className="flex justify-between items-end border-t border-border pt-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Your Bid
                                        </p>
                                        <p className="font-bold text-lg text-green-600 dark:text-green-400">
                                            ₹ 1,200
                                        </p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-background text-foreground border border-input flex items-center justify-center hover:bg-muted hover:scale-110 transition shadow-sm">
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section (Right 4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Watchlist */}
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 dark:border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-foreground font-serif">
                                    Watchlist
                                </h3>
                                <span className="bg-muted text-muted-foreground text-xs font-bold px-2.5 py-1 rounded-full border border-border">
                                    5 items
                                </span>
                            </div>
                            <div className="space-y-3">
                                {/* Item 1 */}
                                <div className="flex items-center gap-4 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-2xl transition-all cursor-pointer group hover:shadow-sm border border-transparent hover:border-border">
                                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                                        <Camera size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                                            Leica M6 Camera
                                        </h4>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                                            Ends in 2 days
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-foreground">₹ 85k</p>
                                        <div className="text-green-500 text-[10px] flex items-center justify-end gap-0.5 font-medium bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded mt-1">
                                            <TrendingUp size={10} /> 2%
                                        </div>
                                    </div>
                                </div>
                                {/* Item 2 */}
                                <div className="flex items-center gap-4 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-2xl transition-all cursor-pointer group hover:shadow-sm border border-transparent hover:border-border">
                                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                                        <Bike size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                                            Bianchi Road Bike
                                        </h4>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                                            Ends in 5 hours
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-foreground">₹ 42k</p>
                                        <div className="text-muted-foreground text-[10px] flex items-center justify-end gap-0.5 font-medium bg-muted px-1.5 py-0.5 rounded mt-1">
                                            Paused
                                        </div>
                                    </div>
                                </div>
                                {/* Item 3 */}
                                <div className="flex items-center gap-4 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-2xl transition-all cursor-pointer group hover:shadow-sm border border-transparent hover:border-border">
                                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                                        <Gamepad2 size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                                            Retro Console Bundle
                                        </h4>
                                        <p className="text-xs text-red-500 truncate mt-0.5 font-medium">
                                            Ends in 10 mins
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-foreground">₹ 15k</p>
                                        <div className="text-orange-500 text-[10px] flex items-center justify-end gap-0.5 font-medium bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded mt-1">
                                            <Flame size={10} fill="currentColor" /> Hot
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition uppercase tracking-wide flex items-center justify-center gap-2">
                                <Plus size={16} /> Add New Item
                            </button>
                        </div>

                        {/* Upcoming Promo */}
                        <div className="relative overflow-hidden rounded-3xl bg-black dark:bg-[#1a1a1a] text-white p-8 shadow-lg group cursor-pointer">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-purple-600/50 transition duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/30 rounded-full -ml-10 -mb-10 blur-2xl group-hover:bg-blue-600/50 transition duration-700"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            Upcoming
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 leading-snug font-serif">
                                        Rare Sneakers Collection Drop
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition">
                                        Exclusive limited edition Jordans and Yeezys. Starting bids at $200. Don&apos;t miss out.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">
                                            Starts in
                                        </p>
                                        <p className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                            02d 14h
                                        </p>
                                    </div>
                                    <button className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 transition transform group-hover:rotate-45">
                                        <ArrowUpRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
