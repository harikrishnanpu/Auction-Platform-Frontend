import {
    CheckCircle,
    Clock,
    AlertCircle,
    Eye,
    Ban,
    Edit,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from 'next/link';

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    is_verified?: boolean;
    is_blocked?: boolean;
    is_active?: boolean;
}

interface UserTableProps {
    users: User[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalUsers: number;
    onBlockUser?: (id: string, block: boolean) => void;
}

export function UserTable({ users, loading, page, totalPages, onPageChange, totalUsers, onBlockUser }: UserTableProps) {
    if (loading) {
        return <div className="text-center py-10 dark:text-gray-300">Loading users...</div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                            <th className="px-6 py-4 font-semibold">User</th>
                            <th className="px-6 py-4 font-semibold">Roles</th>
                            <th className="px-6 py-4 font-semibold">Verified Status</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm ring-2 ring-background">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {user.roles.map(role => (
                                            <span key={role} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_verified ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <CheckCircle size={12} />
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                                            <Clock size={12} />
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_blocked ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                            <Ban size={12} />
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            title="View Profile"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        {onBlockUser && (
                                            <button
                                                onClick={() => onBlockUser(user.id, !user.is_blocked)}
                                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                title={user.is_blocked ? "Unblock" : "Block"}
                                            >
                                                <Ban size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing page <span className="font-medium text-gray-900 dark:text-white">{page}</span> of{" "}
                    <span className="font-medium text-gray-900 dark:text-white">{totalPages}</span> ({totalUsers} users)
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm px-2 text-gray-900 dark:text-white">Page {page}</span>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
