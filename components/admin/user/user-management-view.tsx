"use client";

import React from "react";
import { ArrowLeft, Plus, Download } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import { UserStats } from "./user-stats";
import { UserFilters } from "./user-filters";
import { UserTable } from "./user-table";

export function UserManagementView() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [totalUsers, setTotalUsers] = React.useState(0);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/users?page=${page}&limit=10`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
            setTotalUsers(response.data.total);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, [page]);

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
            />
        </div>
    );
}
