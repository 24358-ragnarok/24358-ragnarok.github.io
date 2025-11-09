/**
 * Breadcrumb Structured Data Component
 *
 * Example usage in page.tsx:
 * <BreadcrumbSchema items={[
 *   { name: "Home", url: "/" },
 *   { name: "Results", url: "/results" }
 * ]} />
 */

import { generateBreadcrumbs } from "@/lib/metadata-utils";

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = generateBreadcrumbs(items);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
        />
    );
}
