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
}

export interface Achievement {
    id: string;
    title: string;
    award: string;
    place: string; // e.g., "1st Place", "2nd Place"
    icon: string; // Icon type: "gold", "silver", "bronze"
    year: number;
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

// FTC API Types
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
}

export interface CurrentUpdate {
    title: string;
    content: string;
    date: string;
    type: "announcement" | "competition" | "achievement" | "event";
}
