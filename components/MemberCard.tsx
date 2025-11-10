"use client";

import { useState } from "react";
import Image from "next/image";
import { Member } from "@/lib/types";
import { EmailIcon, GithubIcon } from "./Icons";

interface MemberCardProps {
    member: Member;
    index: number;
    priority?: boolean;
}

export default function MemberCard({
    member,
    priority = false,
}: MemberCardProps) {
    const [selectedYear, setSelectedYear] = useState<number>(2026);

    // Get the role for the selected year
    const getRole = () => {
        if (selectedYear === 2026) {
            return member.role;
        }
        const historicalRole = member.historicalRoles?.find(
            (r) => r.year === selectedYear
        );
        return historicalRole?.role || member.role;
    };

    // Get unique years including 2026
    const years = [...member.years, ...(member.isAlumni ? [] : [2026])];

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br flex flex-col ${
                member.executive
                    ? "from-elite-gold/10 via-[#0a0a0a] to-[#0a0a0a] border border-elite-gold/30"
                    : member.isAlumni
                    ? "from-gear-gray/10 via-[#0a0a0a] to-[#0a0a0a] border border-gear-gray/20 opacity-90"
                    : "from-ultimate-red/10 via-[#0a0a0a] to-[#0a0a0a] border border-ultimate-red/30"
            }`}
        >
            {/* Image Section */}
            <div className="relative h-64 md:h-72 overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={priority}
                        className="object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                            member.executive
                                ? "from-elite-gold/20 via-transparent to-transparent"
                                : member.isAlumni
                                ? "from-gear-gray/20 via-transparent to-transparent"
                                : "from-ultimate-red/20 via-transparent to-transparent"
                        }`}
                    />
                </div>
            </div>

            {/* Role Banner */}
            <div
                className="w-full py-3 px-6 text-center font-bold text-sm"
                style={{
                    backgroundColor: member.executive ? "#ffeb29" : "#ff0000",
                    color: "#010101",
                }}
            >
                {getRole()}
            </div>

            {/* Content Section */}
            <div className="px-6 pb-6 pt-5 relative z-10 flex flex-col flex-grow">
                {/* Name */}
                <h3
                    className={`text-2xl md:text-3xl font-bold mb-5 font-display text-center ${
                        member.executive
                            ? "text-elite-gold"
                            : member.isAlumni
                            ? "text-gray-300"
                            : "text-white"
                    }`}
                >
                    {member.name}
                </h3>

                {/* Year Selector */}
                {years.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                    selectedYear === year
                                        ? member.executive
                                            ? "bg-elite-gold text-ash-black shadow-md shadow-elite-gold/30 scale-105"
                                            : member.isAlumni
                                            ? "bg-gear-gray/80 text-white shadow-md"
                                            : "bg-ultimate-red text-white shadow-md shadow-ultimate-red/30 scale-105"
                                        : "bg-gear-gray/30 text-gray-400 hover:bg-gear-gray/50 hover:text-gray-300"
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}

                {/* Bio */}
                <p className="text-gray-300 leading-relaxed text-sm md:text-base flex-grow mb-4">
                    {member.bio}
                </p>

                {/* Social Links */}
                {member.socialLinks &&
                    (member.socialLinks.email || member.socialLinks.github) && (
                        <div className="flex gap-3 justify-center mt-auto pt-4 border-t border-gear-gray/20">
                            {member.socialLinks.email && (
                                <a
                                    href={`mailto:${member.socialLinks.email}`}
                                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                                        member.executive
                                            ? "bg-elite-gold text-ash-black hover:bg-elite-gold/90"
                                            : member.isAlumni
                                            ? "bg-gear-gray/20 text-gray-300 hover:bg-gear-gray/30"
                                            : "bg-ultimate-red text-white hover:bg-ultimate-red/90"
                                    }`}
                                    aria-label={`Email ${member.name}`}
                                >
                                    <EmailIcon className="w-5 h-5" />
                                </a>
                            )}
                            {member.socialLinks.github && (
                                <a
                                    href={`https://github.com/${member.socialLinks.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                                        member.executive
                                            ? "bg-elite-gold text-ash-black hover:bg-elite-gold/90"
                                            : member.isAlumni
                                            ? "bg-gear-gray/20 text-gray-300 hover:bg-gear-gray/30"
                                            : "bg-ultimate-red text-white hover:bg-ultimate-red/90"
                                    }`}
                                    aria-label={`${member.name}'s GitHub`}
                                >
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
}
