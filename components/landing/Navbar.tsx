import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Placeholder for Logo */}
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-serif">
                        H
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground font-serif">Hammr.Down</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</Link>
                    <Link href="#solutions" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Solutions</Link>
                    <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Why Us</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors hidden sm:block">Log In</Link>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </nav>
    );
}
