import { useState } from 'react';

const getUrl = (path: string) => new URL(path, window.location.origin);

export const useParams = <T extends Record<string, string>>() => {
    const [params, setParams] = useState<T>(() => {
        const url = getUrl(window.location.href);
        return Object.fromEntries(url.searchParams.entries()) as T;
    });

    const mergeParams = (path: string): T => {
        const newUrl = getUrl(path);

        const merged = {
            ...params,
            ...Object.fromEntries(newUrl.searchParams.entries()),
        } as T;

        return merged;
    };

    return {
        params,
        setParams,
        mergeParams,
    };
};
