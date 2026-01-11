import Link from "next/link";
import { RecoverPasswordForm } from "@/components/auth/recover-password-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Phone } from "lucide-react";

export default function RecoverPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-gradient-to-b from-blue-100 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">

            {/* Navigation */}
            <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground transition-transform hover:scale-95">
                    Hammr.Down
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/register" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
                        Register
                    </Link>
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <Phone size={18} />
                        <span className="hidden md:inline">+91 9898989898</span>
                    </div>
                    <ModeToggle />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <RecoverPasswordForm />
            </main>

            {/* Footer */}
            <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-xs text-muted-foreground">
                <div>© 2024 Hammr.Down Inc.</div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                </div>
            </footer>
        </div>
    );
}