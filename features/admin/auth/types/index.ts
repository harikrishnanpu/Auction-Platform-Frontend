
export interface Admin{
    id: string;
    name: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    roles: string[];
}



export interface AdminAuthState { 
    admin: Admin | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface AdminLoginResponse {
    admin: Admin;
}


