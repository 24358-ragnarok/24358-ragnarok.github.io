"use client";

export default function ScrollDownIndicator() {
    const scrollToNext = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <button
                onClick={scrollToNext}
                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors group"
                aria-label="Scroll down"
            >
                <svg
                    className="w-6 h-6 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </button>
        </div>
    );
}
