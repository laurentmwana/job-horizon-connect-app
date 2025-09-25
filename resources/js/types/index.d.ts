import { Candidate } from './model';

export interface Auth {
    user: User;
    guard: {
        is_anonymous: boolean;
        is_admin: boolean;
        is_candidate: boolean;
    };
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
    id: string;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    candidate: Candidate | null;
    [key: string]: unknown; // This allows for additional properties...
}

export interface QueryBuilderFilterModel {
    items: { view: string; value: string }[];
}
export interface FetchResponse<T> {
    fetchData: T | null;
    isPending: boolean;
    error: string | null;
}
