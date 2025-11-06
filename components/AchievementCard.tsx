import { Achievement } from "@/lib/types";

interface AchievementCardProps {
    achievement: Achievement;
    index: number;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
    const getTrophyIcon = () => {
        if (achievement.icon === "gold") {
            return "🏆";
        } else if (achievement.icon === "silver") {
            return "🥈";
        } else {
            return "🥉";
        }
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

    return (
        <div className={`card text-center glow-border ${getBorderColor()}`}>
            <div className={`text-5xl md:text-6xl mb-5 md:mb-6 ${getTrophyColor()}`}>
                {getTrophyIcon()}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-display">
                {achievement.title}
            </h3>
            <p className="text-ultimate-red font-bold mb-2 md:mb-3 text-base md:text-lg">
                {achievement.place}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">{achievement.award}</p>
        </div>
    );
}
