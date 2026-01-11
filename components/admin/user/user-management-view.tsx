"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getUsersThunk, blockUserThunk } from "@/store/features/admin/admin.thunk";
import { UserStats } from "./user-stats";
import { UserFilters } from "./user-filters";
import { UserTable } from "./user-table";

export function UserManagementView() {
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(1);
    
    const users = useAppSelector((state: any) => state.admin?.users?.users || []);
    const loading = useAppSelector((state: any) => state.admin?.users?.isLoading || false);
    const totalPages = useAppSelector((state: any) => state.admin?.users?.totalPages || 1);
    const totalUsers = useAppSelector((state: any) => state.admin?.users?.total || 0);

    React.useEffect(() => {
        dispatch(getUsersThunk({ page, limit: 10 }));
    }, [page, dispatch]);

    const handleBlockUser = async (id: string, block: boolean) => {
        try {
            await dispatch(blockUserThunk({ id, block })).unwrap();
            // Refresh users list
            dispatch(getUsersThunk({ page, limit: 10 }));
        } catch (error) {
            console.error("Failed to block/unblock user", error);
        }
    };

    return (
        <div className="font-sans transition-colors duration-300 bg-background text-foreground animate-in fade-in duration-500">
            {/* Header */}
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

            <UserStats totalUsers={totalUsers} />
            <UserFilters />
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
