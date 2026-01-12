import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormValues } from "@/features/auth/schemes/register-schema";
import { AdminLoginResponse } from "@/features/admin/auth/types";
import { adminAuthServices } from "@/features/admin/auth/services/admin-auth-services";

export const loginAdminThunk = createAsyncThunk<
    AdminLoginResponse,
    LoginFormValues,
    { rejectValue: string }
>(
    'admin/login',
    async (data: LoginFormValues, { rejectWithValue }) => {
        try {
            const response = await adminAuthServices.loginAdmin(data);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Admin Login failed');
        }
    }
);
