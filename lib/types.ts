/**
 * Type definitions for the Ragnarok FTC website
 *
 * These types ensure type safety throughout the application
 * and provide clear documentation for data structures.
 */

export interface Member {
    id: string;
    name: string;
    role: string; // Current role
    image: string; // Path to image in /public
    bio: string;
    years: number[]; // Years active (e.g., [2023, 2024, 2025])
    executive?: boolean; // Elite members get gold styling
    isAlumni?: boolean; // Alumni members
    historicalRoles?: {
        year: number;
        role: string;
    }[];
    socialLinks?: {
        email?: string;
        github?: string;
    };
}

export interface Achievement {
    id: string;
    title: string;
    award: string;
    place: string; // e.g., "1st Place", "2nd Place"
    icon: string; // Icon type: "gold", "silver", "bronze"
    year: number;
    eventName: string; // Event where award was won
}

export interface Season {
    id: string;
    name: string; // e.g., "Into The Deep", "Decode"
    year: string; // e.g., "2024-2025"
    slug: string; // URL slug
    description: string;
    phases: Phase[];
    gallery?: GalleryItem[];
}

export interface Phase {
    title: string;
    description: string;
}

export interface GalleryItem {
    image: string;
    title: string;
    description: string;
}

export interface Sponsor {
    id: string;
    name: string;
    logo: string; // Path to logo in /public
    website?: string;
    tier: "platinum" | "gold" | "silver" | "bronze"; // Sponsorship tier
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string; // Icon name for display
}

export interface TeamInfo {
    teamNumber: string;
    teamName: string;
    location: string;
    description: string;
    email: string;
    socialLinks: SocialLink[];
}

// FTCScout GraphQL API Types
export interface QuickStats {
    tot: { rank: number };
    dc: { rank: number };
    auto: { rank: number };
}

export interface Award {
    type: string;
    season: number;
    placement: number;
    event: {
        name: string;
    };
}

export interface TeamInMatch {
    alliance: "Red" | "Blue";
    team: {
        name: string;
        number: number;
        website?: string;
    };
}

export interface MatchScores {
    red: {
        totalPoints: number;
    };
    blue: {
        totalPoints: number;
    };
}

export interface Match {
    actualStartTime: string | null;
    hasBeenPlayed: boolean;
    matchNum: number;
    scheduledStartTime: string;
    scores: MatchScores | null;
    teams: TeamInMatch[];
}

export interface Event {
    name: string;
    finished: boolean;
    liveStreamURL: string | null;
    ongoing: boolean;
    start: string;
    started: boolean;
    website: string | null;
    updatedAt: string;
    stats?: EventStats2025;
}

export interface EventStats2025 {
    rank: number;
    rp: number;
    wins: number;
    tot: {
        totalPoints: number;
    };
    ties: number;
    losses: number;
    max: {
        totalPoints: number;
    };
    opr: {
        totalPoints: number;
    };
}

export interface TeamMatch {
    season: number;
    alliance: "Red" | "Blue";
    event: Event;
    match: Match;
}

export interface TeamEventWithStats {
    event: {
        name: string;
    };
    stats: EventStats2025;
}

export interface FTCScoutTeamData {
    quickStats: QuickStats;
    awards: Award[];
    matches: TeamMatch[];
    events?: TeamEventWithStats[];
}

// Legacy types for compatibility - transformed from GraphQL data
export interface RankingData {
    rank: number;
    teamNumber: string;
    teamName: string;
    record: string;
    matchesPlayed: number;
    autoScore: number;
    driverScore: number;
    endScore: number;
    totalPoints: number;
}

export interface MatchResults {
    eventName: string;
    startDate: string;
    venue: string;
    rank: number;
    totalTeams: number;
    wins: number;
    losses: number;
    ties: number;
    rankings: RankingData[];
    lastUpdated?: string;
    currentEvent?: Event | null; // Current or most recent event
    recentMatches?: TeamMatch[]; // Recent matches for display
}

export interface CurrentUpdate {
    title: string;
    content: string;
    date: string;
    type: "announcement" | "competition" | "achievement" | "event";
}
