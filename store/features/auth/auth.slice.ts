import { AuthState, RegisterResponse, User } from '@/features/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUserThunk, loginUserThunk, registerUserThunk, verifyEmailThunk } from './auth.thunk';



const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {

        setCredentials: (state, action: PayloadAction<{ user: User, accessToken: string, refreshToken: string }>) => {

            state.isLoading = true;
            state.error = null;

            state.user = action.payload.user;
            state.isAuthenticated = true;

            if (action.payload.accessToken) {
                localStorage.setItem('token', action.payload.accessToken);
            }

            if (action.payload.refreshToken) {
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.error = null;
            state.isLoading = false;
        },

        logout: (state) => {

            state.isLoading = true;
            state.error = null;

            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            state.isLoading = false;
            state.error = null;
        },

    },

    extraReducers(builder) {

        builder.addCase(registerUserThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(registerUserThunk.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
            // Registration successful, but NOT authenticated yet.
            // User needs to verify email.
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(registerUserThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Registration failed';
        }).addCase(loginUserThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = true;

            // Store tokens to localStorage for persistence
            if (action.payload.user.accessToken) {
                localStorage.setItem('token', action.payload.user.accessToken);
            }
            if (action.payload.user.refreshToken) {
                localStorage.setItem('refreshToken', action.payload.user.refreshToken);
            }
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        }).addCase(loginUserThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Login failed';
        }).addCase(getCurrentUserThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(getCurrentUserThunk.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            // Do not clear tokens here. 
            // If it's a 401, the axios interceptor will handle logout/clearing.
            // If it's a network error, we want to keep the token to retry later.
        }).addCase(verifyEmailThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(verifyEmailThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = true;

            // Store tokens to localStorage for persistence (tokens come from backend response)
            if (action.payload.user.accessToken) {
                localStorage.setItem('token', action.payload.user.accessToken);
            }
            if (action.payload.user.refreshToken) {
                localStorage.setItem('refreshToken', action.payload.user.refreshToken);
            }
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        }).addCase(verifyEmailThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Verification failed';
        });

    },

});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
