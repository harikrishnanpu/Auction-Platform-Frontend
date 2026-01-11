import Link from 'next/link';
import { Users, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/users" className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
                            <p className="text-sm text-gray-500">Manage users, roles, and permissions</p>
                        </div>
                    </div>
                </Link>

                <div className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 opacity-60">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 rounded-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Management</h2>
                            <p className="text-sm text-gray-500">Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
