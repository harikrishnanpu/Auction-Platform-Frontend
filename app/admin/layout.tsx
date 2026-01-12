

export default function AdminLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 dark:bg-[#0f172a] dark:text-[#f8fafc] bg-[#E9F1FA] text-[#1e293b]`}>

            <main className="flex-grow">
                {children}
            </main>
        </div>

    );
}
