import { LoginFormValues } from "@/features/auth/schemes/register-schema";
import api from "@/lib/axios";




export const adminAuthServices = {


    async loginAdmin(data: LoginFormValues) {
        const response = await api.post<{ message: string, user: any }>(`/admin/auth/login`, data);
        return response.data;
    },


}