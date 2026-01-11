import { Button } from "@/components/ui/buttons/button";

export function CTA() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-serif">
                        Ready to Transform Your <span className="text-blue-400 italic">Auctions</span>?
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Join the platform that is defining the future of digital asset exchange. Start your journey with Hammr.Down today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 min-w-[160px]">Login Now</Button>
                        <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 min-w-[160px]">Contact Sales</Button>
                    </div>

                    <p className="text-xs text-gray-500 uppercase tracking-widest pt-8">No credit card required for demo</p>
                </div>
            </div>
        </section>
    );
}
