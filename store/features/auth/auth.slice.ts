import { AuthState, RegisterResponse, User } from '@/features/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordThunk, getCurrentUserThunk, loginUserThunk, registerUserThunk, resetPasswordThunk, verifyEmailThunk } from './auth.thunk';



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
            
            
            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                if (action.payload.user.accessToken) {
                    localStorage.setItem('token', action.payload.user.accessToken);
                }
                if (action.payload.user.refreshToken) {
                    localStorage.setItem('refreshToken', action.payload.user.refreshToken);
                }

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
            }).addCase(getCurrentUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            
            .addCase(verifyEmailThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(verifyEmailThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                if (action.payload.user.accessToken) {
                    localStorage.setItem('token', action.payload.user.accessToken);
                }
                if (action.payload.user.refreshToken) {
                    localStorage.setItem('refreshToken', action.payload.user.refreshToken);
                }


            }).addCase(verifyEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Verification failed';
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

    },

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
