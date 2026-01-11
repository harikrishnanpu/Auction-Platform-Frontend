import {
    Fingerprint,
    Upload,
    FileText,
    Trash2,
} from "lucide-react";

export function DocumentUpload() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Fingerprint
                    size={128}
                    className="text-foreground"
                    strokeWidth={1}
                />
            </div>
            <h2 className="text-xl font-bold font-sans mb-1 text-foreground">
                Identity Verification
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
                Upload a government-issued ID and proof of address to comply with
                moderator regulations.
            </p>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Government ID (Aadhar / PAN / Passport)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-border hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all rounded-xl p-6 text-center cursor-pointer bg-muted/50 group">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-blue-500 mb-2" />
                            <p className="text-sm text-muted-foreground font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                Click to upload Front Side
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG or PDF up to 5MB
                            </p>
                            <input className="hidden" type="file" />
                        </div>
                        <div className="border-2 border-dashed border-border hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all rounded-xl p-6 text-center cursor-pointer bg-muted/50 group">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-blue-500 mb-2" />
                            <p className="text-sm text-muted-foreground font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                Click to upload Back Side
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG or PDF up to 5MB
                            </p>
                            <input className="hidden" type="file" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Proof of Address
                    </label>
                    <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                            <FileText size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                                Utility_Bill_Nov2023.pdf
                            </p>
                            <p className="text-xs text-muted-foreground">
                                2.4 MB • Uploaded just now
                            </p>
                        </div>
                        <button className="text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
