/**
 * Centralized SEO Configuration
 *
 * TODO: Update these values to match your team's specific information
 * - Update social media handles (Twitter, Instagram usernames)
 * - Verify site URL matches your production domain
 * - Add location-specific keywords for your region
 * - Update founding date if different
 */

export const seoConfig = {
    // Base Site Information
    siteUrl: "https://ragnarokftc.com",
    siteName: "24358 Ragnarok",
    siteTitle: "Ragnarok FTC Team 24358 | Waukee, Iowa Robotics",

    // Default Descriptions
    siteDescription:
        "FTC Team 24358 Ragnarok - A best-in-state robotics team from Waukee, Iowa focused on bringing the cutting edge of robotics to student engineers.",

    // Keywords - TODO: Add season-specific game names as they become available
    keywords: [
        // Team Keywords
        "FTC Team 24358",
        "Ragnarok Robotics",
        "24358 Ragnarok",
        "Ben Boonstra",
        "bboonstra",

        // Competition Keywords
        "FIRST Tech Challenge",
        "FTC Robotics",
        "FTC Competition",
        "Robotics Competition",

        // Location Keywords
        "Waukee Robotics",
        "Iowa Robotics",
        "Waukee Northwest Robotics",
        "Iowa FTC Team",
        "Des Moines Robotics",

        // General Keywords
        "STEM Education",
        "High School Robotics",
        "Robotics Team",
        "Engineering Team",
        "Student Engineers",
        "Robotics Club",

        // Technical Keywords
        "Autonomous Programming",
        "TeleOp",
        "Robot Design",
        "CAD Design",
        "Engineering Notebook",
    ],

    // Team Information
    team: {
        number: "24358",
        name: "Ragnarok",
        fullName: "FTC Team 24358 Ragnarok",
        location: "Waukee, Iowa",
        state: "Iowa",
        country: "United States",
        email: "team@ragnarokftc.com",
        foundingYear: "2023",
    },

    // Social Media - TODO: Verify and update all social media handles
    social: {
        twitter: "@ragnarok_ftc24358",
        twitterId: "ragnarok_ftc24358",
        instagram: "https://instagram.com/ragnarok_ftc24358",
        github: "https://github.com/24358-ragnarok",
    },

    // Open Graph Images - TODO: Create these images if they don't exist
    images: {
        ogImage: {
            url: "/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "24358 Ragnarok - Waukee Iowa FTC Robotics",
            type: "image/png",
        },
        logo: {
            url: "/images/logo.svg",
            width: 1200,
            height: 1200,
            alt: "Ragnarok Logo",
        },
        // TODO: Create square version for better social media display
        ogSquare: {
            url: "/images/og-image-square.png",
            width: 1200,
            height: 1200,
            alt: "Ragnarok FTC Team 24358",
        },
    },

    // Organization Details for Schema.org
    organization: {
        type: "EducationalOrganization" as const,
        legalName: "FTC Team 24358 Ragnarok",
        foundingDate: "2023",
        address: {
            streetAddress: "295 SE Ashworth Rd",
            addressLocality: "Waukee",
            addressRegion: "Iowa",
            postalCode: "50263",
            addressCountry: "United States",
        },
    },

    // Robots Configuration
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
} as const;

/**
 * Generate page-specific SEO metadata
 * TODO: Use this function in your page.tsx files to ensure consistent metadata
 */
export function generatePageMetadata({
    title,
    description,
    path = "",
    keywords = [],
    image,
}: {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    image?: {
        url: string;
        width: number;
        height: number;
        alt: string;
    };
}) {
    const url = `${seoConfig.siteUrl}${path}`;
    const ogImage = image || seoConfig.images.ogImage;

    return {
        title,
        description,
        keywords: [...seoConfig.keywords, ...keywords],
        openGraph: {
            title,
            description,
            url,
            siteName: seoConfig.siteName,
            images: [ogImage],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: seoConfig.social.twitter,
            images: [ogImage.url],
        },
        alternates: {
            canonical: url,
        },
    };
}
