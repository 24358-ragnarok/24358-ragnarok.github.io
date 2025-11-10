/**
 * Team Information
 *
 * Edit this file to update team contact info and social links
 */

import { TeamInfo } from "@/lib/types";

export const teamInfo: TeamInfo = {
    teamNumber: "24358",
    teamName: "Ragnarok",
    location: "Waukee, Iowa",
    description:
        "Ragnarok is a First Tech Challenge Robotics team based out of the Waukee School " +
        "District. We are both the Ragnarok team and the Waukee Northwest Robotics Club, driven " +
        "by a love for STEM and the opportunity to bring the future of technology to students of all ages.",
    email: "team@ragnarokftc.com",
    socialLinks: [
        {
            platform: "GitHub",
            url: "https://github.com/24358-ragnarok",
            icon: "github",
        },
        {
            platform: "Instagram",
            url: "https://instagram.com/ragnarok_ftc24358",
            icon: "instagram",
        },
    ],
};
