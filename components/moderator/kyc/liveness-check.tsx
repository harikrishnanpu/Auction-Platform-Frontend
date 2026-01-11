import { ScanFace } from "lucide-react";

export function LivenessCheck() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3">
                    <div className="aspect-square rounded-xl bg-muted flex flex-col items-center justify-center border-2 border-dashed border-border">
                        <ScanFace
                            className="text-muted-foreground mb-2"
                            size={48}
                            strokeWidth={1.5}
                        />
                        <span className="text-xs text-muted-foreground font-medium">
                            Live Capture
                        </span>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold font-sans mb-2 text-foreground">
                        Liveness Check
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        To prevent fraud and ensure platform integrity, we need to verify
                        that you are a real person. Please enable your camera to complete a
                        quick face scan.
                    </p>
                    <div className="flex gap-3">
                        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg">
                            Start Camera
                        </button>
                        <button className="text-muted-foreground px-4 py-2.5 text-sm font-medium hover:text-foreground transition-colors">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
