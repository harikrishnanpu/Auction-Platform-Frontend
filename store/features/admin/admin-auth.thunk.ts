import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormValues } from "@/features/auth/schemes/register-schema";
import { authService } from "@/features/auth/services/auth.service";
import { AdminLoginResponse } from "@/features/admin/auth/types";

export const loginAdminThunk = createAsyncThunk<
    AdminLoginResponse,
    LoginFormValues,
    { rejectValue: string }
>(
    'admin/login',
    async (credentials: LoginFormValues, { rejectWithValue }) => {
        try {
            const response = await authService.loginAdmin(credentials);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Admin Login failed');
        }
    }
);
