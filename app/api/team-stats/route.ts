/**
 * API Route: /api/team-stats
 *
 * Returns team-specific statistics
 */

import { NextResponse } from "next/server";
import { getTeamStats } from "@/lib/ftc-api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const stats = await getTeamStats();

        if (!stats) {
            return NextResponse.json(
                {
                    error: "Team stats not available",
                    available: false,
                },
                {
                    status: 404,
                    headers: {
                        "Cache-Control":
                            "public, s-maxage=300, stale-while-revalidate=600",
                    },
                }
            );
        }

        return NextResponse.json(stats, {
            headers: {
                "Cache-Control":
                    "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (error) {
        console.error("Error fetching team stats:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch team stats",
                available: false,
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
