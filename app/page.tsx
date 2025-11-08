import Link from "next/link";
import Image from "next/image";
import { achievements } from "@/data/achievements";
import { currentUpdate } from "@/data/current-update";
import { teamInfo } from "@/data/team-info";
import { seasons } from "@/data/seasons";
import AchievementCard from "@/components/AchievementCard";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import Livestream from "@/components/Livestream";

export default function Home() {
    return (
        <>
            {/* Hero Section - Bold and Dynamic */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Logo Background Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="relative w-screen aspect-square opacity-[0.15] md:opacity-[0.25]">
                        <Image
                            src="/images/logo.svg"
                            alt=""
                            fill
                            className="object-contain"
                            aria-hidden="true"
                            priority={false}
                            sizes="100vw"
                            style={{ transform: "scale(2.5)" }}
                        />
                    </div>
                </div>
                {/* Top Fade Gradient Overlay */}
                <div
                    className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-[1]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(1, 1, 1, 1) 0%, rgba(1, 1, 1, 0.7) 30%, rgba(1, 1, 1, 0.3) 60%, transparent 100%)",
                    }}
                />
                {/* Bottom Fade Gradient Overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[1]"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent 0%, rgba(1, 1, 1, 0.3) 40%, rgba(1, 1, 1, 0.7) 70%, rgba(1, 1, 1, 1) 100%)",
                    }}
                />
                <div className="container-custom text-center px-4 relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-top-show mb-6">
                        <span
                            className="block leading-none"
                            style={{ color: "#ff0000" }}
                        >
                            {teamInfo.teamNumber}
                        </span>
                    </h1>
                    <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 font-top-show">
                        {teamInfo.teamName}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed">
                        Revolutionizing STEM Technology in{" "}
                        <span className="text-elite-gold font-semibold">
                            {teamInfo.location}
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                        <Link
                            href="/members"
                            className="btn-primary text-lg px-8 py-4"
                        >
                            Meet Our Team
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/results"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            View Results
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
                <ScrollDownIndicator />
            </section>

            {/* Livestream Section */}
            <section className="py-12 md:py-16 relative">
                <div className="container-custom">
                    <Livestream videoId="hMO7b_FGIgg" />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 md:py-16 relative">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-5xl md:text-6xl font-bold font-display mb-4 md:mb-6">
                                About <span className="gradient-text">Us</span>
                            </h2>
                            <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-3 md:mb-4" />
                        </div>
                        <div className="card">
                            <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">
                                {teamInfo.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Update Section */}
            {currentUpdate && (
                <section className="py-12 md:py-16 relative">
                    <div className="container-custom">
                        <div className="card max-w-4xl mx-auto glow-border">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-5 md:mb-6">
                                <span className="badge-soft uppercase tracking-wider">
                                    {currentUpdate.type}
                                </span>
                                <span className="text-gray-400 text-sm font-medium">
                                    {currentUpdate.date}
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-5 font-display">
                                {currentUpdate.title}
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                {currentUpdate.content}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Achievements Section */}
            <section id="achievements" className="py-12 md:py-16 relative">
                <div className="container-custom relative z-10">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-5xl md:text-6xl font-bold font-display mb-4 md:mb-6">
                            Our{" "}
                            <span className="gradient-text">Achievements</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-3 md:mb-4" />
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Celebrating our victories and milestones in FTC
                            Robotics
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {achievements.map((achievement, index) => (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Seasons Section */}
            <section id="robots" className="py-12 md:py-16 relative">
                <div className="container-custom relative z-10">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-5xl md:text-6xl font-bold font-display mb-4 md:mb-6">
                            Our <span className="gradient-text">Seasons</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-3 md:mb-4" />
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Explore our journey through each competition season
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {seasons.map((season) => (
                            <Link
                                key={season.id}
                                href={`/seasons/${season.slug}`}
                                className="card glow-border"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white font-display">
                                        {season.name}
                                    </h3>
                                    <svg
                                        className="w-6 h-6 text-ultimate-red flex-shrink-0 ml-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </div>
                                <p className="text-elite-gold font-bold text-lg mb-3 md:mb-4">
                                    {season.year}
                                </p>
                                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                    {season.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-12 md:py-16 relative">
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold font-display mb-4 md:mb-6">
                        Get <span className="gradient-text">Involved</span>
                    </h2>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-4 md:mb-6" />
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8">
                        Interested in following our journey or contributing to
                        our projects?
                    </p>
                    <a
                        href={`mailto:${teamInfo.email}`}
                        className="btn-primary text-lg px-10 py-5"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
}
