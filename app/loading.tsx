"use client";

import { useEffect } from "react";
import { markLoadingShown } from "@/components/ClientLayout";

/**
 * Global loading UI - minimal black screen for fast loads
 */
export default function Loading() {
    useEffect(() => {
        markLoadingShown();
    }, []);

    return <div className="min-h-screen" />;
}
