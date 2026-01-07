export function Footer() {
    return (
        <footer className="bg-background py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">

                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">H</div>
                            <span className="text-lg font-bold text-foreground">Hammr.Down</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs mb-6">
                            The premium SaaS solution for modern auctioneers. Secure, fast, and scalable.
                        </p>
                        <div className="flex gap-4 opacity-50">
                            {/* Social placeholders */}
                            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-blue-600">Features</a></li>
                            <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
                            <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                hello@hammr.down
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                San Francisco, CA
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2024 Hammr.Down Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
