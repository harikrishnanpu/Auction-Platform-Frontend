import axios from 'axios';
import { AppStore } from '@/store';
import { logout } from '@/store/features/auth/auth.slice';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});



export const setupAxios = (store: AppStore) => {

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry &&
                !originalRequest.url.includes('refresh-token')
            ) {
                originalRequest._retry = true;

                try {
                    const baseUrl = api.defaults.baseURL;
                    await axios.post(`${baseUrl}user/auth/refresh-token`, {}, { withCredentials: true });
                    return api(originalRequest);

                } catch (refreshError) {
                    console.log("Token-Refresh-Failed", refreshError);
                    store.dispatch(logout());
                }
            }
            return Promise.reject(error);
        },
    );
};


export default api;
