import React, { useState, useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

interface UserFiltersProps {
    onSearch: (search: string) => void;
    onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
    currentSortBy?: string;
    currentSortOrder?: 'asc' | 'desc';
}

export function UserFilters({ onSearch, onSort, currentSortBy, currentSortOrder }: UserFiltersProps) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                    <input
                        className="w-full pl-10 pr-4 py-2.5 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground placeholder:text-muted-foreground outline-none"
                        placeholder="Search by name or email..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="md:col-span-3">
                    <select
                        className="w-full py-2.5 px-3 bg-muted border border-input rounded-xl text-sm focus:ring-foreground focus:border-foreground text-foreground outline-none"
                        value={currentSortBy || ""}
                        onChange={(e) => onSort(e.target.value, currentSortOrder || 'desc')}
                    >
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="created_at">Joined Date</option>
                    </select>
                </div>
                <div className="md:col-span-3">
                    <button
                        onClick={() => onSort(currentSortBy || "created_at", currentSortOrder === 'asc' ? 'desc' : 'asc')}
                        className="w-full py-2.5 px-3 bg-muted border border-input rounded-xl text-sm flex items-center justify-between text-foreground outline-none"
                    >
                        <span>{currentSortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                        {currentSortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
