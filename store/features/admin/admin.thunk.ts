import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/features/admin/auth/services/admin.service";

export const getUsersThunk = createAsyncThunk(
    'admin/getUsers',
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const data = await adminService.getUsers(page, limit);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const getUserByIdThunk = createAsyncThunk(
    'admin/getUserById',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await adminService.getUserById(id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
        }
    }
);

export const updateUserThunk = createAsyncThunk(
    'admin/updateUser',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            await adminService.updateUser(id, data);
            return { id, data };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update user');
        }
    }
);

export const blockUserThunk = createAsyncThunk(
    'admin/blockUser',
    async ({ id, block }: { id: string; block: boolean }, { rejectWithValue }) => {
        try {
            await adminService.blockUser(id, block);
            return { id, block };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to block/unblock user');
        }
    }
);

export const deleteUserThunk = createAsyncThunk(
    'admin/deleteUser',
    async (id: string, { rejectWithValue }) => {
        try {
            await adminService.deleteUser(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
        }
    }
);

export const getSellersThunk = createAsyncThunk(
    'admin/getSellers',
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const data = await adminService.getSellers(page, limit);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch sellers');
        }
    }
);

export const getSellerByIdThunk = createAsyncThunk(
    'admin/getSellerById',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await adminService.getSellerById(id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch seller');
        }
    }
);

export const verifySellerKycThunk = createAsyncThunk(
    'admin/verifySellerKyc',
    async ({ id, verify }: { id: string; verify: boolean }, { rejectWithValue }) => {
        try {
            await adminService.verifySellerKyc(id, verify);
            return { id, verify };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to verify seller KYC');
        }
    }
);

export const blockSellerThunk = createAsyncThunk(
    'admin/blockSeller',
    async ({ id, block }: { id: string; block: boolean }, { rejectWithValue }) => {
        try {
            await adminService.blockSeller(id, block);
            return { id, block };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to block/unblock seller');
        }
    }
);

export const assignSellerRoleThunk = createAsyncThunk(
    'admin/assignSellerRole',
    async (id: string, { rejectWithValue }) => {
        try {
            await adminService.assignSellerRole(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to assign seller role');
        }
    }
);
