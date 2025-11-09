/**
 * Sports Event Structured Data Component
 * * This helps with local search and event discovery
 *
 * Example usage:
 * <SportsEventSchema
 *   name="Iowa State Championship"
 *   startDate="2024-03-15T09:00:00"
 *   endDate="2024-03-15T17:00:00"
 *   location="Iowa Events Center, Des Moines, IA"
 * />
 */

import { generateSportsEventSchema } from "@/lib/metadata-utils";

interface SportsEventSchemaProps {
    name: string;
    startDate: string;
    endDate?: string;
    location: string;
    description?: string;
    url?: string;
}

export default function SportsEventSchema({
    name,
    startDate,
    endDate,
    location,
    description,
    url,
}: SportsEventSchemaProps) {
    const schema = generateSportsEventSchema({
        name,
        startDate,
        endDate,
        location,
        description,
        url,
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
        />
    );
}
