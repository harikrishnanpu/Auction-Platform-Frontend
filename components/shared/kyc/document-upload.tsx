"use client";

import React, { useState, useRef } from "react";
import {
    Fingerprint,
    Upload,
    FileText,
    Trash2,
    Loader2,
    CheckCircle,
} from "lucide-react";
import { kycService } from "@/features/kyc/services/kyc.service";

interface UploadedFile {
    documentType: 'id_front' | 'id_back' | 'address_proof';
    fileKey: string;
    fileName: string;
    fileSize: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
}

export function DocumentUpload() {
    const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
    const [idBackFile, setIdBackFile] = useState<File | null>(null);
    const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState<string | null>(null);

    const idFrontInputRef = useRef<HTMLInputElement>(null);
    const idBackInputRef = useRef<HTMLInputElement>(null);
    const addressProofInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (
        file: File | null,
        documentType: 'id_front' | 'id_back' | 'address_proof',
        setFile: (file: File | null) => void
    ) => {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload JPEG, PNG, or PDF files only.');
            return;
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit. Please upload a smaller file.');
            return;
        }

        setFile(file);
    };

    const handleUpload = async (
        file: File,
        documentType: 'id_front' | 'id_back' | 'address_proof'
    ) => {
        if (!file) return;

        setUploading(documentType);

        try {
            // Step 1: Get pre-signed URL from backend
            const { uploadUrl, fileKey } = await kycService.generateUploadUrl({
                documentType,
                fileName: file.name,
                contentType: file.type,
            });

            // Step 2: Upload file directly to S3
            await kycService.uploadFileToS3(file, uploadUrl);

            // Step 3: Notify backend that upload is complete
            await kycService.completeUpload({
                documentType,
                fileKey,
            });

            // Update state
            setUploadedFiles((prev) => [
                ...prev.filter((f) => f.documentType !== documentType),
                {
                    documentType,
                    fileKey,
                    fileName: file.name,
                    fileSize: file.size,
                    status: 'success',
                },
            ]);

            // Clear file input
            if (documentType === 'id_front') {
                setIdFrontFile(null);
                if (idFrontInputRef.current) idFrontInputRef.current.value = '';
            } else if (documentType === 'id_back') {
                setIdBackFile(null);
                if (idBackInputRef.current) idBackInputRef.current.value = '';
            } else {
                setAddressProofFile(null);
                if (addressProofInputRef.current) addressProofInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(error.response?.data?.message || 'Failed to upload file. Please try again.');
            setUploadedFiles((prev) => [
                ...prev.filter((f) => f.documentType !== documentType),
                {
                    documentType,
                    fileKey: '',
                    fileName: file.name,
                    fileSize: file.size,
                    status: 'error',
                },
            ]);
        } finally {
            setUploading(null);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getUploadedFile = (documentType: 'id_front' | 'id_back' | 'address_proof') => {
        return uploadedFiles.find((f) => f.documentType === documentType);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
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
                Upload a government-issued ID and proof of address to comply with seller
                regulations.
            </p>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Government ID (Aadhar / PAN / Passport)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Front Side */}
                        <div>
                            <input
                                ref={idFrontInputRef}
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                onChange={(e) =>
                                    handleFileSelect(e.target.files?.[0] || null, 'id_front', setIdFrontFile)
                                }
                                disabled={uploading === 'id_front'}
                            />
                            <div
                                onClick={() => !uploading && idFrontInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                    uploading === 'id_front'
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-wait'
                                        : idFrontFile || getUploadedFile('id_front')
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-border hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-muted/50'
                                }`}
                            >
                                {uploading === 'id_front' ? (
                                    <>
                                        <Loader2 className="mx-auto h-8 w-8 text-blue-500 mb-2 animate-spin" />
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            Uploading...
                                        </p>
                                    </>
                                ) : getUploadedFile('id_front')?.status === 'success' ? (
                                    <>
                                        <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                            Uploaded
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {getUploadedFile('id_front')?.fileName}
                                        </p>
                                    </>
                                ) : idFrontFile ? (
                                    <>
                                        <FileText className="mx-auto h-8 w-8 text-foreground mb-2" />
                                        <p className="text-sm font-medium text-foreground">
                                            {idFrontFile.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatFileSize(idFrontFile.size)}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpload(idFrontFile, 'id_front');
                                            }}
                                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            Upload
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Click to upload Front Side
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG or PDF up to 5MB
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Back Side */}
                        <div>
                            <input
                                ref={idBackInputRef}
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                onChange={(e) =>
                                    handleFileSelect(e.target.files?.[0] || null, 'id_back', setIdBackFile)
                                }
                                disabled={uploading === 'id_back'}
                            />
                            <div
                                onClick={() => !uploading && idBackInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                    uploading === 'id_back'
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-wait'
                                        : idBackFile || getUploadedFile('id_back')
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-border hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-muted/50'
                                }`}
                            >
                                {uploading === 'id_back' ? (
                                    <>
                                        <Loader2 className="mx-auto h-8 w-8 text-blue-500 mb-2 animate-spin" />
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            Uploading...
                                        </p>
                                    </>
                                ) : getUploadedFile('id_back')?.status === 'success' ? (
                                    <>
                                        <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                            Uploaded
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {getUploadedFile('id_back')?.fileName}
                                        </p>
                                    </>
                                ) : idBackFile ? (
                                    <>
                                        <FileText className="mx-auto h-8 w-8 text-foreground mb-2" />
                                        <p className="text-sm font-medium text-foreground">
                                            {idBackFile.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatFileSize(idBackFile.size)}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpload(idBackFile, 'id_back');
                                            }}
                                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            Upload
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Click to upload Back Side
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG or PDF up to 5MB
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proof of Address */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Proof of Address
                    </label>
                    <input
                        ref={addressProofInputRef}
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        onChange={(e) =>
                            handleFileSelect(e.target.files?.[0] || null, 'address_proof', setAddressProofFile)
                        }
                        disabled={uploading === 'address_proof'}
                    />
                    <div
                        onClick={() => !uploading && addressProofInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all ${
                            uploading === 'address_proof'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-wait'
                                : addressProofFile || getUploadedFile('address_proof')
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-border hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-muted/50'
                        }`}
                    >
                        {uploading === 'address_proof' ? (
                            <div className="flex items-center gap-4">
                                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                        Uploading...
                                    </p>
                                </div>
                            </div>
                        ) : getUploadedFile('address_proof')?.status === 'success' ? (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <CheckCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {getUploadedFile('address_proof')?.fileName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(getUploadedFile('address_proof')?.fileSize || 0)} • Uploaded
                                    </p>
                                </div>
                            </div>
                        ) : addressProofFile ? (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {addressProofFile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(addressProofFile.size)}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpload(addressProofFile, 'address_proof');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                >
                                    Upload
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">
                                        Click to upload proof of address
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG or PDF up to 5MB
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
