import { User } from "./authTypes";


export interface RegisterResponse {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    }
}