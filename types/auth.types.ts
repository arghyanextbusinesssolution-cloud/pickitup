export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'USER' | 'CARRIER' | 'ADMIN';
    avatar?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
