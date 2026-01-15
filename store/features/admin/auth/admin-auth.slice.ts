import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAdminThunk } from './admin-auth.thunk';
import { AdminAuthState, AdminLoginResponse } from '@/features/admin/auth/types';

const initialState: AdminAuthState = {
    admin: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {

        logoutAdmin: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAdminThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(loginAdminThunk.fulfilled, (state, action: PayloadAction<AdminLoginResponse>) => {
            state.isLoading = false;
            state.error = null;
            state.admin = action.payload.admin;
            state.isAuthenticated = true;

        }).addCase(loginAdminThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
});

export const { logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
