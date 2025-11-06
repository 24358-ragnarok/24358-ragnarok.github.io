"use client";

import { useEffect } from "react";

export default function DynamicScrollbar() {
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        let hideTimeout: NodeJS.Timeout;

        const updateScrollbarGradient = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrollPercentage =
                scrollHeight > 0 ? scrollTop / scrollHeight : 0;

            // Interpolate between red (#ff0000) and yellow (#ffeb29)
            // Red: rgb(255, 0, 0)
            // Yellow: rgb(255, 235, 41)
            const red = [255, 0, 0];
            const yellow = [255, 235, 41];

            // Interpolate RGB values based on scroll position
            const r = Math.round(
                red[0] + (yellow[0] - red[0]) * scrollPercentage
            );
            const g = Math.round(
                red[1] + (yellow[1] - red[1]) * scrollPercentage
            );
            const b = Math.round(
                red[2] + (yellow[2] - red[2]) * scrollPercentage
            );

            // Use solid interpolated color for the entire scrollbar
            const scrollbarColor = `rgb(${r}, ${g}, ${b})`;

            // Update CSS custom property with solid color
            document.documentElement.style.setProperty(
                "--scrollbar-gradient",
                scrollbarColor
            );

            // Also update hover state with slightly brighter interpolated color
            const hoverR = Math.min(255, Math.round(r * 1.2));
            const hoverG = Math.min(255, Math.round(g * 1.2));
            const hoverB = Math.min(255, Math.round(b * 1.2));
            const hoverColor = `rgb(${hoverR}, ${hoverG}, ${hoverB})`;

            document.documentElement.style.setProperty(
                "--scrollbar-gradient-hover",
                hoverColor
            );
        };

        const showScrollbar = () => {
            document.body.classList.add("scrolling");
            clearTimeout(hideTimeout);
        };

        const hideScrollbar = () => {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                document.body.classList.remove("scrolling");
            }, 1000);
        };

        const handleScroll = () => {
            updateScrollbarGradient();
            showScrollbar();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                hideScrollbar();
            }, 150);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Show scrollbar when mouse is near the right edge (within 20px)
            if (window.innerWidth - e.clientX < 20) {
                document.body.classList.add("scrollbar-visible");
            } else {
                document.body.classList.remove("scrollbar-visible");
            }
        };

        // Initial update
        updateScrollbarGradient();

        // Update on scroll
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateScrollbarGradient, {
            passive: true,
        });
        window.addEventListener("mousemove", handleMouseMove, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateScrollbarGradient);
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(scrollTimeout);
            clearTimeout(hideTimeout);
        };
    }, []);

    return null;
}
