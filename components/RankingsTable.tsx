"use client";

import { useState } from "react";
import { RankingData } from "@/lib/types";

interface RankingsTableProps {
    rankings: RankingData[];
}

export default function RankingsTable({ rankings }: RankingsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"rank" | "auto" | "teleop" | "total">(
        "rank"
    );

    // Filter rankings based on search
    const filteredRankings = rankings.filter(
        (team) =>
            team.teamNumber.includes(searchTerm) ||
            team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort rankings
    const sortedRankings = [...filteredRankings].sort((a, b) => {
        switch (sortBy) {
            case "rank":
                return a.rank - b.rank;
            case "auto":
                return b.autoScore - a.autoScore;
            case "teleop":
                return b.driverScore - a.driverScore;
            case "total":
                return b.totalPoints - a.totalPoints;
            default:
                return 0;
        }
    });

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-5 py-3.5 bg-gear-gray/40 border border-ultimate-red/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultimate-red/50 focus:border-ultimate-red transition-all"
                />

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {[
                        { value: "rank", label: "Ranked" },
                        { value: "auto", label: "Best Auto" },
                        { value: "teleop", label: "Best TeleOp" },
                        { value: "total", label: "Most Points" },
                    ].map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setSortBy(value as typeof sortBy)}
                            className={`px-5 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                                sortBy === value
                                    ? "bg-ultimate-red text-white shadow-lg"
                                    : "bg-gear-gray/40 text-gray-300 hover:bg-gear-gray/60 border border-ultimate-red/20"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-ultimate-red/30 bg-gear-gray/20">
                <table className="w-full">
                    <thead className="bg-gear-gray/60 border-b border-ultimate-red/30">
                        <tr>
                            <th className="px-5 py-4 text-left text-ultimate-red font-bold font-display">
                                Rank
                            </th>
                            <th className="px-5 py-4 text-left text-ultimate-red font-bold font-display">
                                Team
                            </th>
                            <th className="px-5 py-4 text-left text-ultimate-red font-bold font-display">
                                Record
                            </th>
                            <th className="px-5 py-4 text-center text-ultimate-red font-bold font-display">
                                Matches
                            </th>
                            <th className="px-5 py-4 text-center text-ultimate-red font-bold font-display">
                                Auto
                            </th>
                            <th className="px-5 py-4 text-center text-ultimate-red font-bold font-display">
                                TeleOp
                            </th>
                            <th className="px-5 py-4 text-center text-ultimate-red font-bold font-display">
                                End
                            </th>
                            <th className="px-5 py-4 text-center text-ultimate-red font-bold font-display">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRankings.map((team) => (
                            <tr
                                key={team.teamNumber}
                                className={`border-b border-gear-gray/30 transition-colors ${
                                    team.teamNumber === "24358"
                                        ? "bg-elite-gold/15 hover:bg-elite-gold/20"
                                        : "hover:bg-gear-gray/30"
                                }`}
                            >
                                <td className="px-5 py-4 text-white font-bold">
                                    {team.rank}
                                </td>
                                <td
                                    className={`px-5 py-4 font-display ${
                                        team.teamNumber === "24358"
                                            ? "text-elite-gold font-bold text-lg"
                                            : "text-white"
                                    }`}
                                >
                                    <span className={team.teamNumber === "24358" ? "text-elite-gold font-bold" : "text-white font-semibold"}>
                                        {team.teamName}
                                    </span>{" "}
                                    <span className="text-gray-400 text-sm font-normal">
                                        {team.teamNumber}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-gray-300">
                                    {team.record}
                                </td>
                                <td className="px-5 py-4 text-center text-gray-300">
                                    {team.matchesPlayed}
                                </td>
                                <td className="px-5 py-4 text-center text-white font-semibold">
                                    {team.autoScore.toFixed(1)}
                                </td>
                                <td className="px-5 py-4 text-center text-white font-semibold">
                                    {team.driverScore.toFixed(1)}
                                </td>
                                <td className="px-5 py-4 text-center text-white font-semibold">
                                    {team.endScore.toFixed(1)}
                                </td>
                                <td className="px-5 py-4 text-center text-ultimate-red font-bold text-lg">
                                    {team.totalPoints}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredRankings.length === 0 && (
                <div className="text-center py-16 text-gray-400 text-lg">
                    No teams found matching &quot;{searchTerm}&quot;
                </div>
            )}
        </div>
    );
}
