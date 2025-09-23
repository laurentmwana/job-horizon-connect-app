import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import type React from 'react';

type ErrorProps = { status: number; message: string };

const Error: React.FC<ErrorProps> = ({ status, message }) => {
    return (
        <div className="relative isolate min-h-screen">
            <Head title={status.toString()} />
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-blue-600 dark:via-purple-700 dark:to-pink-700 dark:opacity-15"
                    style={{
                        clipPath:
                            'polygon(45.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="mx-auto max-w-3xl space-y-5 py-12">
                <h2 className="text-3xl font-medium">{status}</h2>
                <p className="text-sm text-muted-foreground">{message}</p>
                <Button size="sm" variant="ghost" onClick={() => router.reload()}>
                    Réessayer
                </Button>
            </div>
        </div>
    );
};

export default Error;
