import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "none",
            "max-snippet": -1,
        },
    },
    // Don't show in search results
    other: {
        robots: "noindex, nofollow, noarchive, nosnippet, noimageindex",
    },
};

export default function PointsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
