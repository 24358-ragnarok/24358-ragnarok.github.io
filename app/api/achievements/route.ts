/**
 * API Route: /api/achievements
 *
 * Returns team achievements from FTCScout with smart caching
 */

import { NextResponse } from "next/server";
import { getAchievements } from "@/lib/ftc-api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const achievements = await getAchievements();

        if (!achievements || achievements.length === 0) {
            return NextResponse.json(
                {
                    error: "Achievements not available",
                    available: false,
                    achievements: [],
                },
                {
                    status: 200, // Return 200 with empty array rather than 404
                    headers: {
                        "Cache-Control":
                            "public, s-maxage=300, stale-while-revalidate=600",
                    },
                }
            );
        }

        return NextResponse.json(
            { achievements, available: true },
            {
                headers: {
                    "Cache-Control":
                        "public, s-maxage=300, stale-while-revalidate=600",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching achievements:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch achievements",
                available: false,
                achievements: [],
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
