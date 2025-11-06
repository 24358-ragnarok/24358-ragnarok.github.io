export default function ResultsComingSoon() {
    return (
        <div className="py-16 md:py-24">
            <div className="container-custom">
                <div className="card glow-border max-w-2xl mx-auto text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-ultimate-red/20 to-elite-gold/20 flex items-center justify-center border-2 border-ultimate-red/30">
                            <svg
                                className="w-12 h-12 md:w-16 md:h-16 text-ultimate-red"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
                        Results <span className="gradient-text">Coming Soon</span>
                    </h2>

                    {/* Divider */}
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
                        Match results and league rankings for the current season will
                        be available here once competitions begin. Check back soon for
                        updates!
                    </p>

                    {/* Decorative elements */}
                    <div className="flex justify-center gap-4 mt-10">
                        <div className="w-2 h-2 rounded-full bg-ultimate-red/60" />
                        <div className="w-2 h-2 rounded-full bg-elite-gold/60" />
                        <div className="w-2 h-2 rounded-full bg-ultimate-red/60" />
                    </div>
                </div>
            </div>
        </div>
    );
}

