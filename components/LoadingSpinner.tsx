export default function LoadingSpinner({
    message = "Loading...",
}: {
    message?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="loading-spinner mb-4"></div>
            <p className="text-gray-400">{message}</p>
        </div>
    );
}
