import AuthNavbar from "@/components/layout/navbars/AuthNavbar";
import { AdminLoginForm } from "@/features/admin/auth/components/login-form";

const AdminLoginPage = () => {

   

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">

            <AuthNavbar />

                        <main className="min-h-screen flex items-center justify-center p-4 py-20 relative">
                <AdminLoginForm />
            </main> 
        </div>
    );
};

export default AdminLoginPage;
