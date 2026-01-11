import api from "@/lib/axios";

export const adminService = {
    async getUsers(page: number = 1, limit: number = 10) {
        const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
        return response.data;
    },

    async getUserById(id: string) {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },

    async updateUser(id: string, data: any) {
        const response = await api.put(`/admin/users/${id}`, data);
        return response.data;
    },

    async blockUser(id: string, block: boolean) {
        const response = await api.patch(`/admin/users/${id}/block`, { block });
        return response.data;
    },

    async deleteUser(id: string) {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    async getSellers(page: number = 1, limit: number = 10) {
        const response = await api.get(`/admin/sellers?page=${page}&limit=${limit}`);
        return response.data;
    },

    async getSellerById(id: string) {
        const response = await api.get(`/admin/sellers/${id}`);
        return response.data;
    },

    async verifySellerKyc(id: string, verify: boolean) {
        const response = await api.patch(`/admin/sellers/${id}/verify-kyc`, { verify });
        return response.data;
    },

    async blockSeller(id: string, block: boolean) {
        const response = await api.patch(`/admin/sellers/${id}/block`, { block });
        return response.data;
    },

    async assignSellerRole(id: string) {
        const response = await api.post(`/admin/sellers/${id}/assign-role`);
        return response.data;
    }
};
