import { Button } from "@/components/ui/buttons/button";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="flex flex-col gap-6 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 w-fit">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Next Generation Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] font-serif">
                            Bidding <br />
                            Reimagined <br />
                            <span className="text-gradient font-sans">For the Future.</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                            Experience the world's most reliable, secure, and scalable auction infrastructure. Real-time updates with zero latency.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2">
                            <Button size="lg" className="bg-[#0f172a] hover:bg-[#1e293b]">Get Started / Login</Button>
                            <Button size="lg" variant="outline" className="bg-white">Contact Me</Button>
                        </div>

                        <div className="flex items-center gap-4 mt-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-500">Trusted by 100+ Auction Houses</span>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

                        {/* Hero Image / Dashboard Mockup */}
                        <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-4 md:p-6 transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-4 left-6 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="h-40 w-full bg-gray-100 rounded-lg animate-pulse"></div>
                                <div className="flex gap-4">
                                    <div className="flex-1 h-20 bg-blue-50 rounded-lg"></div>
                                    <div className="w-20 h-20 bg-indigo-50 rounded-lg"></div>
                                </div>
                                <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Security Check</p>
                                    <p className="text-sm font-bold text-gray-900">Verified 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
