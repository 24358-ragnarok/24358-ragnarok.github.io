import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DynamicScrollbar from "@/components/DynamicScrollbar";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
});
const monoFont = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-mono",
});

const siteUrl = "https://ragnarokftc.com";
const siteName = "Ragnarok FTC Team 24358";
const siteDescription =
    "Revolutionizing STEM Technology in Waukee, Iowa - FTC Robotics Team 24358. Join us in our mission to make robotics and technology accessible to learners of all ages.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Ragnarok - FTC Team 24358",
        template: "%s | Ragnarok FTC",
    },
    description: siteDescription,
    keywords: [
        "FTC",
        "Robotics",
        "Ragnarok",
        "Team 24358",
        "Waukee",
        "Iowa",
        "FIRST Tech Challenge",
        "STEM",
        "Engineering",
        "Technology",
        "Robotics Competition",
        "High School Robotics",
        "Waukee Northwest Robotics",
        "FTC Robotics Team",
        "STEM Education",
        "Robotics Club",
    ],
    authors: [{ name: "Ragnarok FTC Team 24358" }],
    creator: "Ragnarok FTC Team 24358",
    publisher: "Ragnarok FTC Team 24358",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        title: siteName,
        description: siteDescription,
        siteName: "Ragnarok FTC",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Ragnarok FTC Team 24358 Logo",
            },
            {
                url: "/images/logo.svg",
                width: 1200,
                height: 1200,
                alt: "Ragnarok FTC Team 24358 Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteName,
        description: siteDescription,
        creator: "@ragnarok_ftc24358",
        images: ["/images/og-image.png"],
    },
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
    icons: {
        icon: [
            {
                url: "/images/icons/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/images/icons/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            { url: "/images/icons/favicon.ico", sizes: "any" },
        ],
        apple: [
            {
                url: "/images/icons/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        other: [
            {
                rel: "android-chrome-192x192",
                url: "/images/icons/android-chrome-192x192.png",
            },
            {
                rel: "android-chrome-512x512",
                url: "/images/icons/android-chrome-512x512.png",
            },
        ],
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: siteUrl,
    },
    category: "Robotics",
    classification: "Robotics Team Website",
    other: {
        "theme-color": "#010101",
        "color-scheme": "dark",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
        >
            <body className="font-sans antialiased text-white">
                <StructuredData />
                <DynamicScrollbar />
                <div className="global-bg" aria-hidden="true" />
                <Navigation />
                <main
                    className="relative z-10"
                    style={{ paddingTop: "4.5rem" }}
                >
                    {children}
                </main>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
