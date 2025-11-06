import { MetadataRoute } from "next";
import { seasons } from "@/data/seasons";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ragnarokftc.com";

    // Static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/members`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/results`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        },
    ];

    // Dynamic season routes
    const seasonRoutes = seasons.map((season) => ({
        url: `${baseUrl}/seasons/${season.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...routes, ...seasonRoutes];
}
