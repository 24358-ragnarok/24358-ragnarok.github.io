import { teamInfo } from "@/data/team-info";

export default function StructuredData() {
    const siteUrl = "https://ragnarokftc.com";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ragnarok FTC Team 24358",
        alternateName: "Ragnarok",
        url: siteUrl,
        logo: `${siteUrl}/images/logo.svg`,
        description: teamInfo.description,
        email: teamInfo.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Waukee",
            addressRegion: "IA",
            addressCountry: "US",
        },
        sameAs: teamInfo.socialLinks.map((link) => link.url),
        foundingDate: "2024",
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            value: teamInfo.socialLinks.length,
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Ragnarok FTC Team 24358",
        url: siteUrl,
        description: teamInfo.description,
        publisher: {
            "@type": "Organization",
            name: "Ragnarok FTC Team 24358",
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteUrl}/results?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    const educationalOrganizationSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Ragnarok FTC Team 24358",
        description: teamInfo.description,
        url: siteUrl,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Waukee",
            addressRegion: "IA",
            addressCountry: "US",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(educationalOrganizationSchema),
                }}
            />
        </>
    );
}
