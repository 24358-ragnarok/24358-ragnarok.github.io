interface LivestreamProps {
    videoId: string;
    title?: string;
}

export default function Livestream({ videoId, title }: LivestreamProps) {
    return (
        <div className="card glow-border max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 md:mb-6 font-display animate-pulse">
                LIVE NOW!
            </h2>
            {title && (
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-5 font-display">
                    {title}
                </h3>
            )}
            <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
            >
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title || "YouTube video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
