"use client";

import { useState } from "react";
import { TeamMatch, Event } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EventMatchGroupProps {
    event: Event;
    matches: TeamMatch[];
    teamNumber: number;
}

export default function EventMatchGroup({
    event,
    matches,
    teamNumber,
}: EventMatchGroupProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    // Filter to only played matches
    const playedMatches = matches
        .filter((m) => m.match.hasBeenPlayed && m.match.scores)
        .sort((a, b) => a.match.matchNum - b.match.matchNum);

    if (playedMatches.length === 0) return null;

    // Calculate event record
    let wins = 0;
    let losses = 0;
    let ties = 0;

    playedMatches.forEach((teamMatch) => {
        const match = teamMatch.match;
        const scores = match.scores;
        if (!scores) return;

        const ourScore =
            teamMatch.alliance === "Red"
                ? scores.red.totalPoints
                : scores.blue.totalPoints;
        const opponentScore =
            teamMatch.alliance === "Red"
                ? scores.blue.totalPoints
                : scores.red.totalPoints;

        if (ourScore > opponentScore) wins++;
        else if (ourScore < opponentScore) losses++;
        else ties++;
    });

    return (
        <div className="card glow-border mb-8">
            {/* Event Header - Clickable */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-ultimate-red/20 text-left transition-all"
            >
                <div className="flex-1 flex items-center gap-4">
                    <div className="shrink-0">
                        {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-ultimate-red" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-ultimate-red" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-display mb-2">
                            {event.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>
                                    {new Date(event.start).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                            </div>
                            {event.ongoing && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-green-400 font-semibold uppercase">
                                        Live
                                    </span>
                                </div>
                            )}
                            {event.finished && (
                                <span className="text-gray-500 uppercase font-semibold">
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Event Record */}
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#ffeb29] font-display">
                            {wins}-{losses}-{ties}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                            Event Record
                        </div>
                    </div>
                    {event.liveStreamURL && (
                        <a
                            href={event.liveStreamURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm px-4 py-2"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            Watch {event.ongoing ? "Live" : "Recording"}
                        </a>
                    )}
                </div>
            </button>

            {/* Event Stats Summary */}
            {event.stats && (
                <div className="mb-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Rank */}
                        <div className="text-center p-4 rounded-lg bg-ultimate-red/10 border border-ultimate-red/30">
                            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Event Rank
                            </div>
                            <div className="text-3xl font-bold text-ultimate-red font-display">
                                #{event.stats.rank}
                            </div>
                        </div>

                        {/* Max Points */}
                        <div className="text-center p-4 rounded-lg bg-gear-gray/40 border border-gray-500/30">
                            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                High Score
                            </div>
                            <div className="text-2xl font-bold text-white font-display">
                                {event.stats.max.totalPoints}
                            </div>
                        </div>

                        {/* OPR */}
                        <div className="text-center p-4 rounded-lg bg-gear-gray/40 border border-gray-500/30">
                            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                OPR
                            </div>
                            <div className="text-2xl font-bold text-white font-display">
                                {event.stats.opr.totalPoints.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Matches - Collapsible */}
            {isExpanded && (
                <div className="space-y-4 mt-6">
                    {playedMatches.map((teamMatch) => {
                        const match = teamMatch.match;
                        const scores = match.scores;

                        if (!scores) return null;

                        const ourAlliance = teamMatch.alliance;
                        const ourScore =
                            ourAlliance === "Red"
                                ? scores.red.totalPoints
                                : scores.blue.totalPoints;
                        const opponentScore =
                            ourAlliance === "Red"
                                ? scores.blue.totalPoints
                                : scores.red.totalPoints;
                        const won = ourScore > opponentScore;
                        const tied = ourScore === opponentScore;

                        // Get opponent teams
                        const opponentAlliance =
                            ourAlliance === "Red" ? "Blue" : "Red";
                        const opponents = match.teams.filter(
                            (t) => t.alliance === opponentAlliance
                        );
                        const partners = match.teams.filter(
                            (t) =>
                                t.alliance === ourAlliance &&
                                t.team.number !== teamNumber
                        );

                        return (
                            <div
                                key={match.matchNum}
                                className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                                    won
                                        ? "border-[#ffeb29]/40 bg-[#ffeb29]/5"
                                        : tied
                                        ? "border-gray-400/40 bg-gray-400/5"
                                        : "border-gray-500/40 bg-gray-500/5"
                                }`}
                            >
                                {/* Result Banner */}
                                <div
                                    className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg font-bold text-sm ${
                                        won
                                            ? "bg-[#ffeb29] text-black"
                                            : tied
                                            ? "bg-gray-400 text-white"
                                            : "bg-gray-600 text-white"
                                    }`}
                                >
                                    {won ? "✓ WIN" : tied ? "TIE" : "✗ LOSS"}
                                </div>

                                <div className="p-5">
                                    {/* Match Header */}
                                    <div className="mb-4">
                                        <span className="text-gray-400 text-sm font-semibold">
                                            Match {match.matchNum}
                                        </span>
                                    </div>

                                    {/* Score Display - Large and Clear */}
                                    <div className="flex items-center justify-center gap-6 mb-6">
                                        {/* Our Score */}
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                                Us
                                            </div>
                                            <div
                                                className={`text-5xl md:text-6xl font-bold font-top-show ${
                                                    won
                                                        ? "text-[#ffeb29]"
                                                        : tied
                                                        ? "text-gray-300"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {ourScore}
                                            </div>
                                            {/* Alliance Color Indicator */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${
                                                        ourAlliance === "Red"
                                                            ? "bg-red-500"
                                                            : "bg-blue-500"
                                                    }`}
                                                />
                                                <span className="text-xs text-gray-500 uppercase">
                                                    {ourAlliance}
                                                </span>
                                            </div>
                                        </div>

                                        {/* VS */}
                                        <div className="text-3xl text-gray-600 font-top-show">
                                            VS
                                        </div>

                                        {/* Opponent Score */}
                                        <div className="flex flex-col items-center">
                                            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                                Them
                                            </div>
                                            <div
                                                className={`text-5xl md:text-6xl font-bold font-top-show ${
                                                    won
                                                        ? "text-gray-600"
                                                        : tied
                                                        ? "text-gray-300"
                                                        : "text-gray-300"
                                                }`}
                                            >
                                                {opponentScore}
                                            </div>
                                            {/* Alliance Color Indicator */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${
                                                        opponentAlliance ===
                                                        "Red"
                                                            ? "bg-red-500"
                                                            : "bg-blue-500"
                                                    }`}
                                                />
                                                <span className="text-xs text-gray-500 uppercase">
                                                    {opponentAlliance}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Teams Info */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                                        {/* Our Alliance */}
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                                Our Alliance
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-gray-400 font-top-show">
                                                    #{teamNumber} Ragnarok
                                                </div>
                                                {partners.length > 0 && (
                                                    <div className="text-gray-400 space-y-1">
                                                        {partners.map((p) => (
                                                            <div
                                                                key={
                                                                    p.team
                                                                        .number
                                                                }
                                                            >
                                                                {p.team
                                                                    .website ? (
                                                                    <a
                                                                        href={
                                                                            p
                                                                                .team
                                                                                .website
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:text-white transition-colors !underline"
                                                                    >
                                                                        #
                                                                        {
                                                                            p
                                                                                .team
                                                                                .number
                                                                        }{" "}
                                                                        {
                                                                            p
                                                                                .team
                                                                                .name
                                                                        }
                                                                    </a>
                                                                ) : (
                                                                    <span>
                                                                        #
                                                                        {
                                                                            p
                                                                                .team
                                                                                .number
                                                                        }{" "}
                                                                        {
                                                                            p
                                                                                .team
                                                                                .name
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Opponent Alliance */}
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                                Opponents
                                            </div>
                                            <div className="text-sm text-gray-400 space-y-1">
                                                {opponents.map((o) => (
                                                    <div key={o.team.number}>
                                                        {o.team.website ? (
                                                            <a
                                                                href={
                                                                    o.team
                                                                        .website
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hover:text-white transition-colors !underline"
                                                            >
                                                                #{o.team.number}{" "}
                                                                {o.team.name}
                                                            </a>
                                                        ) : (
                                                            <span>
                                                                #{o.team.number}{" "}
                                                                {o.team.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
