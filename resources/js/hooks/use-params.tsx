import { useState } from 'react';

const getUrl = (path: string) => new URL(path, window.location.origin);

export const useParams = <T extends Record<string, string>>() => {
    const [params, setParams] = useState<T>(() => {
        const url = getUrl(window.location.href);
        return Object.fromEntries(url.searchParams.entries()) as T;
    });

    const mergeParams = (path: string, extra: Record<string, string> = {}): string => {
        const newUrl = getUrl(path);

        const merged = {
            ...params,
            ...Object.fromEntries(newUrl.searchParams.entries()),
            ...extra,
        };

        const finalUrl = getUrl(newUrl.pathname);
        Object.entries(merged).forEach(([key, value]) => {
            if (value != null && value !== '') {
                finalUrl.searchParams.set(key, value);
            }
        });

        return finalUrl.toString();
    };

    return {
        params,
        setParams,
        mergeParams,
    };
};
