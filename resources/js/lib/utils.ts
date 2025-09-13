import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * @param content
 * @returns
 */
export const getInitials = (content: string) => {
    if (!content) return null;

    return content
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

export function excerpt(text?: string, limit: number = 100, separator: string = '...'): string | null {
    if (!text || typeof text !== 'string') return '';

    if (text.length <= limit) {
        return text;
    }
    if (!text) return null;

    let truncated = text.substring(0, limit);

    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
        truncated = truncated.substring(0, lastSpaceIndex);
    }

    return truncated + separator;
}

