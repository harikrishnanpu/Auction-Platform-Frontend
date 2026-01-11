import api from "@/lib/axios";
import { LoginFormValues, RegisterFormValues } from "../schemes/register-schema";
import { RegisterResponse, User } from "../types";


export const authService = {
    async register(data: RegisterFormValues) {
        const response = await api.post<RegisterResponse>(`/user/auth/register`, data);
        console.log("Register Response", response);
        return response.data;
    },

    async login(data: LoginFormValues) {
        const response = await api.post<RegisterResponse>(`/user/auth/login`, data);
        return response.data;
    },

    async loginAdmin(data: LoginFormValues) {
        const response = await api.post<{ success: boolean, message: string, user: any }>(`/admin/auth/login`, data);
        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get<{ success: boolean, user: User }>(`/user/auth/me`);
        return response.data.user;
    },

    async verifyEmail(data: { email: string; otp: string }) {
        const response = await api.post<RegisterResponse>(`/user/auth/verify-email`, data);
        return response.data;
    },

    async resendOtp(data: { email: string }) {
        const response = await api.post<{ message: string }>(`/user/auth/resend-otp`, data);
        return response.data;
    },

    async logout() {

    }
};
