'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { getCurrentUserThunk } from '@/store/features/auth/auth.thunk';

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/verify',
  '/reset',
  '/reset-password',
];

const ADMIN_PUBLIC_ROUTES = ['/admin/login'];

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const [initialized, setInitialized] = useState(false);

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const init = async () => {
      await dispatch(getCurrentUserThunk());
      setInitialized(true);
    };

    if (!initialized) init();
  }, [dispatch, initialized]);

  useEffect(() => {
    if (!initialized || isLoading) return;


    if (isAdminRoute) {
      if (!isAuthenticated) {
        if (!ADMIN_PUBLIC_ROUTES.includes(pathname)) {
          router.replace('/admin/login');
        }
        return;
      }

      if (isAuthenticated && isAdmin && pathname === '/admin/login') {
        router.replace('/admin/dashboard');
        return;
      }

      if (isAuthenticated && !isAdmin) {
        router.replace('/home');
        return;
      }

      return;
    }


    if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/home');
      return;
    }

    if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/login');
      return;
    }
  }, [
    initialized,
    isLoading,
    isAuthenticated,
    isAdmin,
    pathname,
    router,
  ]);

  if (!initialized || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
