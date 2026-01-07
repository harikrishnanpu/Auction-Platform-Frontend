import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Mission() {
    return (
        <section className="py-20 bg-background relative" id="solutions">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Our Mission</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
                        Bridging the Gap Between <br />
                        <span className="font-serif italic text-gray-400">Legacy</span> and <span className="text-blue-500 italic font-sans">Innovation</span>
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        We provide a seamless infrastructure that solves the complexities of digital auctions, transforming how assets are exchanged globally.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center relative">
                    {/* Connecting Arrow (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-gray-300">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>

                    <Card className="h-full hover:shadow-lg transition-shadow border-red-50 hover:border-red-100">
                        <CardHeader>
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <CardTitle>The Problem</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Traditional auctions suffer from latency, lack of transparency, and geographical limitations that hinder fair value discovery.</p>
                        </CardContent>
                    </Card>

                    <Card className="h-full hover:shadow-lg transition-shadow border-green-50 hover:border-green-100">
                        <CardHeader>
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <CardTitle>Our Solution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">An automated, real-time ecosystem that ensures sub-second bidding, immutable audit trails, and global accessibility.</p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </section>
    );
}
