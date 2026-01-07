import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">

            {/* Navigation */}
            <nav className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold font-serif transition-transform group-hover:scale-95">
                        H
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight text-foreground">Hammr.Down</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition hidden sm:inline-flex items-center gap-1 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <ModeToggle />
                </div>
            </nav>

            <main className="min-h-screen flex items-center justify-center p-4 py-20 relative">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>

                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

                    {/* Left Side - Marketing Content */}
                    <div className="hidden lg:flex flex-col gap-8 pr-8">
                        <div className="relative animate-in slide-in-from-left-10 duration-700 fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 w-fit mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wider uppercase">Live Bidding Platform</span>
                            </div>
                            <h1 className="font-serif text-6xl xl:text-7xl font-medium leading-none text-foreground mb-6">
                                Join the <br />
                                <span className="italic text-blue-600 dark:text-blue-400">Winning Circle.</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                                Create an account to experience <span className="text-foreground font-medium">real-time bidding</span>, secure payment locking, and fair auction extensions.
                            </p>
                        </div>

                        {/* Testimonial Card */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/50 dark:border-white/10 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-serif text-lg">
                                    M
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-2 italic">
                                        "The anti-sniping protection is a game changer. I finally feel like online auctions are fair."
                                    </p>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        — Marcus T., Watch Collector
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-slate-800"></div>
                                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-slate-800"></div>
                                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white dark:border-slate-800"></div>
                                </div>
                                <div className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    36 Active Listeners
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="relative">
                        {/* Decorative blob behind form */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-[2rem] shadow-2xl p-8 md:p-12 w-full relative overflow-hidden animate-in slide-in-from-bottom-10 duration-700 fade-in delay-200">

                            <div className="mb-8">
                                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                                    Create Account
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Already have an account?{" "}
                                    <Link className="text-primary font-semibold hover:underline decoration-2 underline-offset-2 transition-all" href="/login">
                                        Log in
                                    </Link>
                                </p>
                            </div>

                            <RegisterForm />

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
