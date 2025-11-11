/**
 * Resources for Other Teams
 *
 * HOW TO ADD/EDIT RESOURCES:
 * 1. Add a new resource object to the array below
 * 2. Set category: "tools", "code", "official", or "contact"
 * 3. Add title, description, url, and optional icon
 *
 * EXAMPLE:
 * {
 *   id: "unique-id",
 *   category: "tools",
 *   title: "Resource Name",
 *   description: "Brief description...",
 *   url: "https://example.com",
 *   icon: "Bot" // Optional Lucide icon name (e.g., "Bot", "Zap", "Code")
 * }
 */

export interface Resource {
    id: string;
    category: "tools" | "code" | "official" | "contact";
    title: string;
    description: string;
    url: string;
    icon?: string; // Lucide icon name (e.g., "Bot", "Zap", "Code")
}

export const resources: Resource[] = [
    {
        id: "ragnarok-code",
        category: "code",
        title: "Ragnarok Open Source Code",
        description:
            "We share our code openly–just email and let us know if you use it! Our complete robot codebase for the Decode season.",
        url: "https://github.com/24358-ragnarok/Decode",
        icon: "Code",
    },
    {
        id: "pedro-pathing",
        category: "tools",
        title: "Pedro Pathing",
        description:
            "We use PedroPathing to write our autonomous scripts. A path follower designed to revolutionize autonomous pathing in robotics using Bézier curve generation.",
        url: "https://pedropathing.com/",
        icon: "Bot",
    },
    {
        id: "ftc-fast-load",
        category: "tools",
        title: "FTC Fast Load",
        description:
            "An Android library with a custom classloader to reload TeamCode classes, allowing fast loading for FTC projects during development.",
        url: "https://github.com/MatthewOates36/fast-load",
        icon: "Zap",
    },
    {
        id: "ftc-official-resources",
        category: "official",
        title: "Official FTC Event Resources & Materials",
        description:
            "Access official FIRST Tech Challenge resources, game manuals, and event materials from FIRST Inspires.",
        url: "https://ftc-resources.firstinspires.org/ftc/archive/2026/event",
        icon: "BookOpen",
    },
    {
        id: "contact-developer",
        category: "contact",
        title: "Contact Our Head Developer",
        description:
            "Have questions about our code or resources? Reach out to Ben, our Head Developer and Co-Captain.",
        url: "mailto:ben@ragnarokftc.com",
        icon: "Mail",
    },
];
