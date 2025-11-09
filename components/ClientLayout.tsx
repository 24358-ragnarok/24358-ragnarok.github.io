"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Global flag to track if loading screen was shown
let loadingWasShown = false;

export function markLoadingShown() {
    loadingWasShown = true;
}

/**
 * Client-side layout wrapper that handles fade-in transitions
 * Only fades in if there was an actual loading delay
 */
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const contentRef = useRef<HTMLDivElement>(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        // Skip animation on initial page load
        if (isInitialRender.current) {
            isInitialRender.current = false;
            element.style.opacity = "1";
            return;
        }

        // For subsequent navigations, check if loading was shown
        if (loadingWasShown) {
            // Fade in from black
            element.style.opacity = "0";
            requestAnimationFrame(() => {
                element.style.transition = "opacity 0.5s ease-in";
                element.style.opacity = "1";
            });
            loadingWasShown = false; // Reset for next navigation
        } else {
            // Instant navigation, no animation
            element.style.transition = "none";
            element.style.opacity = "1";
        }
    }, [pathname]);

    return <div ref={contentRef}>{children}</div>;
}
