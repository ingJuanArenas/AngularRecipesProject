export interface User{
    name: string;
    email: string;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse{
    name: string;
    email: string;
    token: string;
}