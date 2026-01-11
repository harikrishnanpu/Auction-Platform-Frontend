import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2500/api/v1/',
    withCredentials: true
});



api.interceptors.request.use((config) => {
    // Check if this is an admin route
    const isAdminRoute = config.url?.startsWith('/admin/');
    
    // Use admin token for admin routes, regular token for other routes
    const token = isAdminRoute 
        ? localStorage.getItem('adminToken')
        : localStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


import { AppStore } from '@/store';
import { setCredentials, logout } from '@/store/features/auth/auth.slice';



export const setupAxios = (store: AppStore) => {
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const baseUrl = api.defaults.baseURL || 'http://localhost:2500/api/v1/';
                    const { data } = await axios.post(`${baseUrl}user/auth/refresh-token`, {}, { withCredentials: true });

                    // Update tokens in localStorage
                    if (data.accessToken) {
                        localStorage.setItem('token', data.accessToken);
                    }
                    if (data.refreshToken) {
                        localStorage.setItem('refreshToken', data.refreshToken);
                    }

                    const currentUser = store.getState().auth.user;
                    if (currentUser) {
                        const updatedUser = { ...currentUser, accessToken: data.accessToken, refreshToken: data.refreshToken };
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        store.dispatch(setCredentials({
                            user: updatedUser,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken
                        }));
                    }

                    return api(originalRequest);
                } catch (refreshError) {
                    console.log("Token-Refresh-Failed", refreshError);
                    store.dispatch(logout());
                }
            }
            return Promise.reject(error);
        }
    );
};

export default api;
