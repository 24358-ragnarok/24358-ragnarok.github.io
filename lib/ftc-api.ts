/**
 * FTC Events API Integration
 *
 * Fetches match data from the FIRST Tech Challenge API
 * with intelligent caching based on competition schedules.
 */

import { MatchResults } from "./types";
import { getFromCache, setInCache } from "./cache";

const API_BASE_URL = "https://ftc-api.firstinspires.org/v2.0";
const SEASON = "2026";
const REGION = "USIA";
const LEAGUE = "ACPS"; // Acropolis League
const TEAM_NUMBER = "24358";

/**
 * FTC API Response Types
 */
interface FTCTeamRanking {
    rank: number;
    teamNumber: number;
    teamName: string;
    wins: number;
    losses: number;
    ties: number;
    matchesPlayed: number;
    sortOrder1: number; // Auto score
    sortOrder2: number; // Driver score
    sortOrder3: number; // End game score
    sortOrder4: number; // Total points
}

interface FTCRankingsResponse {
    rankings: FTCTeamRanking[];
}

/**
 * Get Basic Auth header for FTC API
 *
 * The FTC API requires: Authorization: Basic {Token}
 * Where Token is Base64(username:AuthorizationKey)
 *
 * See: https://ftc-events.firstinspires.org/services/API
 */
function getAuthHeader(): string {
    const username = process.env.FTC_API_USERNAME || "boonstra";
    const apiKey = process.env.FTC_API_KEY; // This is the AuthorizationKey

    if (!apiKey) {
        console.warn(
            "FTC_API_KEY environment variable is not set - using placeholder"
        );
        return "Basic placeholder";
    }

    // Create token by Base64 encoding "username:AuthorizationKey"
    const token = Buffer.from(`${username}:${apiKey}`).toString("base64");
    return `Basic ${token}`;
}

/**
 * Fetch rankings from FTC API
 */
async function fetchRankingsFromAPI(): Promise<MatchResults> {
    // URL format: /{season}/leagues/rankings/{regionCode}/{leagueCode}
    // See: https://ftc-events.firstinspires.org/services/API
    const url = `${API_BASE_URL}/${SEASON}/leagues/rankings/${REGION}/${LEAGUE}`;

    const response = await fetch(url, {
        headers: {
            Authorization: getAuthHeader(),
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.warn(
            `FTC API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        // Throw error to be caught by getRankings and return null
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = (await response.json()) as FTCRankingsResponse;

    // Find our team's data
    const teamData = data.rankings.find(
        (team) => team.teamNumber.toString() === TEAM_NUMBER
    );

    if (!teamData) {
        console.warn(`Team ${TEAM_NUMBER} not found in rankings`);
    }

    // Format the data
    const formattedData: MatchResults = {
        eventName: "Iowa League Rankings",
        startDate: "2025-09-01",
        venue: "Acropolis League",
        rank: teamData?.rank || 0,
        totalTeams: data.rankings.length,
        wins: teamData?.wins || 0,
        losses: teamData?.losses || 0,
        ties: teamData?.ties || 0,
        rankings: data.rankings.map((team) => ({
            rank: team.rank,
            teamNumber: team.teamNumber.toString(),
            teamName: team.teamName,
            record: `${team.wins}-${team.losses}-${team.ties}`,
            matchesPlayed: team.matchesPlayed,
            autoScore: team.sortOrder1,
            driverScore: team.sortOrder2,
            endScore: team.sortOrder3,
            totalPoints: team.sortOrder4,
        })),
        lastUpdated: new Date().toISOString(),
    };

    return formattedData;
}

/**
 * Get rankings with caching
 * This is the main function to use in API routes
 * Returns null if no data is available (API error, empty rankings, etc.)
 */
export async function getRankings(): Promise<MatchResults | null> {
    const cacheKey = "ftc-rankings";

    // Try to get from cache first
    const cached = getFromCache<MatchResults>(cacheKey);
    if (cached) {
        // Only return cached data if it has actual rankings
        if (cached.rankings && cached.rankings.length > 0) {
            console.log("Returning cached rankings");
            return cached;
        }
    }

    // Fetch from API
    try {
        console.log("Fetching fresh rankings from FTC API");
        const data = await fetchRankingsFromAPI();

        // Only return data if we have actual rankings
        if (data.rankings && data.rankings.length > 0) {
            // Store in cache
            setInCache(cacheKey, data);
            return data;
        }

        // No valid data available
        console.warn("No rankings data available");
        return null;
    } catch (error) {
        console.warn("Failed to fetch rankings:", error);
        return null;
    }
}

/**
 * Get team-specific statistics
 */
export async function getTeamStats() {
    const rankings = await getRankings();

    if (!rankings) {
        return null;
    }

    const teamRanking = rankings.rankings.find(
        (team) => team.teamNumber === TEAM_NUMBER
    );

    if (!teamRanking) {
        return null;
    }

    return {
        rank: rankings.rank,
        totalTeams: rankings.totalTeams,
        record: `${rankings.wins}-${rankings.losses}-${rankings.ties}`,
        wins: rankings.wins,
        losses: rankings.losses,
        ties: rankings.ties,
        avgAuto: teamRanking.autoScore,
        avgTeleOp: teamRanking.driverScore,
        avgEndgame: teamRanking.endScore,
        totalPoints: teamRanking.totalPoints,
        matchesPlayed: teamRanking.matchesPlayed,
    };
}
