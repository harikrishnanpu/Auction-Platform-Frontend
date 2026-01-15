import { LoginFormValues, RegisterFormValues } from "@/features/auth/schemes/register-schema";
import { authService } from "@/features/auth/services/auth.service";
import { RegisterResponse, User } from "@/features/auth/types";
import { resetServices } from "@/features/reset/password/services/reset.services";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const registerUserThunk = createAsyncThunk<
    RegisterResponse,
    RegisterFormValues,
    { rejectValue: string }
>(
    'auth/register',
    async (userData: RegisterFormValues, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Registration failed');
        }
    }
);


export const getCurrentUserThunk = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.getCurrentUser();
            return user;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch user');
        }
    }
);


export const loginUserThunk = createAsyncThunk<
    RegisterResponse,
    LoginFormValues,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials: LoginFormValues, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Login failed');
        }
    }
);

export const verifyEmailThunk = createAsyncThunk<
    RegisterResponse,
    { email: string, otp: string },
    { rejectValue: string }
>(
    'auth/verifyEmail',
    async (data: { email: string, otp: string }, { rejectWithValue }) => {
        try {
            const response = await authService.verifyEmail(data);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Verification failed');
        }
    }
);


export const forgotPasswordThunk = createAsyncThunk<
    { success: boolean; message: string },
    { email: string },
    { rejectValue: string }
>(
    'auth/forgotPassword',
    async (data: { email: string }, { rejectWithValue }) => {
        try {
            const response = await resetServices.forgotPassword(data);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to send reset link');
        }
    }
);


export const resetPasswordThunk = createAsyncThunk<

    { success: boolean; message: string },
    { newPassword: string; token: string, email: string },
    { rejectValue: string }
>(
    'auth/resetPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await resetServices.resetPassword(data);
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to reset password')
        }
    }
);



export const logoutThunk = createAsyncThunk<
    { success: boolean; message: string },
    void,
    { rejectValue: string }
>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.logout();
            return response;
        } catch (err: unknown) {
            return rejectWithValue((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to logout');
        }
    }
);