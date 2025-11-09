/**
 * FTCScout GraphQL API Integration
 *
 * Fetches team data from FTCScout's GraphQL API
 * with intelligent caching using Next.js native caching.
 */

import { unstable_cache } from "next/cache";
import { FTCScoutTeamData, MatchResults, Achievement, Award } from "./types";

const GRAPHQL_URL = "https://api.ftcscout.org/graphql";
const TEAM_NUMBER = 24358;
const CURRENT_SEASON = 2025;
const REGION = "USIA";

/**
 * Determine cache TTL based on day of week (CST timezone)
 * - Friday, Saturday, Sunday: 5 minutes (300 seconds)
 * - Other days: 1 hour (3600 seconds)
 */
function getCacheTTL(): number {
    // Get current time in CST (UTC-6)
    const now = new Date();
    const cstOffset = -6 * 60; // CST is UTC-6
    const localOffset = now.getTimezoneOffset();
    const cstTime = new Date(
        now.getTime() + (localOffset + cstOffset) * 60 * 1000
    );
    const dayOfWeek = cstTime.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

    // Friday (5), Saturday (6), or Sunday (0)
    if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
        return 300; // 5 minutes
    }

    return 3600; // 1 hour
}

/**
 * GraphQL Query for fetching comprehensive team data
 */
const TEAM_QUERY = `
query GetTeamData($number: Int!, $season: Int!, $region: RegionOption) {
  teamByNumber(number: $number) {
    quickStats(season: $season, region: $region) {
      tot {
        rank
      }
      dc {
        rank
      }
      auto {
        rank
      }
    }
    awards {
      type
      season
      placement
      event {
        name
      }
    }
    events(season: $season) {
      event {
        name
      }
      stats {
        ... on TeamEventStats2025 {
          rank
          rp
          wins
          tot {
            totalPoints
          }
          ties
          losses
          max {
            totalPoints
          }
          opr {
            totalPoints
          }
        }
      }
    }
    matches(season: $season) {
      season
      alliance
      event {
        name
        finished
        liveStreamURL
        ongoing
        start
        started
        website
        updatedAt
      }
      match {
        actualStartTime
        hasBeenPlayed
        matchNum
        scheduledStartTime
        scores {
          ... on MatchScores2025 {
            red {
              totalPoints
            }
            blue {
              totalPoints
            }
          }
        }
        teams {
          alliance
          team {
            name
            number
            website
          }
        }
      }
    }
  }
}
`;

/**
 * Fetch data from FTCScout GraphQL API
 */
async function fetchFromFTCScout(): Promise<FTCScoutTeamData | null> {
    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: TEAM_QUERY,
                variables: {
                    number: TEAM_NUMBER,
                    season: CURRENT_SEASON,
                    region: REGION,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.warn(
                `FTCScout API error: ${response.status} - ${errorText}`
            );
            return null;
        }

        const result = await response.json();

        if (result.errors) {
            console.warn("GraphQL errors:", result.errors);
            return null;
        }

        if (!result.data?.teamByNumber) {
            console.warn("No team data returned from FTCScout");
            return null;
        }

        return result.data.teamByNumber;
    } catch (error) {
        console.warn("Failed to fetch from FTCScout:", error);
        return null;
    }
}

/**
 * Transform award type to display-friendly name
 */
function formatAwardType(type: string): string {
    const awardMap: Record<string, string> = {
        Control: "Control Award (Programming)",
        Inspire: "Inspire Award",
        Think: "Think Award",
        Connect: "Connect Award",
        Innovate: "Innovate Award",
        Design: "Design Award",
        Motivate: "Motivate Award",
        Promote: "Promote Award",
        DeansListSemiFinalist: "Dean's List Semi-Finalist",
        DeansListFinalist: "Dean's List Finalist",
        DeansListWinner: "Dean's List Winner",
        WinningAlliance: "Winning Alliance",
        FinalistAlliance: "Finalist Alliance",
    };

    return awardMap[type] || type;
}

/**
 * Determine trophy icon based on placement
 */
function getAwardIcon(placement: number): "gold" | "silver" | "bronze" {
    if (placement === 1) return "gold";
    if (placement === 2) return "silver";
    return "bronze";
}

/**
 * Format placement as display string
 */
function formatPlacement(placement: number): string {
    if (placement === 1) return "1st Place";
    if (placement === 2) return "2nd Place";
    if (placement === 3) return "3rd Place";
    return `${placement}th Place`;
}

/**
 * Transform FTCScout awards to Achievement format
 */
export function transformAwards(awards: Award[]): Achievement[] {
    return awards
        .filter((award) => award.placement <= 3) // Only show podium placements
        .map((award) => ({
            id: `${award.season}-${award.type}-${award.event.name}`
                .toLowerCase()
                .replace(/\s+/g, "-"),
            title: `${award.season} ${award.event.name}`,
            award: formatAwardType(award.type),
            place: formatPlacement(award.placement),
            icon: getAwardIcon(award.placement),
            year: award.season,
            eventName: award.event.name,
        }))
        .sort((a, b) => b.year - a.year); // Most recent first
}

/**
 * Get team achievements (awards) with Next.js caching
 */
export const getAchievements = unstable_cache(
    async (): Promise<Achievement[]> => {
        const data = await fetchFromFTCScout();
        if (!data || !data.awards) {
            console.warn("No awards data available");
            return [];
        }

        return transformAwards(data.awards);
    },
    ["ftc-achievements"],
    {
        revalidate: getCacheTTL(),
        tags: ["ftc-achievements"],
    }
);

/**
 * Calculate team statistics from matches
 */
function calculateMatchStats(matches: FTCScoutTeamData["matches"]) {
    const playedMatches = matches.filter(
        (m) => m.match.hasBeenPlayed && m.match.scores
    );

    let wins = 0;
    let losses = 0;
    let ties = 0;

    playedMatches.forEach((match) => {
        const scores = match.match.scores;
        if (!scores) return;

        const ourScore =
            match.alliance === "Red"
                ? scores.red.totalPoints
                : scores.blue.totalPoints;
        const opponentScore =
            match.alliance === "Red"
                ? scores.blue.totalPoints
                : scores.red.totalPoints;

        if (ourScore > opponentScore) wins++;
        else if (ourScore < opponentScore) losses++;
        else ties++;
    });

    return { wins, losses, ties, matchesPlayed: playedMatches.length };
}

/**
 * Get current or most recent event with stats
 */
function getCurrentEvent(
    matches: FTCScoutTeamData["matches"],
    eventStats?: FTCScoutTeamData["events"]
) {
    if (!matches || matches.length === 0) return null;

    // Sort by event start date (most recent first)
    const sortedMatches = [...matches].sort(
        (a, b) =>
            new Date(b.event.start).getTime() -
            new Date(a.event.start).getTime()
    );

    // Find ongoing event first
    const ongoingMatch = sortedMatches.find((m) => m.event.ongoing);
    if (ongoingMatch) {
        // Attach stats if available
        const stats = eventStats?.find(
            (e) => e.event.name === ongoingMatch.event.name
        )?.stats;
        return { ...ongoingMatch.event, stats };
    }

    // Otherwise return most recent event
    const recentEvent = sortedMatches[0]?.event;
    if (recentEvent && eventStats) {
        const stats = eventStats.find(
            (e) => e.event.name === recentEvent.name
        )?.stats;
        return { ...recentEvent, stats };
    }

    return recentEvent || null;
}

/**
 * Get rankings with Next.js caching
 */
export const getRankings = unstable_cache(
    async (): Promise<MatchResults | null> => {
        const data = await fetchFromFTCScout();
        if (!data) {
            console.warn("No data available from FTCScout");
            return null;
        }

        // Calculate stats
        const stats = calculateMatchStats(data.matches);
        const eventStats = data.events;
        const currentEvent = getCurrentEvent(data.matches, eventStats);

        // Attach stats to all matches based on event name
        const matchesWithStats = data.matches.map((match) => {
            const eventStat = eventStats?.find(
                (e) => e.event.name === match.event.name
            )?.stats;
            return {
                ...match,
                event: {
                    ...match.event,
                    stats: eventStat,
                },
            };
        });

        // Get recent matches for the current/latest event
        const recentMatches = currentEvent
            ? matchesWithStats
                  .filter(
                      (m) =>
                          m.event.name === currentEvent.name &&
                          m.match.hasBeenPlayed
                  )
                  .sort((a, b) => b.match.matchNum - a.match.matchNum)
                  .slice(0, 100) // All matches for the season
            : [];

        // Create a simplified rankings array (just our team for now)
        const rankings = [
            {
                rank: data.quickStats.tot.rank,
                teamNumber: TEAM_NUMBER.toString(),
                teamName: "Ragnarok",
                record: `${stats.wins}-${stats.losses}-${stats.ties}`,
                matchesPlayed: stats.matchesPlayed,
                autoScore: 0,
                driverScore: 0,
                endScore: 0,
                totalPoints: 0,
            },
        ];

        const result: MatchResults = {
            eventName: currentEvent?.name || "Current Season",
            startDate:
                currentEvent?.start || new Date().toISOString().split("T")[0],
            venue: "Iowa League",
            rank: data.quickStats.tot.rank,
            totalTeams: 0,
            wins: stats.wins,
            losses: stats.losses,
            ties: stats.ties,
            rankings,
            lastUpdated: currentEvent?.updatedAt || new Date().toISOString(),
            currentEvent,
            recentMatches,
        };

        return result;
    },
    ["ftc-rankings"],
    {
        revalidate: getCacheTTL(),
        tags: ["ftc-rankings"],
    }
);

/**
 * Get team-specific statistics with Next.js caching
 */
export const getTeamStats = unstable_cache(
    async () => {
        const data = await fetchFromFTCScout();

        if (!data) {
            return null;
        }

        const stats = calculateMatchStats(data.matches);

        return {
            rank: data.quickStats.tot.rank,
            totalTeams: 0,
            record: `${stats.wins}-${stats.losses}-${stats.ties}`,
            wins: stats.wins,
            losses: stats.losses,
            ties: stats.ties,
            avgAuto: 0,
            avgTeleOp: 0,
            avgEndgame: 0,
            totalPoints: 0,
            matchesPlayed: stats.matchesPlayed,
            autoRank: data.quickStats.auto.rank,
            dcRank: data.quickStats.dc.rank,
        };
    },
    ["ftc-team-stats"],
    {
        revalidate: getCacheTTL(),
        tags: ["ftc-team-stats"],
    }
);

/**
 * Get live stream URL if there's an ongoing event with Next.js caching
 */
export const getLiveStreamURL = unstable_cache(
    async (): Promise<string | null> => {
        const data = await fetchFromFTCScout();

        if (!data || !data.matches) {
            return null;
        }

        const ongoingEvent = data.matches.find((m) => m.event.ongoing)?.event;
        return ongoingEvent?.liveStreamURL || null;
    },
    ["ftc-livestream"],
    {
        revalidate: 60, // Check every minute for live streams
        tags: ["ftc-livestream"],
    }
);
