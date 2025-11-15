"use client";

import { useState, useEffect, useRef } from "react";
import { points, getAllPointTypes, getCombinedScore } from "@/data/points";

interface ScoreboardEntry {
    name: string;
    pointsByClass: { [key: string]: number };
    combined: number;
}

// Format large numbers to prevent overflow
function formatNumber(num: number): string {
    const abs = Math.abs(num);
    const format = (value: number, suffix: string) => {
        const rounded = Math.round(value * 10) / 10;
        // If the value has no decimal after rounding, display as integer, else one decimal
        return (
            (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)) +
            suffix
        );
    };
    if (abs >= 1e12) return format(num / 1e12, "T");
    if (abs >= 1e9) return format(num / 1e9, "B");
    if (abs >= 1e6) return format(num / 1e6, "M");
    if (abs >= 1e3) return format(num / 1e3, "K");
    return num.toString();
}

// Absurd messages based on score
function getAbsurdMessage(score: number, rank: number, total: number): string {
    const absScore = Math.abs(score);
    if (rank === 1) {
        if (absScore >= 1e9) return "🌌 GALACTIC OVERLORD 🌌";
        if (absScore >= 1e6) return "👑 MEGA CHAMPION 👑";
        if (absScore >= 1000) return "🏆 ABSOLUTE LEGEND 🏆";
        if (absScore >= 100) return "🌟 RISING STAR 🌟";
        return "✨ PARTICIPATION TROPHY ✨";
    }
    if (rank === total) {
        if (absScore >= 1e9) return "💀 ABSOLUTELY OBLITERATED 💀";
        if (absScore >= 1e6) return "💥 NUCLEAR DISASTER 💥";
        if (absScore >= 1000) return "💀 ABSOLUTELY DEMOLISHED 💀";
        if (score < 0) return "😱 IN THE NEGATIVES 😱";
        return "🤡 BARELY ALIVE 🤡";
    }
    if (score === 0) return "🎭 PERFECTLY MEDIOCRE 🎭";
    if (score < 0) return "📉 GOING DOWNHILL 📉";
    if (absScore >= 1000) return "🔥 ON FIRE 🔥";
    return "🎪 LIVING THE DREAM 🎪";
}

export default function PointsPage() {
    const [selectedPclass, setSelectedPclass] = useState<string>("combined");
    const [scoreboardData, setScoreboardData] = useState<ScoreboardEntry[]>([]);
    const [partyMode, setPartyMode] = useState(false);
    const [chaosMode, setChaosMode] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const allPclasses = getAllPointTypes();

    useEffect(() => {
        const processed: ScoreboardEntry[] = Object.entries(points).map(
            ([name, data]) => ({
                name,
                pointsByClass: data,
                combined: getCombinedScore(name),
            })
        );

        const sortKey = (entry: ScoreboardEntry) => {
            if (selectedPclass === "combined") {
                return entry.combined;
            }
            return entry.pointsByClass[selectedPclass] || 0;
        };

        processed.sort((a, b) => sortKey(b) - sortKey(a));
        setScoreboardData(processed);
    }, [selectedPclass]);

    // Easter egg: Click title 10 times for chaos mode
    const handleTitleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 10) {
            setChaosMode(true);
            setPartyMode(true);
            setTimeout(() => setChaosMode(false), 10000);
        }
    };

    const topThree = scoreboardData.slice(0, 3);
    const lastEntry =
        scoreboardData.length > 3
            ? scoreboardData[scoreboardData.length - 1]
            : null;
    const middleEntries =
        scoreboardData.length > 4 ? scoreboardData.slice(3, -1) : [];

    return (
        <div className="min-h-screen py-12 md:py-16 relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse" />
                <div className="animated-bg-1" />
                <div className="animated-bg-2" />
                {partyMode && <PartyModeBackground />}
                {chaosMode && <ChaosModeBackground />}
            </div>

            {/* Floating emojis */}
            {partyMode && <FloatingEmojis />}

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
                    <div className="flex items-center gap-4">
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center gap-4 cursor-pointer"
                            onClick={handleTitleClick}
                        >
                            <span className="text-5xl md:text-6xl trophy-spin inline-block hover:scale-150 transition-transform">
                                🏆
                            </span>
                            <span className="title-pulse bg-gradient-to-r from-yellow-400 via-yellow-300 to-red-500 bg-clip-text text-transparent hover:animate-spin">
                                LEADERBOARD
                            </span>
                            {chaosMode && (
                                <span className="text-4xl animate-spin">
                                    🌀
                                </span>
                            )}
                        </h1>
                        <button
                            onClick={() => setPartyMode(!partyMode)}
                            className="text-4xl hover:scale-150 transition-transform duration-300 animate-bounce party-button"
                            title="Toggle Party Mode 🎉"
                        >
                            {partyMode ? "🎉" : "🎊"}
                        </button>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border-2 border-white/20 hover:scale-105 hover:border-purple-500/50 transition-all duration-500 filter-hover">
                        <label
                            htmlFor="pclass"
                            className="text-gray-300 font-semibold flex items-center gap-2"
                        >
                            <span className="animate-spin">🔍</span> Filter:
                        </label>
                        <select
                            id="pclass"
                            value={selectedPclass}
                            onChange={(e) => setSelectedPclass(e.target.value)}
                            className="bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2 text-white font-semibold cursor-pointer hover:border-purple-500/50 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-400"
                        >
                            <option value="combined">🏆 Combined</option>
                            {allPclasses.map((pclass) => (
                                <option key={pclass} value={pclass}>
                                    {pclass.charAt(0).toUpperCase() +
                                        pclass.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {scoreboardData.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6 animate-bounce">📊</div>
                        <h3 className="text-3xl font-bold mb-4">
                            No Data Available
                        </h3>
                        <p className="text-gray-400 text-lg">
                            The leaderboard is empty! Start by adding people and
                            awarding points.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* TOP 3 PODIUM */}
                        {topThree.length >= 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
                                {topThree.map((entry, index) => {
                                    const rank = index + 1;
                                    const score =
                                        selectedPclass === "combined"
                                            ? entry.combined
                                            : entry.pointsByClass[
                                                  selectedPclass
                                              ] || 0;
                                    return (
                                        <PodiumCard
                                            key={entry.name}
                                            entry={entry}
                                            rank={rank}
                                            score={score}
                                            isFirst={rank === 1}
                                            isSecond={rank === 2}
                                            isThird={rank === 3}
                                            partyMode={partyMode}
                                            chaosMode={chaosMode}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* LAST PLACE SHAME SECTION */}
                        {lastEntry && scoreboardData.length > 3 && (
                            <LastPlaceCard
                                entry={lastEntry}
                                selectedPclass={selectedPclass}
                                rank={scoreboardData.length}
                                total={scoreboardData.length}
                                partyMode={partyMode}
                                chaosMode={chaosMode}
                            />
                        )}

                        {/* MIDDLE RANKINGS */}
                        {middleEntries.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-3xl font-bold text-center mb-8 text-gray-400 uppercase tracking-wider animate-pulse">
                                    📋 THE MIDDLE GROUND 📋
                                </h3>
                                <div className="space-y-4">
                                    {middleEntries.map((entry, index) => {
                                        const rank = index + 4;
                                        const score =
                                            selectedPclass === "combined"
                                                ? entry.combined
                                                : entry.pointsByClass[
                                                      selectedPclass
                                                  ] || 0;
                                        return (
                                            <PlayerCard
                                                key={entry.name}
                                                entry={entry}
                                                rank={rank}
                                                score={score}
                                                delay={index * 0.1}
                                                total={scoreboardData.length}
                                                partyMode={partyMode}
                                                chaosMode={chaosMode}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <PointsPageStyles />
        </div>
    );
}

function PodiumCard({
    entry,
    rank,
    score,
    isFirst,
    isSecond,
    isThird,
    partyMode,
    chaosMode,
}: {
    entry: ScoreboardEntry;
    rank: number;
    score: number;
    isFirst: boolean;
    isSecond: boolean;
    isThird: boolean;
    partyMode: boolean;
    chaosMode: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [randomColor, setRandomColor] = useState(false);
    const scoreRef = useRef<HTMLDivElement>(null);
    const medal = isFirst ? "🥇" : isSecond ? "🥈" : "🥉";
    const message = getAbsurdMessage(score, rank, 3);
    const formattedScore = formatNumber(score);

    useEffect(() => {
        if (scoreRef.current) {
            animateNumber(scoreRef.current, 0, score, 1500);
        }
    }, [score]);

    useEffect(() => {
        if (chaosMode) {
            const interval = setInterval(() => {
                setRandomColor(!randomColor);
            }, 200);
            return () => clearInterval(interval);
        }
    }, [chaosMode, randomColor]);

    return (
        <div
            className={`podium-card relative bg-white/10 backdrop-blur-2xl border-2 rounded-3xl p-8 text-center transition-all duration-600 cursor-pointer ${
                isFirst
                    ? "md:order-2 scale-110 md:scale-125 z-30 border-yellow-500/50 first-place"
                    : isSecond
                    ? "md:order-1 scale-105 z-20 border-gray-400/50 second-place"
                    : "md:order-3 scale-105 z-20 border-amber-700/50 third-place"
            } ${isHovered ? "hover-active" : ""} ${
                partyMode ? "party-mode" : ""
            } ${chaosMode ? "chaos-mode" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="podium-border" />
            <div
                className={`medal-icon text-6xl mb-4 inline-block ${
                    isHovered ? "spinning" : "floating"
                } ${chaosMode ? "chaos-spin" : ""}`}
            >
                {medal}
            </div>
            <div
                className={`rank-number text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent ${
                    isFirst ? "text-7xl md:text-8xl" : ""
                } pulsing ${chaosMode ? "chaos-pulse" : ""}`}
            >
                {rank}
            </div>
            <div className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">
                {entry.name}
            </div>
            <div className="text-sm text-gray-400 mb-4 italic">{message}</div>
            <div
                ref={scoreRef}
                className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent break-words overflow-hidden"
                style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    maxWidth: "100%",
                }}
            >
                {formattedScore}
                <div className="text-xs text-gray-400 mt-2"> POINTS</div>
            </div>
            {isFirst && isHovered && (
                <Confetti count={partyMode ? 30 : 15} chaos={chaosMode} />
            )}
            {partyMode && <PartyParticles />}
            {chaosMode && <ChaosParticles />}
            {isHovered && <Sparkles />}
        </div>
    );
}

function LastPlaceCard({
    entry,
    selectedPclass,
    rank,
    total,
    partyMode,
    chaosMode,
}: {
    entry: ScoreboardEntry;
    selectedPclass: string;
    rank: number;
    total: number;
    partyMode: boolean;
    chaosMode: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const scoreRef = useRef<HTMLDivElement>(null);
    const score =
        selectedPclass === "combined"
            ? entry.combined
            : entry.pointsByClass[selectedPclass] || 0;
    const message = getAbsurdMessage(score, rank, total);
    const formattedScore = formatNumber(score);

    useEffect(() => {
        if (scoreRef.current) {
            animateNumber(scoreRef.current, 0, score, 1500);
        }
    }, [score]);

    return (
        <div className="last-place-section my-16 p-10 bg-gradient-to-br from-pink-900/15 to-red-900/15 border-3 border-dashed border-pink-500/50 rounded-3xl relative overflow-hidden shame-glow">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="warning-icon text-[10rem] opacity-5 shame-shake">
                    ⚠️
                </div>
            </div>
            <h2 className="text-4xl font-black text-red-500 mb-8 text-center uppercase tracking-widest shame-shake">
                💀 HALL OF SHAME 💀
            </h2>
            <div
                className={`last-place-card bg-white/10 backdrop-blur-xl border-2 border-pink-500/40 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 cursor-pointer shame-wobble ${
                    isHovered ? "shame-intensify" : ""
                } ${partyMode ? "party-mode" : ""} ${
                    chaosMode ? "chaos-mode" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center gap-6">
                    <div className="text-6xl sad-face-rotate">😭</div>
                    <div>
                        <div className="text-red-500 font-bold text-lg uppercase tracking-wider mb-2">
                            LAST PLACE
                        </div>
                        <div className="text-3xl font-black text-white mb-2">
                            {entry.name}
                        </div>
                        <div className="text-gray-400 italic mb-1">
                            "{message}"
                        </div>
                        <div className="text-xs text-gray-500">
                            Better luck next time... maybe? 🤷
                        </div>
                    </div>
                </div>
                <div
                    ref={scoreRef}
                    className="text-4xl md:text-5xl font-black text-red-500 text-right points-blink break-words overflow-hidden"
                    style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: "100%",
                    }}
                >
                    {score} POINTS
                </div>
            </div>
            {isHovered && (
                <Tears count={partyMode ? 15 : 8} chaos={chaosMode} />
            )}
            {partyMode && <PartyParticles />}
            {chaosMode && <ChaosParticles />}
        </div>
    );
}

function PlayerCard({
    entry,
    rank,
    score,
    delay,
    total,
    partyMode,
    chaosMode,
}: {
    entry: ScoreboardEntry;
    rank: number;
    score: number;
    delay: number;
    total: number;
    partyMode: boolean;
    chaosMode: boolean;
}) {
    const scoreRef = useRef<HTMLDivElement>(null);
    const message = getAbsurdMessage(score, rank, total);
    const formattedScore = formatNumber(score);

    useEffect(() => {
        if (scoreRef.current) {
            animateNumber(scoreRef.current, 0, score, 1500);
        }
    }, [score]);

    return (
        <div
            className="player-card bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 md:p-8 flex items-center justify-between transition-all duration-500 cursor-pointer hover:translate-x-4 hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl relative overflow-hidden group"
            style={{
                animation: `slideInLeft 0.6s ease-out ${delay}s both`,
            }}
        >
            <div className="shimmer-effect" />
            <div className="flex items-center gap-6 relative z-10 flex-1 min-w-0">
                <div className="rank-badge w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-black text-gray-400 group-hover:rotate-360 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:text-white transition-all duration-400 shrink-0">
                    {rank}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold text-white uppercase tracking-wide truncate">
                        {entry.name}
                    </div>
                    <div className="text-xs text-gray-400 italic mt-1 truncate">
                        {message}
                    </div>
                </div>
            </div>
            <div
                ref={scoreRef}
                className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent min-w-[80px] text-right relative z-10 group-hover:scale-125 transition-transform duration-400 break-words overflow-hidden shrink-0"
                style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                }}
            >
                {formattedScore}
            </div>
            {partyMode && <PartyParticles />}
            {chaosMode && <ChaosParticles />}
        </div>
    );
}

function Confetti({
    count = 15,
    chaos = false,
}: {
    count?: number;
    chaos?: boolean;
}) {
    const emojis = [
        "🎉",
        "🎊",
        "✨",
        "⭐",
        "🌟",
        "💫",
        "🎈",
        "🎁",
        "🏆",
        "🎯",
        "🎪",
        "🎨",
    ];
    const [confetti, setConfetti] = useState<
        Array<{ id: number; emoji: string; x: number; y: number }>
    >([]);

    useEffect(() => {
        const newConfetti = Array.from({ length: count }, (_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: Math.random() * 100,
            y: 0,
        }));
        setConfetti(newConfetti);
        const timer = setTimeout(() => setConfetti([]), chaos ? 5000 : 2000);
        return () => clearTimeout(timer);
    }, [count, chaos]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {confetti.map((c) => (
                <div
                    key={c.id}
                    className="absolute text-3xl transition-all duration-2000 ease-out"
                    style={{
                        left: `${c.x}%`,
                        top: `${c.y}%`,
                        transform: `translateY(${
                            Math.random() * 500 - 250
                        }px) translateX(${
                            Math.random() * 400 - 200
                        }px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0,
                        animation: chaos
                            ? `chaosFloat ${
                                  2 + Math.random() * 2
                              }s ease-in-out infinite`
                            : undefined,
                    }}
                >
                    {c.emoji}
                </div>
            ))}
        </div>
    );
}

function Tears({
    count = 8,
    chaos = false,
}: {
    count?: number;
    chaos?: boolean;
}) {
    const tears = ["💧", "😢", "😭", "💔", "😰", "😱", "😵", "🤮"];
    const [tearElements, setTearElements] = useState<
        Array<{ id: number; emoji: string; x: number; y: number }>
    >([]);

    useEffect(() => {
        const newTears = Array.from({ length: count }, (_, i) => ({
            id: i,
            emoji: tears[Math.floor(Math.random() * tears.length)],
            x: Math.random() * 100,
            y: 0,
        }));
        setTearElements(newTears);
        const timer = setTimeout(
            () => setTearElements([]),
            chaos ? 3000 : 1500
        );
        return () => clearTimeout(timer);
    }, [count, chaos]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {tearElements.map((t) => (
                <div
                    key={t.id}
                    className="absolute text-2xl transition-all duration-1500 ease-in"
                    style={{
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        transform: `translateY(300px)`,
                        opacity: 0,
                        animation: chaos
                            ? `chaosTear ${
                                  1 + Math.random()
                              }s ease-in-out infinite`
                            : undefined,
                    }}
                >
                    {t.emoji}
                </div>
            ))}
        </div>
    );
}

function FloatingEmojis() {
    const emojis = ["🎉", "🎊", "✨", "⭐", "🌟", "💫", "🎈"];
    return (
        <div className="fixed inset-0 pointer-events-none z-20">
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute text-2xl floating-emoji"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                >
                    {emojis[Math.floor(Math.random() * emojis.length)]}
                </div>
            ))}
        </div>
    );
}

function PartyModeBackground() {
    return (
        <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full party-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    );
}

function ChaosModeBackground() {
    return (
        <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full chaos-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        animationDelay: `${Math.random() * 1}s`,
                    }}
                />
            ))}
        </div>
    );
}

function PartyParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full party-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        animationDelay: `${Math.random() * 1}s`,
                    }}
                />
            ))}
        </div>
    );
}

function ChaosParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full chaos-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        animationDelay: `${Math.random() * 0.5}s`,
                    }}
                />
            ))}
        </div>
    );
}

function Sparkles() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full sparkle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 1}s`,
                    }}
                />
            ))}
        </div>
    );
}

function animateNumber(
    element: HTMLElement,
    start: number,
    end: number,
    duration: number
) {
    const startTime = performance.now();
    const originalText = element.textContent || "";

    function updateNumber(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        const formatted = formatNumber(currentValue);
        const match = originalText.match(/(-?\d+\.?\d*[KMBT]?)/);
        if (match) {
            element.textContent = originalText.replace(
                /(-?\d+\.?\d*[KMBT]?)/,
                formatted
            );
        } else {
            element.textContent = formatted;
        }
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    requestAnimationFrame(updateNumber);
}

function PointsPageStyles() {
    return (
        <style jsx>{`
            .animated-bg-1 {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(
                    circle at 20% 80%,
                    rgba(120, 119, 198, 0.3) 0%,
                    transparent 50%
                );
                animation: backgroundShift 20s ease-in-out infinite;
            }

            .animated-bg-2 {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(
                    circle at 80% 20%,
                    rgba(255, 119, 198, 0.3) 0%,
                    transparent 50%
                );
                animation: backgroundShift 25s ease-in-out infinite;
            }

            .trophy-spin {
                animation: trophySpin 4s ease-in-out infinite;
                filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
            }

            .title-pulse {
                animation: titlePulse 3s ease-in-out infinite;
            }

            .filter-hover:hover {
                transform: scale(1.05) rotate(1deg);
            }

            .party-button:hover {
                animation: partyButtonBounce 0.5s ease-in-out infinite;
            }

            .podium-card {
                animation: podiumRise 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .podium-card.hover-active {
                transform: translateY(-20px) scale(1.08) rotateZ(2deg) !important;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
            }

            .podium-card.party-mode {
                animation: partyDance 2s ease-in-out infinite;
            }

            .podium-card.chaos-mode {
                animation: chaosDance 0.5s ease-in-out infinite;
                border-color: hsl(${Math.random() * 360}, 70%, 60%) !important;
            }

            .podium-border {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 5px;
                border-radius: 5px 5px 0 0;
                animation: rainbowShift 3s linear infinite;
            }

            .first-place .podium-border {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                height: 8px;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            }

            .second-place .podium-border {
                background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
                height: 6px;
            }

            .third-place .podium-border {
                background: linear-gradient(135deg, #cd7f32, #daa520);
                height: 6px;
            }

            .medal-icon.floating {
                animation: medalFloat 3s ease-in-out infinite;
            }

            .medal-icon.spinning {
                animation: medalSpin 1s ease-in-out infinite;
            }

            .medal-icon.chaos-spin {
                animation: chaosSpin 0.3s linear infinite;
            }

            .rank-number.pulsing {
                animation: rankPulse 2s ease-in-out infinite;
            }

            .rank-number.chaos-pulse {
                animation: chaosPulse 0.2s ease-in-out infinite;
            }

            .shame-glow {
                animation: shameGlow 3s ease-in-out infinite;
            }

            .shame-shake {
                animation: shameShake 1s ease-in-out infinite;
            }

            .shame-wobble {
                animation: lastPlaceWobble 3s ease-in-out infinite;
            }

            .shame-intensify {
                animation: shameIntensify 0.5s ease-in-out infinite;
                transform: scale(1.05) rotate(2deg);
                border-color: rgba(255, 107, 107, 0.8) !important;
                box-shadow: 0 20px 50px rgba(255, 107, 107, 0.4) !important;
            }

            .sad-face-rotate {
                animation: sadFaceRotate 4s ease-in-out infinite;
            }

            .points-blink {
                animation: pointsBlink 2s ease-in-out infinite;
            }

            .shimmer-effect {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.1),
                    transparent
                );
                transition: left 0.6s ease;
            }

            .player-card:hover .shimmer-effect {
                left: 100%;
            }

            .rank-badge {
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .party-particle {
                animation: partyFloat 3s ease-in-out infinite;
                box-shadow: 0 0 10px currentColor;
            }

            .chaos-particle {
                animation: chaosFloat 1s ease-in-out infinite;
                box-shadow: 0 0 15px currentColor;
            }

            .sparkle {
                animation: sparkle 1.5s ease-in-out infinite;
                background: white;
                box-shadow: 0 0 10px white;
            }

            .floating-emoji {
                animation: floatingEmoji 5s ease-in-out infinite;
            }

            .party-mode {
                animation: partyDance 2s ease-in-out infinite;
            }

            .chaos-mode {
                animation: chaosDance 0.5s ease-in-out infinite;
            }

            @keyframes backgroundShift {
                0%,
                100% {
                    transform: scale(1) rotate(0deg);
                }
                50% {
                    transform: scale(1.1) rotate(2deg);
                }
            }

            @keyframes trophySpin {
                0%,
                100% {
                    transform: translateY(0px) rotate(-10deg) scale(1);
                }
                25% {
                    transform: translateY(-15px) rotate(10deg) scale(1.1);
                }
                50% {
                    transform: translateY(0px) rotate(-10deg) scale(1);
                }
                75% {
                    transform: translateY(-10px) rotate(5deg) scale(1.05);
                }
            }

            @keyframes titlePulse {
                0%,
                100% {
                    transform: scale(1);
                    filter: brightness(1);
                }
                50% {
                    transform: scale(1.05);
                    filter: brightness(1.2);
                }
            }

            @keyframes partyButtonBounce {
                0%,
                100% {
                    transform: scale(1) rotate(0deg);
                }
                50% {
                    transform: scale(1.3) rotate(180deg);
                }
            }

            @keyframes podiumRise {
                from {
                    transform: translateY(100px) rotateX(45deg);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) rotateX(0deg);
                    opacity: 1;
                }
            }

            @keyframes medalFloat {
                0%,
                100% {
                    transform: rotateY(0deg) translateY(0px);
                }
                25% {
                    transform: rotateY(90deg) translateY(-10px);
                }
                50% {
                    transform: rotateY(180deg) translateY(0px);
                }
                75% {
                    transform: rotateY(270deg) translateY(-10px);
                }
            }

            @keyframes medalSpin {
                0% {
                    transform: rotateY(0deg) scale(1);
                }
                50% {
                    transform: rotateY(180deg) scale(1.3);
                }
                100% {
                    transform: rotateY(360deg) scale(1);
                }
            }

            @keyframes chaosSpin {
                0% {
                    transform: rotate(0deg) scale(1);
                }
                100% {
                    transform: rotate(360deg) scale(1.5);
                }
            }

            @keyframes rankPulse {
                0%,
                100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.15);
                }
            }

            @keyframes chaosPulse {
                0%,
                100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.5);
                }
            }

            @keyframes rainbowShift {
                0% {
                    background: linear-gradient(90deg, #667eea, #764ba2);
                }
                33% {
                    background: linear-gradient(90deg, #f093fb, #f5576c);
                }
                66% {
                    background: linear-gradient(90deg, #4facfe, #00f2fe);
                }
                100% {
                    background: linear-gradient(90deg, #667eea, #764ba2);
                }
            }

            @keyframes shameGlow {
                0%,
                100% {
                    box-shadow: 0 0 20px rgba(250, 112, 154, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(250, 112, 154, 0.6);
                }
            }

            @keyframes shameShake {
                0%,
                100% {
                    transform: translateX(0) rotate(0deg);
                }
                25% {
                    transform: translateX(-5px) rotate(-2deg);
                }
                75% {
                    transform: translateX(5px) rotate(2deg);
                }
            }

            @keyframes lastPlaceWobble {
                0%,
                100% {
                    transform: translateY(0px) rotate(0deg);
                }
                25% {
                    transform: translateY(-5px) rotate(-1deg);
                }
                50% {
                    transform: translateY(0px) rotate(1deg);
                }
                75% {
                    transform: translateY(-3px) rotate(-0.5deg);
                }
            }

            @keyframes shameIntensify {
                0%,
                100% {
                    transform: scale(1.05) rotate(2deg);
                }
                50% {
                    transform: scale(1.08) rotate(-2deg);
                }
            }

            @keyframes sadFaceRotate {
                0%,
                100% {
                    transform: rotate(0deg);
                }
                25% {
                    transform: rotate(-10deg);
                }
                75% {
                    transform: rotate(10deg);
                }
            }

            @keyframes pointsBlink {
                0%,
                100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }

            @keyframes slideInLeft {
                from {
                    transform: translateX(-100px) rotate(-5deg);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) rotate(0deg);
                    opacity: 1;
                }
            }

            @keyframes partyFloat {
                0%,
                100% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-20px) translateX(10px) scale(1.2);
                    opacity: 1;
                }
            }

            @keyframes chaosFloat {
                0%,
                100% {
                    transform: translateY(0) translateX(0) scale(1) rotate(0deg);
                    opacity: 1;
                }
                25% {
                    transform: translateY(-30px) translateX(20px) scale(1.5)
                        rotate(90deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(0) translateX(-20px) scale(1)
                        rotate(180deg);
                    opacity: 1;
                }
                75% {
                    transform: translateY(30px) translateX(10px) scale(1.3)
                        rotate(270deg);
                    opacity: 0.8;
                }
            }

            @keyframes chaosTear {
                0%,
                100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translateY(200px) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes partyDance {
                0%,
                100% {
                    transform: translateY(0) rotate(0deg);
                }
                25% {
                    transform: translateY(-5px) rotate(2deg);
                }
                50% {
                    transform: translateY(0) rotate(0deg);
                }
                75% {
                    transform: translateY(-5px) rotate(-2deg);
                }
            }

            @keyframes chaosDance {
                0%,
                100% {
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                25% {
                    transform: translateY(-10px) rotate(5deg) scale(1.1);
                }
                50% {
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                75% {
                    transform: translateY(10px) rotate(-5deg) scale(0.9);
                }
            }

            @keyframes sparkle {
                0%,
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5);
                }
            }

            @keyframes floatingEmoji {
                0%,
                100% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translateY(-50px) translateX(30px) rotate(180deg);
                    opacity: 1;
                }
            }
        `}</style>
    );
}
