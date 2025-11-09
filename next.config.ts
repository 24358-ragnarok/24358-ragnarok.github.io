import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Image Optimization
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        // TODO: Add external image domains if needed
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "example.com",
        //         port: "",
        //         pathname: "/images/**",
        //     },
        // ],
    },

    // Compression
    compress: true,

    // Performance headers
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // Security Headers
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
            // Cache static assets aggressively
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // Cache manifest and icons
            {
                source: "/manifest.json",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, must-revalidate",
                    },
                ],
            },
        ];
    },

    // Production optimizations
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
