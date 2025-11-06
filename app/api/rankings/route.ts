/**
 * API Route: /api/rankings
 *
 * Returns FTC league rankings with smart caching
 */

import { NextResponse } from "next/server";
import { getRankings } from "@/lib/ftc-api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const rankings = await getRankings();

        return NextResponse.json(rankings, {
            headers: {
                "Cache-Control":
                    "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (error) {
        console.error("Error fetching rankings:", error);

        // Return error response
        return NextResponse.json(
            {
                error: "Failed to fetch rankings",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
