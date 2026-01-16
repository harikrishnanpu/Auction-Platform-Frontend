"use client";

import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { UserStats } from "./user-stats";
import { UserFilters } from "./user-filters";
import { UserTable } from "./user-table";
import { blockUserThunk, getAdminStatsThunk, getUsersThunk } from "@/store/features/admin/management/admin-management.thunk";

export function UserManagementView() {

    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [sortBy, setSortBy] = React.useState("created_at");
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>("desc");

    const users = useAppSelector((state: any) => state.admin?.users?.users || []);
    const loading = useAppSelector((state: any) => state.admin?.users?.isLoading || false);
    const totalPages = useAppSelector((state: any) => state.admin?.users?.totalPages || 1);
    const totalUsers = useAppSelector((state: any) => state.admin?.users?.total || 0);
    const stats = useAppSelector((state: any) => state.admin?.stats?.data || null);

    useEffect(() => {
        dispatch(getUsersThunk({ page, limit: 10, search, sortBy, sortOrder }));
        dispatch(getAdminStatsThunk());
    }, [page, search, sortBy, sortOrder, dispatch]);

    const handleBlockUser = async (id: string, block: boolean) => {
        try {
            await dispatch(blockUserThunk({ id, block })).unwrap();
            dispatch(getUsersThunk({ page, limit: 10, search, sortBy, sortOrder }));
            dispatch(getAdminStatsThunk());
        } catch (error) {
            console.log("Failed to block/unblock user", error);
        }
    };

    const handleSort = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        setPage(1);
    };

    const handleSearch = (newSearch: string) => {
        setSearch(newSearch);
        setPage(1);
    };

    return (
        <div className="font-sans mt-5 px-2 container align-middle justify-center mx-auto min-h-screen transition-colors duration-300 bg-transparent text-foreground animate-in fade-in duration-500">

            <div className="mb-8">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Link
                        href="/admin"
                        className="hover:text-foreground flex items-center gap-1"
                    >
                        <ArrowLeft size={14} />
                        Dashboard
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-medium">User Management</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                            User Management
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage users, roles, KYC verification, and platform access.
                        </p>
                    </div>
                </div>
            </div>

            <UserStats stats={stats} />
            <UserFilters
                onSearch={handleSearch}
                onSort={handleSort}
                currentSortBy={sortBy}
                currentSortOrder={sortOrder}
            />
            <UserTable
                users={users}
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalUsers={totalUsers}
                onBlockUser={handleBlockUser}
            />
        </div>
    );
}
