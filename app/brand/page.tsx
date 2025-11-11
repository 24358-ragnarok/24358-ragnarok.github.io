import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Download } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { generateBrandPageMetadata } from "@/lib/metadata-utils";
import { readFileSync, statSync } from "fs";
import { join } from "path";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = generateBrandPageMetadata();

// Enable page-level caching - revalidate every hour
export const revalidate = 3600;

// Helper function to format file size
function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Helper function to get SVG dimensions from viewBox
function getSvgDimensions(
    svgContent: string
): { width: number; height: number } | null {
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
    if (viewBoxMatch) {
        const parts = viewBoxMatch[1].split(/\s+/);
        if (parts.length >= 4) {
            return {
                width: Math.round(parseFloat(parts[2])),
                height: Math.round(parseFloat(parts[3])),
            };
        }
    }
    // Fallback: try width and height attributes
    const widthMatch = svgContent.match(/width=["']([^"']+)["']/i);
    const heightMatch = svgContent.match(/height=["']([^"']+)["']/i);
    if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        if (!isNaN(width) && !isNaN(height)) {
            return { width: Math.round(width), height: Math.round(height) };
        }
    }
    return null;
}

// Get download file information (cached)
const getDownloadInfo = unstable_cache(
    async () => {
        const downloads = [
            {
                name: "White Logo",
                description: "High-resolution logo for use on dark backgrounds",
                url: "/images/logo.svg",
                format: "SVG",
                filePath: "public/images/logo.svg",
            },
            {
                name: "Black Logo",
                description:
                    "High-resolution logo for use on light backgrounds",
                url: "/images/logo-black.svg",
                format: "SVG",
                filePath: "public/images/logo-black.svg",
            },
            {
                name: "With Text",
                description:
                    "Full logo with 24358 Ragnarok text in preferred font",
                url: "/images/brand/with-text.pdf",
                format: "PDF",
                filePath: "public/images/brand/with-text.pdf",
            },
        ];

        return downloads.map((download) => {
            try {
                const fullPath = join(process.cwd(), download.filePath);
                const stats = statSync(fullPath);
                const fileSize = formatFileSize(stats.size);

                let dimensions: string | null = null;
                if (download.format === "SVG") {
                    const svgContent = readFileSync(fullPath, "utf-8");
                    const dims = getSvgDimensions(svgContent);
                    if (dims) {
                        dimensions = `${dims.width} × ${dims.height} px`;
                    }
                }

                return {
                    ...download,
                    fileSize,
                    dimensions,
                };
            } catch (error) {
                console.error(
                    `Error reading file ${download.filePath}:`,
                    error
                );
                return {
                    ...download,
                    fileSize: "Unknown",
                    dimensions: null,
                };
            }
        });
    },
    ["brand-downloads"],
    {
        revalidate: 3600, // Cache for 1 hour
        tags: ["brand-assets"],
    }
);

const logoExamples = [
    {
        image: "/images/logo.svg",
        caption: "✓ Correct: Standard logo",
        isCorrect: true,
    },
    {
        image: "/images/logo-black.svg",
        caption: "✓ Correct: Standard logo for light backgrounds",
        isCorrect: true,
    },
    {
        image: "/images/logo.svg",
        caption: "✗ Do not rotate the logo",
        isCorrect: false,
        transform: "rotate(45deg)",
    },
    {
        image: "/images/logo.svg",
        caption: "✗ Do not place text on or overlapping the logo",
        isCorrect: false,
        hasTextOverlap: true,
    },
    {
        image: "/images/squirrel.png",
        caption: "✗ Do not replace the icon with a photo of a squirrel",
        isCorrect: false,
    },
    {
        image: "/images/logo.svg",
        caption: "✗ Do not stretch or distort the logo",
        isCorrect: false,
        transform: "scaleX(1.5)",
    },
    {
        image: "/images/logo.svg",
        caption: "✗ Do not add filters or effects",
        isCorrect: false,
        hasFilter: true,
    },
    {
        image: "/images/logo.svg",
        caption:
            "✗ Do not modify the Wing color without gaining explicit permission",
        isCorrect: false,
        hasRecolor: true,
    },
    {
        image: "/images/logo.svg",
        caption: "✗ Do not place on busy or matching-color backgrounds",
        isCorrect: false,
        hasBusyBackground: true,
    },
    {
        image: "/images/logo.svg",
        caption:
            "✗ Do not animate the logo with disco effects, rainbow colors, rotation, and pulsing",
        isCorrect: false,
        hasDisco: true,
    },
];

export default async function BrandPage() {
    const downloads = await getDownloadInfo();

    return (
        <>
            {/* Breadcrumb Structured Data for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "/" },
                    { name: "Resources", url: "/resources" },
                    { name: "Brand Guidelines", url: "/brand" },
                ]}
            />

            {/* Header */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-top-show mb-6">
                        Brand <span className="gradient-text">Guidelines</span>
                    </h1>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        How to properly use the Ragnarok brand and logo
                    </p>
                </div>
            </section>

            {/* Downloads Section */}
            <section className="py-10 md:py-12 relative">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-8 text-center">
                        Downloads
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {downloads.map((download) => (
                            <a
                                key={download.name}
                                href={download.url}
                                download
                                className="group card card-hover glow-border bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 flex flex-col overflow-hidden"
                            >
                                <div className="flex flex-col w-full">
                                    {/* Top Row: Preview + Title/Description */}
                                    <div className="flex flex-row gap-4 mb-4">
                                        {/* Preview Section - Left Side */}
                                        <div className="relative shrink-0 w-32 h-32 overflow-hidden bg-ash-black/60 rounded-lg flex items-center justify-center">
                                            {download.format === "SVG" ? (
                                                <div className="relative w-full h-full p-4">
                                                    <Image
                                                        src={download.url}
                                                        alt={download.name}
                                                        fill
                                                        sizes="128px"
                                                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ) : (
                                                <iframe
                                                    src={`${download.url}#toolbar=0&navpanes=0&scrollbar=0`}
                                                    className="w-full h-full border-0"
                                                    title={download.name}
                                                    style={{
                                                        pointerEvents: "none",
                                                    }}
                                                />
                                            )}
                                            <div className="absolute top-1 right-1">
                                                <div className="p-1.5 rounded bg-ash-black/80 backdrop-blur-sm">
                                                    <Download className="w-3 h-3 text-gray-300 group-hover:text-elite-gold transition-colors" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Title and Description - Right Side */}
                                        <div className="flex flex-col flex-grow min-w-0">
                                            <h3 className="text-lg font-bold text-white font-display group-hover:text-elite-gold transition-colors mb-1.5">
                                                {download.name}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed text-sm">
                                                {download.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Metadata Section - Full Width */}
                                    <div className="space-y-1.5 pt-4 border-t border-gray-700/50 w-full">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">
                                                Format:
                                            </span>
                                            <span className="text-gray-300 font-medium">
                                                {download.format}
                                            </span>
                                        </div>
                                        {download.dimensions && (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">
                                                    Dimensions:
                                                </span>
                                                <span className="text-gray-300 font-medium">
                                                    {download.dimensions}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">
                                                Size:
                                            </span>
                                            <span className="text-gray-300 font-medium">
                                                {download.fileSize}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Text Guidelines Section */}
            <section className="py-10 md:py-12 relative">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-8 text-center">
                        Text Guidelines
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="card glow-border space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white font-display mb-3">
                                    Team Name
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    We are{" "}
                                    <strong className="text-white">
                                        Ragnarok
                                    </strong>
                                    , capital R, no ö, /ˈɹæɡ.nəˌɹɔk/.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white font-display mb-3">
                                    Typography
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Our premier font is{" "}
                                    <span className="font-top-show text-elite-gold">
                                        Top Show
                                    </span>
                                    ; please do not use it frivolously, only for
                                    important titles. For body text and general
                                    use, use standard sans-serif fonts.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white font-display mb-3">
                                    Full Name vs. Shorthand
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Our full name is{" "}
                                    <strong className="text-white">
                                        24358 Ragnarok
                                    </strong>
                                    , with the general shorthand{" "}
                                    <strong className="text-white">
                                        Ragnarok
                                    </strong>
                                    ; it is usually appropriate to use just
                                    Ragnarok unless you are outside an FTC
                                    environment or clarification is needed.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white font-display mb-3">
                                    Usage Context
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    When referring to the team in formal
                                    documents, press releases, or official
                                    communications, use the full team number and
                                    name:{" "}
                                    <strong className="text-white">
                                        24358 Ragnarok
                                    </strong>
                                    . In casual contexts, after already having
                                    introduced us, or when the FTC context is
                                    clear,{" "}
                                    <strong className="text-white">
                                        Ragnarok
                                    </strong>{" "}
                                    is acceptable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Guidelines Section */}
            <section className="py-10 md:py-12 pb-16 relative">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-8 text-center">
                        Logo Guidelines
                    </h2>

                    {/* Logo Examples Grid */}
                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                        {logoExamples.map((example, index) => {
                            // Find the first incorrect example to add a break before it
                            const isFirstIncorrect =
                                !example.isCorrect &&
                                index > 0 &&
                                logoExamples[index - 1].isCorrect;

                            return (
                                <React.Fragment key={index}>
                                    {isFirstIncorrect && (
                                        <div className="w-full basis-full my-6">
                                            <div className="h-px bg-gradient-to-r from-transparent via-ultimate-red/50 to-transparent" />
                                            <p className="text-center text-sm text-gray-400 mt-4 font-semibold uppercase tracking-wider">
                                                Incorrect Usage Examples
                                            </p>
                                        </div>
                                    )}
                                    <div
                                        className={`card glow-border w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] max-w-xs ${
                                            example.isCorrect
                                                ? "border-elite-gold/50 bg-elite-gold/5"
                                                : "border-ultimate-red/50 bg-ultimate-red/5"
                                        }`}
                                    >
                                        <div className="relative w-full aspect-square mb-2 bg-ash-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                                            {example.image ===
                                            "/images/squirrel.png" ? (
                                                <Image
                                                    src={example.image}
                                                    alt="Squirrel example"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-contain p-1"
                                                />
                                            ) : (
                                                <div
                                                    className="relative w-full h-full"
                                                    style={{
                                                        transform:
                                                            example.hasDisco
                                                                ? "rotate(5deg) scale(1.1)"
                                                                : example.transform,
                                                        filter: example.hasFilter
                                                            ? "blur(2px) brightness(0.5)"
                                                            : example.hasRecolor
                                                            ? "hue-rotate(240deg)"
                                                            : example.hasDisco
                                                            ? "hue-rotate(0deg) saturate(3) brightness(1.5) contrast(1.5)"
                                                            : "none",
                                                        animation:
                                                            example.hasDisco
                                                                ? "disco-hue 2s linear infinite, disco-pulse 1.5s ease-in-out infinite, disco-spin 4s linear infinite"
                                                                : "none",
                                                        background:
                                                            example.hasBusyBackground
                                                                ? "repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, #00ff00 10px, #00ff00 20px)"
                                                                : example.hasDisco
                                                                ? "radial-gradient(circle, rgba(255,0,255,0.3), rgba(0,255,255,0.3), rgba(255,255,0,0.3))"
                                                                : "transparent",
                                                    }}
                                                >
                                                    <Image
                                                        src={example.image}
                                                        alt="Logo example"
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                                        className="object-contain"
                                                        style={{
                                                            padding: "4%",
                                                            transform:
                                                                example.transform
                                                                    ? example.transform
                                                                    : "scale(1.4)",
                                                        }}
                                                    />
                                                    {example.hasTextOverlap && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-4xl font-top-show text-white">
                                                                RAGNAROK
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p
                                            className={`text-sm text-center font-large leading-tight ${
                                                example.isCorrect
                                                    ? "text-[#ffeb29]"
                                                    : "text-[#ff0000]"
                                            }`}
                                        >
                                            {example.caption}
                                        </p>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
