"use client";

import { useEffect } from "react";
import { markLoadingShown } from "@/components/ClientLayout";

/**
 * Loading UI - minimal black screen for fast loads
 */
export default function ResultsLoading() {
    useEffect(() => {
        markLoadingShown();
    }, []);

    return <div className="min-h-screen" />;
}
