"use client";

interface StateRankingProps {
    overallRank: number;
    autoRank: number;
    dcRank: number;
    lastUpdated?: string;
}

export default function StateRanking({
    overallRank,
    autoRank,
    dcRank,
    lastUpdated,
}: StateRankingProps) {
    return (
        <div className="card glow-border border-elite-gold/40">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-elite-gold font-display">
                    State Rankings
                </h2>
                {lastUpdated && (
                    <div className="text-xs text-gray-500">
                        Last updated:{" "}
                        {new Date(lastUpdated).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        })}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Overall Rank - Large and Prominent */}
                <div className="md:col-span-2 flex flex-col items-center justify-center p-8 rounded-2xl bg-ultimate-red/10 border-2 border-ultimate-red/40">
                    <div className="text-8xl md:text-9xl font-bold text-ultimate-red font-top-show mb-2">
                        #{overallRank}
                    </div>
                    <div className="text-xl md:text-2xl text-gray-300 font-medium">
                        team in Iowa
                    </div>
                </div>

                {/* Autonomous Rank */}
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gear-gray/40 border border-elite-gold/30">
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                        Autonomous
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-elite-gold font-top-show mb-1">
                        #{autoRank}
                    </div>
                    <div className="text-sm text-gray-400">Auto Rank</div>
                </div>

                {/* Driver Control Rank */}
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gear-gray/40 border border-elite-gold/30">
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                        Driver Control
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-elite-gold font-top-show mb-1">
                        #{dcRank}
                    </div>
                    <div className="text-sm text-gray-400">TeleOp Rank</div>
                </div>
            </div>
        </div>
    );
}
