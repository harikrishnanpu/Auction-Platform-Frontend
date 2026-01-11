import AuthNavbar from "@/components/layout/navbars/AuthNavbar";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import LoginForm from "@/features/auth/components/login/login-form";
import { useTheme } from "next-themes";

export default function LoginPage() {

    // const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 dark:bg-[#111111] dark:text-gray-100'
            bg-[linear-gradient(to_bottom,#AECDEE_0%,#EBF4FF_40%,#FFFBF0_100%)] text-gray-900`}>

            <AuthNavbar />

            <main className="min-h-screen flex items-center justify-center p-4 py-20 relative">
                {/* Background Blobs (Light mode only) */}
                {/* {theme == "light" && (
                    <>
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-1000 animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-100/40 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-1000"></div>
                    </>
                )} */}
                <TestimonialCard />

                <LoginForm />

            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-gray-400 dark:text-gray-600">
                © 2024 Hammr.Down Inc. All rights reserved.
            </footer>



            <style>{`
                    .fade-in {
                      animation: fadeIn 0.5s ease-out forwards;
                    }
                    @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(10px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>

        </div>
    );
}