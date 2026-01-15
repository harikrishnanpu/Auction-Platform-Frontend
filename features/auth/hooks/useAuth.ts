import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import { logout } from '@/store/features/auth/auth.slice';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

    const signOut = async () => {
        try {
            await api.post('/user/auth/logout');
        } catch (error) {
            console.error("Logout failed", error);
        }
        dispatch(logout());
        router.push('/login');
    };

    // We can also trigger user fetch here if not present?
    // Better to do it in a top level component (AuthInitializer).

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        signOut
    };
};
