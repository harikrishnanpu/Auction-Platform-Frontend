import { ResetPasswordForm } from "@/features/reset/password/components/change-password-form";

export default function ResetPasswordPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary/20">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-400/20 dark:bg-blue-900/10 blur-[100px] animate-blob"></div>
                <div className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 dark:bg-purple-900/10 blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-400/20 dark:bg-teal-900/10 blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

                <ResetPasswordForm />
        </div>
    );
}
