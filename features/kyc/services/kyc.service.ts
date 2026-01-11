import api from "@/lib/axios";

export interface GenerateUploadUrlRequest {
    documentType: 'id_front' | 'id_back' | 'address_proof';
    fileName: string;
    contentType: string;
}

export interface GenerateUploadUrlResponse {
    uploadUrl: string;
    fileKey: string;
    expiresIn: number;
}

export interface CompleteUploadRequest {
    documentType: 'id_front' | 'id_back' | 'address_proof';
    fileKey: string;
    documentTypeName?: string;
    documentNumber?: string;
    address?: string;
}

export const kycService = {
    async generateUploadUrl(data: GenerateUploadUrlRequest): Promise<GenerateUploadUrlResponse> {
        const response = await api.post<GenerateUploadUrlResponse>('/kyc/upload-url', data);
        return response.data;
    },

    async completeUpload(data: CompleteUploadRequest): Promise<void> {
        await api.post('/kyc/complete-upload', data);
    },

    async uploadFileToS3(file: File, uploadUrl: string): Promise<void> {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to upload file to S3');
        }
    },
};
