import Link from "next/link";
import { Achievement, Season } from "@/lib/types";
import { Trophy } from "lucide-react";

interface AchievementCardProps {
    achievement: Achievement;
    index: number;
    seasons: Season[];
}

export default function AchievementCard({
    achievement,
    seasons,
}: AchievementCardProps) {
    const getTrophyIcon = () => {
        return <Trophy className="w-full h-full" strokeWidth={1.5} />;
    };

    const getTrophyColor = () => {
        if (achievement.icon === "gold") {
            return "trophy-gold";
        } else if (achievement.icon === "silver") {
            return "trophy-silver";
        } else {
            return "trophy-bronze";
        }
    };

    const getBorderColor = () => {
        if (achievement.icon === "gold") {
            return "border-elite-gold/40";
        } else if (achievement.icon === "silver") {
            return "border-gray-400/40";
        } else {
            return "border-trophy-bronze/40";
        }
    };

    // Map achievement year to season slug
    const getSeasonSlug = () => {
        const season = seasons.find((s) => {
            const yearRange = s.year.split("-");
            const startYear = parseInt(yearRange[0]);
            const endYear = parseInt(yearRange[1]);
            return achievement.year >= startYear && achievement.year <= endYear;
        });
        return season ? `/seasons/${season.slug}` : null;
    };

    const seasonSlug = getSeasonSlug();

    const cardContent = (
        <>
            <div
                className={`w-20 h-20 md:w-24 md:h-24 mb-5 md:mb-6 mx-auto ${getTrophyColor()}`}
            >
                {getTrophyIcon()}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-display">
                {achievement.title}
            </h3>
            <p className="text-ultimate-red font-bold mb-2 md:mb-3 text-base md:text-lg">
                {achievement.place}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {achievement.award}
            </p>
        </>
    );

    if (seasonSlug) {
        return (
            <Link
                href={seasonSlug}
                className={`card text-center glow-border ${getBorderColor()} block`}
            >
                {cardContent}
            </Link>
        );
    }

    return (
        <div className={`card text-center glow-border ${getBorderColor()}`}>
            {cardContent}
        </div>
    );
}
