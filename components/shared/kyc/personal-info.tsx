import { CheckCircle, XCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks/hooks";

export function PersonalInfo() {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-sans text-foreground">
                    Personal Information
                </h2>
                {/* Check verification status from user or kyc status, user.is_verified usually implies email verification, 
                    KYC might be separate. Assuming user.is_verified for now or just generic info.
                */}
                {/* Actually, user.roles might indicate if they are SELLER/MODERATOR (verified). 
                    Let's just show 'Registered' or check a verified flag if we have one.
                    The 'User' interface has 'roles'.
                 */}
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
                        value={user.name}
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
                        value={user.email}
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
                            value={user.phone}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
