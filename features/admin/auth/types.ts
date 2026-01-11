export interface Admin {
    id: string;
    name: string;
    email: string;
    roles: string[];
    accessToken?: string;
    refreshToken?: string;
}

export interface AdminAuthState {
    admin: Admin | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    user: Admin;
}
