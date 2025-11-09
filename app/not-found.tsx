import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ash-black">
            <div className="text-center">
                <h1 className="text-9xl font-top-show text-ultimate-red mb-4">
                    404
                </h1>
                <h2 className="text-4xl font-bold text-white mb-6">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-4 bg-ultimate-red hover:bg-ultimate-red-strong text-white font-semibold rounded-lg border border-white transition-all duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
