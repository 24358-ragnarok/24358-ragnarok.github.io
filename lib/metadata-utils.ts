/**
 * Metadata Utilities for SEO
 *
 * TODO: Import and use these functions in your page.tsx files for consistent SEO
 * Example usage:
 *
 * export const metadata = generateMemberPageMetadata({
 *   memberName: "John Doe",
 *   role: "Lead Programmer"
 * });
 */

import { Metadata } from "next";
import { seoConfig } from "./seo-config";

/**
 * Generate breadcrumb JSON-LD structured data
 * TODO: Add this to each page component to improve search engine understanding
 *
 * Example usage in a page:
 * <script type="application/ld+json">
 *   {JSON.stringify(generateBreadcrumbs([
 *     { name: "Home", url: "/" },
 *     { name: "Members", url: "/members" }
 *   ]))}
 * </script>
 */
export function generateBreadcrumbs(
    items: Array<{ name: string; url: string }>
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${seoConfig.siteUrl}${item.url}`,
        })),
    };
}

/**
 * Generate metadata for Members page
 * TODO: Use in app/members/page.tsx
 */
export function generateMemberPageMetadata(): Metadata {
    return {
        title: "Our Team",
        description: `Meet the talented members of ${seoConfig.team.fullName}. Our team of dedicated students from ${seoConfig.team.location} working together to excel in FIRST Tech Challenge robotics competitions.`,
        keywords: [
            ...seoConfig.keywords,
            "team members",
            "robotics team members",
            "student engineers",
            "FTC team roster",
        ],
        openGraph: {
            title: `Team Members | ${seoConfig.siteName}`,
            description: `Meet the brilliant minds behind ${seoConfig.siteName} from ${seoConfig.team.location}`,
            url: `${seoConfig.siteUrl}/members`,
            siteName: seoConfig.siteName,
            images: [seoConfig.images.ogImage],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Team Members | ${seoConfig.siteName}`,
            description: `Meet the brilliant minds behind ${seoConfig.siteName}`,
            creator: seoConfig.social.twitter,
            images: [seoConfig.images.ogImage.url],
        },
        alternates: {
            canonical: `${seoConfig.siteUrl}/members`,
        },
    };
}

/**
 * Generate metadata for Results page
 * TODO: Use in app/results/page.tsx
 */
export function generateResultsPageMetadata(): Metadata {
    return {
        title: "Match Results & Rankings",
        description: `View live match results, rankings, and competition statistics for ${seoConfig.team.fullName}. Track our performance in the ${seoConfig.team.state} FTC league and tournament competitions.`,
        keywords: [
            ...seoConfig.keywords,
            "FTC results",
            "match results",
            "competition rankings",
            "league standings",
            "OPR",
            "team statistics",
            `${seoConfig.team.state} FTC rankings`,
        ],
        openGraph: {
            title: `Match Results & Rankings | ${seoConfig.siteName}`,
            description: `Live match results and competition rankings for ${seoConfig.siteName}`,
            url: `${seoConfig.siteUrl}/results`,
            siteName: seoConfig.siteName,
            images: [seoConfig.images.ogImage],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Match Results | ${seoConfig.siteName}`,
            description: `Live match results and rankings for ${seoConfig.siteName}`,
            creator: seoConfig.social.twitter,
            images: [seoConfig.images.ogImage.url],
        },
        alternates: {
            canonical: `${seoConfig.siteUrl}/results`,
        },
    };
}

/**
 * Generate metadata for Resources page
 */
export function generateResourcesPageMetadata(): Metadata {
    return {
        title: "Resources for Teams",
        description: `Tools, code, and resources used by ${seoConfig.team.fullName}. Open source code, development tools, and official FTC resources shared with the robotics community.`,
        keywords: [
            ...seoConfig.keywords,
            "FTC resources",
            "robotics tools",
            "open source code",
            "Pedro Pathing",
            "FTC Fast Load",
            "FTC development tools",
            "FIRST Tech Challenge resources",
        ],
        openGraph: {
            title: `Resources for Teams | ${seoConfig.siteName}`,
            description: `Tools, code, and resources shared by ${seoConfig.siteName} with the FTC community`,
            url: `${seoConfig.siteUrl}/resources`,
            siteName: seoConfig.siteName,
            images: [seoConfig.images.ogImage],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Resources for Teams | ${seoConfig.siteName}`,
            description: `Tools, code, and resources shared by ${seoConfig.siteName}`,
            creator: seoConfig.social.twitter,
            images: [seoConfig.images.ogImage.url],
        },
        alternates: {
            canonical: `${seoConfig.siteUrl}/resources`,
        },
    };
}

/**
 * Generate metadata for Brand page
 */
export function generateBrandPageMetadata(): Metadata {
    return {
        title: "Brand Guidelines",
        description: `Brand guidelines and logo usage for ${seoConfig.team.fullName}. Download assets and learn how to properly use the Ragnarok brand.`,
        keywords: [
            ...seoConfig.keywords,
            "brand guidelines",
            "logo usage",
            "brand assets",
            "Ragnarok logo",
            "FTC team branding",
        ],
        openGraph: {
            title: `Brand Guidelines | ${seoConfig.siteName}`,
            description: `Brand guidelines and logo usage for ${seoConfig.siteName}`,
            url: `${seoConfig.siteUrl}/brand`,
            siteName: seoConfig.siteName,
            images: [seoConfig.images.ogImage],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Brand Guidelines | ${seoConfig.siteName}`,
            description: `Brand guidelines and logo usage for ${seoConfig.siteName}`,
            creator: seoConfig.social.twitter,
            images: [seoConfig.images.ogImage.url],
        },
        alternates: {
            canonical: `${seoConfig.siteUrl}/brand`,
        },
    };
}

/**
 * Generate metadata for Season page
 * TODO: Use in app/seasons/[slug]/page.tsx
 */
export function generateSeasonPageMetadata(season: {
    name: string;
    year: string;
    description: string;
    slug: string;
}): Metadata {
    return {
        title: `${season.name} ${season.year}`,
        description: `${season.description} Follow ${seoConfig.team.fullName}'s journey through the ${season.year} FTC season.`,
        keywords: [
            ...seoConfig.keywords,
            season.name,
            `FTC ${season.year}`,
            "robot design",
            "competition season",
            "game strategy",
        ],
        openGraph: {
            title: `${season.name} ${season.year} | ${seoConfig.siteName}`,
            description: season.description,
            url: `${seoConfig.siteUrl}/seasons/${season.slug}`,
            siteName: seoConfig.siteName,
            images: [seoConfig.images.ogImage],
            locale: "en_US",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${season.name} ${season.year} | ${seoConfig.siteName}`,
            description: season.description,
            creator: seoConfig.social.twitter,
            images: [seoConfig.images.ogImage.url],
        },
        alternates: {
            canonical: `${seoConfig.siteUrl}/seasons/${season.slug}`,
        },
    };
}

/**
 * Generate Person schema for a team member
 * TODO: Use this in MemberCard component or members page
 *
 * Example usage:
 * <script type="application/ld+json">
 *   {JSON.stringify(generatePersonSchema({
 *     name: "John Doe",
 *     role: "Lead Programmer",
 *     image: "/images/members/john.jpg",
 *     bio: "John is passionate about robotics..."
 *   }))}
 * </script>
 */
export function generatePersonSchema(member: {
    name: string;
    role: string;
    image?: string;
    bio?: string;
    graduationYear?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        memberOf: {
            "@type": "SportsTeam",
            name: seoConfig.team.fullName,
            url: seoConfig.siteUrl,
        },
        ...(member.image && {
            image: `${seoConfig.siteUrl}${member.image}`,
        }),
        ...(member.bio && {
            description: member.bio,
        }),
        ...(member.graduationYear && {
            alumniOf: {
                "@type": "EducationalOrganization",
                name: "Waukee Northwest High School", // TODO: Update with your school
            },
        }),
    };
}

/**
 * Generate SportsEvent schema for a match/competition
 * TODO: Use in EventMatchGroup component or results page
 *
 * Example usage:
 * <script type="application/ld+json">
 *   {JSON.stringify(generateSportsEventSchema({
 *     name: "Iowa State Championship",
 *     startDate: "2024-03-15",
 *     location: "Iowa Events Center"
 *   }))}
 * </script>
 */
export function generateSportsEventSchema(event: {
    name: string;
    startDate: string;
    endDate?: string;
    location: string;
    description?: string;
    url?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: event.name,
        startDate: event.startDate,
        ...(event.endDate && { endDate: event.endDate }),
        location: {
            "@type": "Place",
            name: event.location,
            address: {
                "@type": "PostalAddress",
                addressRegion: seoConfig.team.state,
                addressCountry: seoConfig.team.country,
            },
        },
        ...(event.description && { description: event.description }),
        ...(event.url && { url: event.url }),
        organizer: {
            "@type": "Organization",
            name: "FIRST",
            url: "https://www.firstinspires.org",
        },
        competitor: {
            "@type": "SportsTeam",
            name: seoConfig.team.fullName,
            url: seoConfig.siteUrl,
        },
    };
}

/**
 * Generate FAQPage schema
 * TODO: Add to homepage for common questions about your team
 */
export function generateFAQSchema(
    faqs: Array<{ question: string; answer: string }>
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

/**
 * Generate enhanced SportsTeam schema
 * TODO: Use in StructuredData component to replace/enhance existing schema
 */
export function generateSportsTeamSchema(options?: {
    currentRanking?: number;
    memberCount?: number;
    achievements?: Array<{ name: string; date: string }>;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: seoConfig.team.fullName,
        sport: "Robotics",
        url: seoConfig.siteUrl,
        logo: `${seoConfig.siteUrl}${seoConfig.images.logo.url}`,
        description: seoConfig.siteDescription,
        email: seoConfig.team.email,
        foundingDate: seoConfig.team.foundingYear,
        location: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: seoConfig.organization.address.addressLocality,
                addressRegion: seoConfig.organization.address.addressRegion,
                addressCountry: seoConfig.organization.address.addressCountry,
            },
        },
        memberOf: {
            "@type": "SportsOrganization",
            name: "FIRST Tech Challenge",
            url: "https://www.firstinspires.org/robotics/ftc",
        },
        sameAs: [
            seoConfig.social.instagram,
            seoConfig.social.github,
            // TODO: Add more social media URLs as available
        ],
        ...(options?.currentRanking && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: options.currentRanking,
                bestRating: 1,
                worstRating: 1000,
            },
        }),
        ...(options?.memberCount && {
            numberOfEmployees: options.memberCount,
        }),
        ...(options?.achievements &&
            options.achievements.length > 0 && {
                award: options.achievements.map(
                    (achievement) => achievement.name
                ),
            }),
    };
}

/**
 * Generate Article schema for blog posts or season descriptions
 * TODO: Use for season pages with detailed write-ups
 */
export function generateArticleSchema(article: {
    title: string;
    description: string;
    publishDate: string;
    modifiedDate?: string;
    url: string;
    image?: string;
    authorName?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishDate,
        dateModified: article.modifiedDate || article.publishDate,
        url: `${seoConfig.siteUrl}${article.url}`,
        ...(article.image && {
            image: `${seoConfig.siteUrl}${article.image}`,
        }),
        author: {
            "@type": "Organization",
            name: article.authorName || seoConfig.team.fullName,
        },
        publisher: {
            "@type": "Organization",
            name: seoConfig.team.fullName,
            logo: {
                "@type": "ImageObject",
                url: `${seoConfig.siteUrl}${seoConfig.images.logo.url}`,
            },
        },
    };
}
