import { Metadata } from "next";
import RankingsTable from "@/components/RankingsTable";
import StateRanking from "@/components/StateRanking";
import EventMatchGroup from "@/components/EventMatchGroup";
import ResultsComingSoon from "@/components/ResultsComingSoon";
import { getRankings, getTeamStats } from "@/lib/ftc-api";
import type { Event, TeamMatch } from "@/lib/types";
import { generateResultsPageMetadata } from "@/lib/metadata-utils";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SportsEventSchema from "@/components/SportsEventSchema";

export const metadata: Metadata = generateResultsPageMetadata();

export const revalidate = 300; // Revalidate every 5 minutes
export const dynamic = "force-dynamic";

const TEAM_NUMBER = 24358;

export default async function ResultsPage() {
    const rankings = await getRankings();
    const teamStats = await getTeamStats();

    // Group matches by event, only include live or finished events
    const eventGroups: Map<string, { event: Event; matches: TeamMatch[] }> =
        new Map();

    if (rankings?.recentMatches) {
        rankings.recentMatches.forEach((match) => {
            const eventName = match.event.name;
            // Only include ongoing or finished events
            if (match.event.ongoing || match.event.finished) {
                if (!eventGroups.has(eventName)) {
                    eventGroups.set(eventName, {
                        event: match.event,
                        matches: [],
                    });
                }
                eventGroups.get(eventName)!.matches.push(match);
            }
        });
    }

    // Sort events by date (most recent first)
    const sortedEvents = Array.from(eventGroups.values()).sort(
        (a, b) =>
            new Date(b.event.start).getTime() -
            new Date(a.event.start).getTime()
    );

    return (
        <>
            {/* Breadcrumb Structured Data for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "/" },
                    { name: "Match Results", url: "/results" },
                ]}
            />

            {/* Sports Event Structured Data for each event */}
            {sortedEvents.map(({ event }) => (
                <SportsEventSchema
                    key={event.name}
                    name={event.name}
                    startDate={event.start}
                    location="Iowa, United States"
                    description={`FTC competition event: ${event.name}`}
                    url={event.website || undefined}
                />
            ))}

            {/* Header */}
            <section className="relative py-8 md:py-12 overflow-hidden pb-0 md:pb-0">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-top-show">
                        Match <span className="gradient-text">Results</span>
                    </h1>
                </div>
            </section>

            {/* State Ranking */}
            {teamStats && (
                <section className="py-8 md:py-12 relative">
                    <div className="container-custom">
                        <StateRanking
                            overallRank={teamStats.rank}
                            autoRank={teamStats.autoRank || 0}
                            dcRank={teamStats.dcRank || 0}
                            lastUpdated={rankings?.lastUpdated}
                        />
                    </div>
                </section>
            )}

            {/* Events and Matches */}
            {sortedEvents.length > 0 ? (
                <section className="py-10 md:py-12 pb-16 relative">
                    <div className="container-custom">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display text-center">
                            Match <span className="gradient-text">History</span>
                        </h2>

                        {/* Display each event with its matches */}
                        {sortedEvents.map(({ event, matches }) => (
                            <EventMatchGroup
                                key={event.name}
                                event={event}
                                matches={matches}
                                teamNumber={TEAM_NUMBER}
                            />
                        ))}

                        {/* Optional: League Rankings Table if available */}
                        {rankings?.rankings && rankings.rankings.length > 1 && (
                            <div className="card glow-border mt-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">
                                    League Rankings
                                </h2>
                                <RankingsTable rankings={rankings.rankings} />
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <ResultsComingSoon />
            )}
        </>
    );
}
