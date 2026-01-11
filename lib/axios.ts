import axios from 'axios';
import { setCredentials, logout } from '@/store/slices/auth/auth.slice';
import { store } from '@/store/store';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
});



api.interceptors.request.use((config) => {
    return config;
}, (error) => Promise.reject(error));


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post('http://localhost:4000/api/auth/refresh-token', {}, { withCredentials: true });

                const currentUser = store.getState().auth.user;
                if (currentUser) {
                    const updatedUser = { ...currentUser, ...data };
                    localStorage.setItem('user', JSON.stringify(updatedUser)); 
                    store.dispatch(setCredentials({ user: updatedUser }));
                }

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);
                store.dispatch(logout());
            }
        }
        return Promise.reject(error);
    }
);

export default api;
