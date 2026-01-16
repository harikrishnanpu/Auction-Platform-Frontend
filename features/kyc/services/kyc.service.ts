import api from "@/lib/axios";
import axios from "axios";

export const kycService = {
    async generateUploadUrl(data: { documentType: string; fileName: string; contentType: string; kycType?: string }) {
        const response = await api.post<{ uploadUrl: string; fileKey: string }>(`/kyc/upload-url`, data);
        return response.data;
    },

    async uploadFileToS3(file: File, uploadUrl: string) {
        // Upload directly to S3 using the pre-signed URL
        // Note: Do not use the main 'api' instance because it adds Authorization headers which S3 might reject
        // or formatting that S3 doesn't like. Use plain axios.
        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type
            }
        });
    },

    async completeUpload(data: {
        documentType: string;
        fileKey: string;
        documentTypeName?: string;
        documentNumber?: string;
        address?: string;
        kycType?: string;
    }) {
        const response = await api.post<{ message: string }>(`/kyc/complete-upload`, data);
        return response.data;
    },

    async getStatus() {
        const response = await api.get<{ status: string; profile: any }>(`/kyc/status`);
        return response.data;
    },

    async submitKyc() {
        const response = await api.post<{ message: string }>(`/kyc/submit`, {});
        return response.data;
    }
};
