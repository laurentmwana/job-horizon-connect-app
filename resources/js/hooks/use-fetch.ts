// hooks/useFetch.ts
import { fetchData } from '@/lib/fetch';
import { FetchResponse } from '@/types';
import { useEffect, useState } from 'react';

export const useFetch = <T>(path: string): FetchResponse<T> => {
    const [isPending, setIsPending] = useState(true);
    const [fetchDataState, setFetchDataState] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!path) return;

        const fetchAsync = async () => {
            setIsPending(true);
            setError(null);

            try {
                const data = await fetchData<T>(path);
                setFetchDataState(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Une erreur inconnue est survenue');
                setFetchDataState(null);
            } finally {
                setIsPending(false);
            }
        };

        fetchAsync();
    }, [path]);

    return {
        fetchData: fetchDataState,
        isPending,
        error,
    };
};
