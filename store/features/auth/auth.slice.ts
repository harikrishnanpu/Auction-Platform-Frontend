import { AuthState, RegisterResponse, User } from '@/features/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordThunk, getCurrentUserThunk, loginUserThunk, logoutThunk, registerUserThunk, resetPasswordThunk, verifyEmailThunk } from './auth.thunk';



const initialState: AuthState & { isHydrated: boolean } = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isHydrated: false,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
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
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(registerUserThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Registration failed';
        })



            .addCase(verifyEmailThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(verifyEmailThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {

                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;

            }).addCase(verifyEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Verification failed';
            })


            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            }).addCase(loginUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Login failed';
            })


            .addCase(getCurrentUserThunk.pending, (state) => {
                state.isLoading = true;
            }).addCase(getCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isHydrated = true;
            }).addCase(getCurrentUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.isHydrated = true;
            })


            .addCase(forgotPasswordThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(forgotPasswordThunk.fulfilled, (state, action: PayloadAction<{ success: boolean; message: string }>) => {
                state.isLoading = false;
                state.error = null;
            }).addCase(forgotPasswordThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to send reset link';
            })


            .addCase(resetPasswordThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(resetPasswordThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            }).addCase(resetPasswordThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to reset password';
            })


            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.user = null;
                state.isAuthenticated = false;
            }).addCase(logoutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to logout';
            })

    },

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
