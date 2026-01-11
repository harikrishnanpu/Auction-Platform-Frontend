"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

export function DashboardHeader() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

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
                                href="/seller/landing" // Assuming this is where Seller Hub might point initially, or maybe /seller/kyc for now
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-primary transition">
                            HS
                        </div>
                        <button
                            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
