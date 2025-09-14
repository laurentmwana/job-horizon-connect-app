export interface Auth {
    user: User;
}

export interface FlashMessage {
    success: string | null;
    danger: string | null;
    error: string | null;
    warning: string | null;
    info: string | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    baseUrl: string;
    flash: FlashMessage;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
