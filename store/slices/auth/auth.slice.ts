import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/authTypes';



const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    
    reducers: {

        setCredentials: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            if (action.payload.user.accessToken) {
                localStorage.setItem('token', action.payload.user.accessToken);
            }
            if (action.payload.user.refreshToken) {
                localStorage.setItem('refreshToken', action.payload.user.refreshToken);
            }
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
        
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
