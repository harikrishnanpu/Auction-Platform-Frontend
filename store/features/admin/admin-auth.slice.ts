import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminAuthState, AdminLoginResponse, Admin } from '@/features/admin/auth/types';
import { loginAdminThunk } from './admin-auth.thunk';

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
        setAdminCredentials: (state, action: PayloadAction<{ admin: Admin, accessToken: string, refreshToken: string }>) => {
            state.isLoading = false;
            state.admin = action.payload.admin;
            state.isAuthenticated = true;
            localStorage.setItem('adminToken', action.payload.accessToken);
            localStorage.setItem('adminRefreshToken', action.payload.refreshToken);
            localStorage.setItem('admin', JSON.stringify(action.payload.admin));
        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminRefreshToken');
            localStorage.removeItem('admin');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAdminThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(loginAdminThunk.fulfilled, (state, action: PayloadAction<AdminLoginResponse>) => {
            state.isLoading = false;
            state.error = null;
            state.admin = action.payload.user;
            state.isAuthenticated = true;

            // Persistence
            if (action.payload.user.accessToken) {
                localStorage.setItem('adminToken', action.payload.user.accessToken);
            }
            if (action.payload.user.refreshToken) {
                localStorage.setItem('adminRefreshToken', action.payload.user.refreshToken);
            }
            localStorage.setItem('admin', JSON.stringify(action.payload.user));

        }).addCase(loginAdminThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setAdminCredentials, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
