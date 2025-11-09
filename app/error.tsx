"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary for all pages
 * Automatically shown by Next.js when errors occur
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-6xl md:text-7xl font-bold font-display mb-6">
                    <span className="gradient-text">Oops!</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Something went wrong
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                    We encountered an unexpected error. Please try again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={reset}
                        className="btn-primary text-lg px-8 py-4"
                    >
                        Try Again
                    </button>
                    <Link href="/" className="btn-secondary text-lg px-8 py-4">
                        Go Home
                    </Link>
                </div>
                {process.env.NODE_ENV === "development" && error.message && (
                    <details className="mt-8 text-left bg-gear-gray/20 border border-ultimate-red/30 rounded-xl p-6">
                        <summary className="cursor-pointer text-elite-gold font-semibold mb-2">
                            Error Details (Development Only)
                        </summary>
                        <pre className="text-xs text-gray-300 overflow-auto">
                            {error.message}
                            {error.stack && `\n\n${error.stack}`}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}

