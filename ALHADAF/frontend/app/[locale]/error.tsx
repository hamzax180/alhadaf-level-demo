'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
            <h2 className="text-2xl font-extrabold text-red-600">Something went wrong!</h2>
            <p className="mt-2 text-[color:var(--muted)]">{error.message || 'An unexpected error occurred.'}</p>
            <button
                onClick={() => reset()}
                className="mt-6 px-6 py-2 rounded-xl bg-[color:var(--brand-1)] text-white font-bold"
            >
                Try again
            </button>
        </div>
    );
}
