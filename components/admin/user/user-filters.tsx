import { Search, Filter } from "lucide-react";

export function UserFilters() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4 relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                    <input
                        className="w-full pl-10 pr-4 py-2.5 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground placeholder:text-muted-foreground outline-none"
                        placeholder="Search by name, email, or user ID..."
                        type="text"
                    />
                </div>
                <div className="md:col-span-2">
                    <select className="w-full py-2.5 px-3 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground outline-none">
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <select className="w-full py-2.5 px-3 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground outline-none">
                        <option value="">KYC Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending Review</option>
                        <option value="rejected">Rejected</option>
                        <option value="unverified">Unverified</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <select className="w-full py-2.5 px-3 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground outline-none">
                        <option value="">Account Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="restricted">Restricted</option>
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button className="w-full bg-muted text-muted-foreground font-medium py-2.5 px-4 rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                        <Filter size={16} />
                        More Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
