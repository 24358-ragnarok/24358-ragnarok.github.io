/**
 * Season Information
 *
 * HOW TO ADD/EDIT SEASONS:
 * 1. Add images to /public/images/seasons/ folder
 * 2. Add a new season object with phases and optional gallery
 * 3. Set slug for URL (e.g., "into-the-deep" becomes /seasons/into-the-deep)
 *
 * EXAMPLE:
 * {
 *   id: "season-name",
 *   name: "Season Name",
 *   year: "2025-2026",
 *   slug: "season-name",
 *   description: "Brief description...",
 *   phases: [...],
 *   gallery: [...]
 * }
 */

import { Season } from "@/lib/types";

export const seasons: Season[] = [
    {
        id: "decode-2025",
        name: "Decode",
        year: "2025-2026",
        slug: "decode",
        description:
            "This year, our journey is all about building a robot that can conquer the Decode 2025-26 challenge. Follow our progress as we bring our ideas to life!",
        phases: [
            {
                title: "Phase 1: Game Analysis & Strategy",
                description:
                    "We kicked off the season by diving deep into the game manual, brainstorming different strategies, and sketching out initial robot designs. This phase is all about defining our goals.",
            },
            {
                title: "Phase 2: Prototyping & Design",
                description:
                    "Our team is currently building and testing different mechanisms to see what works best. We're using CAD software to finalize the design before we start the full build.",
            },
            {
                title: "Phase 3: The Build Process",
                description:
                    "The construction is underway! We're assembling the chassis, custom mechanisms, and integrating all the electronic components. This is where our design truly starts to take shape.",
            },
            {
                title: "Phase 4: Programming & Tuning",
                description:
                    "As the hardware comes together, our programmers are writing the code to make the robot move. We'll be focusing on autonomous functions and driver-controlled precision.",
            },
            {
                title: "Phase 5: Competition & Iteration",
                description:
                    "The final step is to compete and learn from our experiences. We'll be gathering data from our matches to make continuous improvements to the robot and our strategy.",
            },
        ],
        gallery: [
            {
                image: "/images/seasons/bobot.jpeg",
                title: "Decode Robot",
                description:
                    "Our first robot for the 2025-2026 Decode season, ready to take on the challenge.",
            },
        ],
    },
    {
        id: "into-the-deep-2024",
        name: "Into The Deep",
        year: "2024-2025",
        slug: "into-the-deep",
        description:
            "Explore some of the key moments in our team's journey, from building our robot to competing at events.",
        phases: [],
        gallery: [
            {
                image: "/images/seasons/robotpic1.png",
                title: "Build Session",
                description:
                    "Working hard on our 2024-25 competition robot during a build session.",
            },
            {
                image: "/images/seasons/robotpic2.png",
                title: "Competition Day",
                description:
                    "Showcasing our robot's dual slide mechanism, enabling both vertical and horizontal movement for efficient scoring.",
            },
            {
                image: "/images/seasons/robotpic3.png",
                title: "Precision & Performance",
                description:
                    "Our robot's advanced design and coding allow for smooth navigation and precise movements during competition.",
            },
            {
                image: "/images/seasons/awardpicwithmembers.png",
                title: "Teamwork & Success",
                description:
                    "Our dedication and collaboration helped us win the Control Award, proving that teamwork can achieve anything!",
            },
            {
                image: "/images/seasons/iowa-state-championship-2025.jpeg",
                title: "2024-2025 Iowa State Championship",
                description:
                    "Our team at the 2024-2025 FTC Iowa State Championship in Coralville, Iowa, showcasing our robot and celebrating our achievements.",
            },
        ],
    },
    {
        id: "centerstage-2023",
        name: "Centerstage",
        year: "2023-2024",
        slug: "centerstage",
        description:
            "Our debut season featured the Centerstage challenge, where we took our first leap into designing, building, and coding a competitive FTC robot.",
        phases: [
            {
                title: "Phase 1: Brainstorming & Learning",
                description:
                    "We started by studying the Centerstage challenge, brainstorming strategies, and learning about the core game elements. This phase set the foundation for our ambitious rookie build.",
            },
            {
                title: "Phase 2: Building the Robot",
                description:
                    "From chassis construction to mechanism prototyping, our team collaborated on assembling the robot and iterating on our initial designs.",
            },
            {
                title: "Phase 3: Programming",
                description:
                    "Our programmers developed code for both autonomous and tele-operated modes, incorporating sensor integration and driver control schemes.",
            },
            {
                title: "Phase 4: Testing & Practice",
                description:
                    "We tested our robot thoroughly, troubleshooting issues and refining its performance on the field through practice matches.",
            },
            {
                title: "Phase 5: Competition Experience",
                description:
                    "We entered FTC competitions for the first time, focusing on learning, adapting, and celebrating personal and team accomplishments.",
            },
        ],
        gallery: [
            {
                image: "/images/seasons/centerstage-field.jpg",
                title: "Centerstage Field Day",
                description:
                    "Testing our robot on the official Centerstage field for the first time, a big moment for our rookie team.",
            },
            {
                image: "/images/seasons/centerstage-robot.jpg",
                title: "Rookie Robot Reveal",
                description:
                    "Our first competition robot featured a custom arm and compact drive base, proudly built and coded from scratch.",
            },
            {
                image: "/images/seasons/centerstage-team.jpg",
                title: "Team Bonding at Competition",
                description:
                    "Our team supporting each other and learning together during our inaugural FTC season.",
            },
            {
                image: "/images/seasons/iowa-league-championship-2024.jpeg",
                title: "Iowa League Championship 2023-2024",
                description:
                    "Our team celebrating Second Place Control Award at the FTC Iowa Pollock League Championship in Norwalk, Iowa, February 17, 2024.",
            },
        ],
    },
];
