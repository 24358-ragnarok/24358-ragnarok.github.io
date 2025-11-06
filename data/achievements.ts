/**
 * Team Achievements
 *
 * HOW TO ADD/EDIT ACHIEVEMENTS:
 * 1. Add a new achievement object to the array
 * 2. Set icon to "gold", "silver", or "bronze" for trophy styling
 * 3. Achievements are displayed in the order listed (newest first recommended)
 *
 * EXAMPLE:
 * {
 *   id: "unique-id",
 *   title: "2025 State Championship",
 *   award: "Inspire Award",
 *   place: "1st Place",
 *   icon: "gold",
 *   year: 2025
 * }
 */

import { Achievement } from "@/lib/types";

export const achievements: Achievement[] = [
    {
        id: "2025-state-control",
        title: "2025 Iowa State Championship",
        award: "Control (Programming) Award",
        place: "2nd Place",
        icon: "silver",
        year: 2025,
    },
    {
        id: "2025-coral-sea-control",
        title: "2025 Coral Sea League Championship",
        award: "Control (Programming) Award",
        place: "1st Place",
        icon: "gold",
        year: 2025,
    },
    {
        id: "2024-pollock-control",
        title: "2024 Pollock League Championship",
        award: "Control (Programming) Award",
        place: "2nd Place",
        icon: "silver",
        year: 2024,
    },
];
