/**
 * Person Structured Data Component
 *
 * This helps search engines understand team member information
 *
 * Example usage:
 * <PersonSchema
 *   name="John Doe"
 *   role="Lead Programmer"
 *   image="/images/members/john.jpg"
 *   bio="John is passionate about robotics..."
 * />
 */

import { generatePersonSchema } from "@/lib/metadata-utils";

interface PersonSchemaProps {
    name: string;
    role: string;
    image?: string;
    bio?: string;
    graduationYear?: string;
}

export default function PersonSchema({
    name,
    role,
    image,
    bio,
    graduationYear,
}: PersonSchemaProps) {
    const schema = generatePersonSchema({
        name,
        role,
        image,
        bio,
        graduationYear,
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
        />
    );
}
