import { Metadata } from "next";
import RankingsTable from "@/components/RankingsTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getRankings } from "@/lib/ftc-api";

export const metadata: Metadata = {
    title: "Match Results - Ragnarok FTC 24358",
    description: "View our latest match results and league rankings",
};

export const revalidate = 300; // Revalidate every 5 minutes
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
    let rankings = null;
    let error = null;

    try {
        const data = await getRankings();
        rankings = data;
    } catch (e) {
        error = e instanceof Error ? e.message : "Failed to fetch rankings";
        console.error("Error loading rankings:", e);
        // Don't fail the build if API key is missing during build time
        if (error.includes("FTC_API_KEY")) {
            error =
                "API key not configured. Set FTC_API_KEY environment variable.";
        }
    }

    return (
        <>
            {/* Header */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
                        Match <span className="gradient-text">Results</span>
                    </h1>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Our latest rankings and performance
                    </p>
                </div>
            </section>

            {/* Stats Overview */}
            {rankings && (
                <section className="py-10 md:py-12 relative">
                    <div className="container-custom">
                        <div className="card mb-8 glow-border">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                                {rankings.eventName}
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6 mb-8 text-gray-300 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-ultimate-red/20 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-ultimate-red"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">
                                        {rankings.startDate}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-elite-gold/20 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-elite-gold"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">
                                        {rankings.venue}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-6 rounded-xl bg-ultimate-red/10 border border-ultimate-red/30">
                                    <div className="text-4xl font-bold text-ultimate-red mb-2 font-display">
                                        {rankings.rank}
                                    </div>
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                                        of {rankings.totalTeams}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">
                                        Current Rank
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-xl bg-elite-gold/10 border border-elite-gold/30">
                                    <div className="text-4xl font-bold text-elite-gold mb-2 font-display">
                                        {rankings.wins}-{rankings.losses}-
                                        {rankings.ties}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium mt-2">
                                        Record
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-xl bg-gear-gray/40 border border-gear-gray/50">
                                    <div className="text-4xl font-bold text-white mb-2 font-display">
                                        {rankings.rankings
                                            .find(
                                                (r) => r.teamNumber === "24358"
                                            )
                                            ?.autoScore.toFixed(1) || "0.0"}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium mt-2">
                                        Avg Auto
                                    </div>
                                </div>
                                <div className="text-center p-6 rounded-xl bg-gear-gray/40 border border-gear-gray/50">
                                    <div className="text-4xl font-bold text-white mb-2 font-display">
                                        {rankings.rankings
                                            .find(
                                                (r) => r.teamNumber === "24358"
                                            )
                                            ?.driverScore.toFixed(1) || "0.0"}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium mt-2">
                                        Avg TeleOp
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Rankings Table */}
            <section className="py-10 md:py-12 pb-16 relative">
                <div className="container-custom">
                    <div className="card glow-border">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">
                            League Rankings
                        </h2>

                        {error && (
                            <div className="bg-ultimate-red/10 border-2 border-ultimate-red/40 rounded-xl p-8 text-center">
                                <p className="text-white font-semibold mb-2 text-lg">
                                    Rankings are not yet available for this
                                    season! Check back soon!
                                </p>
                            </div>
                        )}

                        {!rankings && !error && (
                            <LoadingSpinner message="Loading rankings..." />
                        )}

                        {rankings && (
                            <RankingsTable rankings={rankings.rankings} />
                        )}

                        {rankings?.lastUpdated && (
                            <p className="text-gray-500 text-xs text-center mt-8 pt-6 border-t border-ultimate-red/20">
                                Last updated:{" "}
                                {new Date(
                                    rankings.lastUpdated
                                ).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
