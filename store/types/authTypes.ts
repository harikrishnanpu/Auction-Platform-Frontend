
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar_url?: string;
    roles: string[];
    accessToken?: string;
    refreshToken?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}
