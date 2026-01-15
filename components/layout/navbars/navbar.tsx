"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAppDispatch } from "@/store/hooks/hooks";
import { logoutThunk } from "@/store/features/auth/auth.thunk";

export function DashboardHeader() {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-background/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/home"
                            className="font-bold text-2xl tracking-tight cursor-pointer font-serif text-foreground"
                        >
                            HammerDown
                        </Link>
                        <div className="hidden md:flex space-x-6 text-sm font-medium text-muted-foreground">
                            <Link
                                href="/home"
                                className="hover:text-foreground transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Live Auctions
                            </Link>
                            <Link
                                href="/seller/landing"
                                className="hover:text-foreground transition-colors"
                            >
                                Seller Hub
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Wallet
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:bg-muted rounded-full relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                        </button>
                        <div onClick={handleLogout} className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-primary transition">
                            HS
                        </div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
