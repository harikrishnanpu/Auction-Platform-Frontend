

export enum userRole {
    ADMIN = "ADMIN",
    USER = "USER",
    SELLER = "SELLER"
}


export interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    roles: userRole[];
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}


export interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: User;
}