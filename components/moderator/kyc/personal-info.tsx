import { CheckCircle } from "lucide-react";

export function PersonalInfo() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-sans text-foreground">
                    Personal Information
                </h2>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle size={14} /> Verified
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Full Legal Name
                    </label>
                    <input
                        className="w-full bg-muted border-input rounded-lg text-sm focus:ring-foreground focus:border-foreground text-foreground"
                        readOnly
                        type="text"
                        value="Hari Seldon"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Date of Birth
                    </label>
                    <input
                        className="w-full bg-muted border-input rounded-lg text-sm focus:ring-foreground focus:border-foreground text-foreground"
                        readOnly
                        type="text"
                        value="12 Oct 1985"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address
                    </label>
                    <input
                        className="w-full bg-muted border-input rounded-lg text-sm focus:ring-foreground focus:border-foreground text-foreground"
                        readOnly
                        type="email"
                        value="hari.seldon@foundation.io"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Phone Number
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            +91
                        </span>
                        <input
                            className="flex-1 block w-full rounded-none rounded-r-lg bg-muted border-input text-sm focus:ring-foreground focus:border-foreground text-foreground"
                            readOnly
                            type="tel"
                            value="98765 43210"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
