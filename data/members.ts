/**
 * Team Members Data
 *
 * HOW TO ADD/EDIT MEMBERS:
 * 1. Add member photos to /public/images/members/ folder
 * 2. Add a new member object to the array below
 * 3. Set executive: true for captains and leadership
 * 4. Set isAlumni: true for past members
 * 5. Add historicalRoles to show role changes over years
 *
 * EXAMPLE:
 * {
 *   id: "unique-id",
 *   name: "John Doe",
 *   role: "Current Role",
 *   image: "/images/members/john.png",
 *   bio: "Brief description...",
 *   years: [2024, 2025],
 *   executive: true,
 *   historicalRoles: [
 *     { year: 2024, role: "Engineer" },
 *     { year: 2025, role: "Captain" }
 *   ]
 * }
 */

import { Member } from "@/lib/types";

export const members: Member[] = [
    // ELITE MEMBERS (Leadership)
    {
        id: "connor-israel",
        name: "Conner Israel",
        role: "Captain • Lead Engineer",
        image: "/images/members/conner.png",
        bio: "Conner is the Lead Engineer of Ragnarok, and Captain in partnership with Ben. Conner has vast experience in engineering design, CAD, and system analysis. This is his third and final season in FIRST and he enjoys the growth opportunities and leadership as a Captain in FTC. He is excited to continue his journey in robotics engineering at college next year.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Head Engineer" },
            { year: 2024, role: "Captain • Head Engineer" },
            { year: 2025, role: "Captain • Lead Engineer" },
        ],
        socialLinks: {
            email: "conner@ragnarokftc.com",
        },
    },
    {
        id: "ben-boonstra",
        name: "Ben Boonstra",
        role: "Co-Captain • Lead Developer",
        image: "/images/members/ben.png",
        bio: "Ben is both the Lead Developer and Co-Captain of Ragnarok, totalling three years in FTC. He uses his extensive experience in systems programming and object-oriented design to create award-winning FTC software, along  with his web development and brand management skills to elevate Ragnarok's presence. Ben will continue his journey in computer science in college next year.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Head Developer" },
            { year: 2024, role: "Co-Captain • Head Developer" },
            { year: 2025, role: "Co-Captain • Lead Developer" },
        ],
        socialLinks: {
            email: "ben@ragnarokftc.com",
            github: "bboonstra",
        },
    },
    {
        id: "daouda-kaba",
        name: "Daouda Kaba",
        role: "Head of Management",
        image: "/images/members/daouda.png",
        bio: "Daouda is the lead of outreach, communications, and coordination at Ragnarok, and always leaves everyone with a smile. His strong aptitude for learning mixed with his adaptability catapults our team to the top. He hopes that this experience will help with his dream of becoming a graphic designer.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Engineer" },
            { year: 2025, role: "Head of Management" },
        ],
        socialLinks: {
            email: "daouda@ragnarokftc.com",
        },
    },

    {
        id: "deepak-pattapu",
        name: "Deepak Pattapu",
        role: "Senior Developer",
        image: "/images/members/deepak.png",
        bio: "As a seasoned member of Ragnarok, Deepak is excited to improve his skills and contribute to the team. He started coding when he was 9 and has experience with HTML, CSS, JavaScript, Python, and Java. He is always looking for ways to improve and learn new things. This is his fourth year in FTC, and he can't wait to see what we accomplish this season!",
        years: [2024, 2025],
        historicalRoles: [{ year: 2025, role: "Senior Developer" }],
    },
    {
        id: "harshith-reddy",
        name: "Harshith Reddy Anumula",
        role: "Programmer",
        image: "/images/members/harshith.png",
        bio: "With two years on Ragnarok, Harshith is excited to bring his passion for programming to the team. He has been coding since he was 10 and has experience with HTML, CSS, JavaScript, and Python. He is always focused on improving his skills and learning new things.",
        years: [2024, 2025],
        historicalRoles: [
            { year: 2024, role: "Web Developer" },
            { year: 2025, role: "Web Developer" },
        ],
    },
    {
        id: "agney-kakkunnath",
        name: "Agney Kakkunnath",
        role: "Mechanical Engineer",
        image: "/images/members/agney.jpg",
        bio: "With five years in FTC and two on Ragnarok, Agney is fully dedicated to the building process, ensuring everything is designed and assembled to help the team perform at its best. Agney is also skilled at CAD and loves encouraging the team to stay motivated and work together!",
        years: [2024, 2025],
        historicalRoles: [{ year: 2025, role: "Mechanical Engineer" }],
    },
    {
        id: "adarsh-rajesh",
        name: "Adarsh Rajesh",
        role: "Web Developer",
        image: "/images/members/Adarsh.jpg",
        bio: "Adarsh is a web developer on Ragnarok, with two years in FTC. He has programmed in HTML, CSS, JavaScript, and Python, and loves building projects, solving problems, and learning new skills.",
        years: [2024, 2025],
        historicalRoles: [{ year: 2024, role: "Web Developer" }],
    },
    {
        id: "noel-antony",
        name: "Noel Antony",
        role: "Builder",
        image: "/images/members/noel.jpeg",
        bio: "Noel is a rookie member of the team. He loves building and creating things, and is excited to learn, contribute, and help the team succeed!",
        years: [2025],
    },
    {
        id: "beck-hansen",
        name: "Beck Hansen",
        role: "Builder",
        image: "/images/members/beck.jpeg",
        bio: "Beck is one of the builders on the team, starting FTC this year. He loves to bring new and creative ideas to the table, and tackle new challenges. He is super grateful for his awesome colleagues, and is excited to contribute to the team this season!",
        years: [2025],
    },
    {
        id: "eli-wilhelm",
        name: "Eli Wilhelm",
        role: "Builder",
        image: "/images/members/eli.png",
        bio: "Eli is a rookie member of the team, starting FTC this year. He loves bringing ideas to life through building, and is excited to learn, create, and contribute to the team!",
        years: [2025],
    },
    {
        id: "jacob-weldon",
        name: "Jacob Weldon",
        role: "Programmer",
        image: "/images/members/jacob.jpg",
        bio: "Jacob is a passionate programmer who loves creating cool projects and solving problems. He enjoys learning new tech and helping his team succeed through teamwork, ideas, and support.",
        years: [2025],
    },
    {
        id: "ella-cahill",
        name: "Ella Cahill",
        role: "Builder",
        image: "/images/members/ella.JPG",
        bio: "Ella is a builder on the team, starting FTC this year. She enjoys creating strong and reliable parts for our robot and working with her teammates to make our designs come to life. Her favorite number is 67.",
        years: [2025],
    },
    {
        id: "sasha-kosokina",
        name: "Sasha Kosokina",
        role: "Builder",
        image: "/images/members/sasha.JPG",
        bio: "Sasha is a rookie builder on Ragnarok. She loves designing, building, and making sure every part fits perfectly. She enjoys working with her teammates to bring our robot ideas to life!",
        years: [2025],
    },
    {
        id: "ashley-zhu",
        name: "Ashley Zhu",
        role: "Builder",
        image: "/images/members/ashley.JPG",
        bio: "Ashley is a builder on the team. She loves bringing ideas to life by constructing and assembling our robots, making sure everything fits and works perfectly. She enjoys teamwork and figuring out creative ways to solve problems while building something amazing with the team.",
        years: [2025],
    },
];

// ALUMNI MEMBERS
export const alumni: Member[] = [
    {
        id: "rishu-sharma",
        name: "Rishu Sharma",
        role: "Senior Developer",
        image: "/images/members/rishu.png",
        bio: "Rishu was an amazing programmer. He truly was one of the best programmers of all time. A real Edison. He could solve any problem in minutes with O(n log n) time complexity. He was an incredible asset to the team and wrote only using Neovim on Arch Linux.",
        years: [2024, 2025],
        isAlumni: true,
    },
];
