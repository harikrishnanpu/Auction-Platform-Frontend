export function Stats() {
    return (
        <section className="py-20 bg-background" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif">
                            Why Industry Leaders Trust <span className="text-blue-600">Hammr.Down</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Unmatched Speed</h3>
                                    <p className="text-muted-foreground leading-relaxed">Our proprietary engine processes bids 10x faster than standard e-commerce platforms.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Reliability Guaranteed</h3>
                                    <p className="text-muted-foreground leading-relaxed">99.99% Uptime SLA ensures your high-stakes auctions are never interrupted.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Continuous Innovation</h3>
                                    <p className="text-muted-foreground leading-relaxed">We ship updates weekly, keeping you ahead of market trends and technology.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-inner">
                        <h3 className="text-6xl font-serif text-gray-800 mb-2">₹100Cr+</h3>
                        <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-8">Asset Value Processed</p>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-2xl font-bold text-blue-600">50k+</p>
                                <p className="text-xs text-gray-500">Active Bidders</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-2xl font-bold text-green-600">0.01s</p>
                                <p className="text-xs text-gray-500">Avg. Response</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
