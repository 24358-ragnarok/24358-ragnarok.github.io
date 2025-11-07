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
        name: "Connor Israel",
        role: "Captain • Head Engineer",
        image: "/images/members/connor.png",
        bio: "Connor is a builder who has vast experience in building designs and the principles of engineering. This is his second season in FIRST and he enjoys the applicable growth opportunities found in FTC. He, aptly, hopes to pursue a future in robotics engineering.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Head Engineer" },
            { year: 2024, role: "Captain • Head Engineer" },
            { year: 2025, role: "Captain • Head Engineer" },
        ],
    },
    {
        id: "ben-boonstra",
        name: "Ben Boonstra",
        role: "Co-Captain • Head Developer",
        image: "/images/members/ben.png",
        bio: "Since he was 7, Ben has programmed games, robots, apps, and more. Ben is both the Head of Programming and Co-captain; this is his second year in FTC and he is excited to build upon his previous experience to create complex and in-depth technologies. He hopes to use this experience as a kickstart to his software development career.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Head Developer" },
            { year: 2024, role: "Co-Captain • Head Developer" },
            { year: 2025, role: "Co-Captain • Head Developer" },
        ],
    },
    {
        id: "daouda-kaba",
        name: "Daouda Kaba",
        role: "Head of Management",
        image: "/images/members/daouda.png",
        bio: "Daouda is one of the most joyous people you'll ever meet. He is a member of the build team, and always leaves everyone with a grin. His strong aptitude for learning mixed with his adaptability catapults our build team to the top. He hopes that this experience will help with his dream of becoming a graphic designer.",
        years: [2023, 2024, 2025],
        executive: true,
        historicalRoles: [
            { year: 2023, role: "Engineer" },
            { year: 2025, role: "Head of Management" },
        ],
    },

    // ACTIVE MEMBERS
    {
        id: "deepak-pattapu",
        name: "Deepak Pattapu",
        role: "Senior Developer",
        image: "/images/members/deepak.png",
        bio: "As a seasoned member of Ragnarok, I'm excited to keep pushing my skills and contributing to the team. I started coding when I was 9 and have experience with HTML, CSS, JavaScript, Python, and Java. I'm always looking for ways to improve and learn new things. This is my third year in FTC, and I can't wait to see what we accomplish this season!",
        years: [2024, 2025],
        historicalRoles: [{ year: 2025, role: "Senior Developer" }],
    },
    {
        id: "levi-bolie",
        name: "Levi Bolie",
        role: "Materials Engineer",
        image: "/images/members/levi.png",
        bio: "As a rookie member of the build team, Levi brings fresh energy and enthusiasm to Ragnarok. Despite being new to FTC, he has quickly proven himself to be a dedicated builder with a natural talent for mechanical design. His eagerness to learn and willingness to tackle new challenges makes him a valuable addition to the team.",
        years: [2024, 2025],
        historicalRoles: [{ year: 2025, role: "Materials Engineer" }],
    },
    {
        id: "harshith-reddy",
        name: "Harshith Reddy Anumula",
        role: "Programmer",
        image: "/images/members/harshith.png",
        bio: "As a rookie member of Ragnarok, I'm excited to bring my passion for programming to the team. I've been coding since I was 10 and have experience with HTML, CSS, JavaScript, and Python. I'm always focused on improving my skills and learning new things. This is my first year in FTC, and I'm eager to learn and contribute however I can!",
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
        bio: "I'm Agney Kakkunnath, and this is my fifth year in FTC. As a mechanical engineer, I'm fully dedicated to the building process, ensuring everything is designed and assembled to help the team perform at its best. I'm also skilled at CAD and love encouraging the team to stay motivated and work together!",
        years: [2024, 2025],
        historicalRoles: [{ year: 2025, role: "Mechanical Engineer" }],
    },
    {
        id: "adarsh-rajesh",
        name: "Adarsh Rajesh",
        role: "Web Developer",
        image: "/images/members/adarsh.jpg",
        bio: "Hi, I'm Adarsh! I've been part of FTC for 2 years. I've programmed in HTML, CSS, JavaScript, and Python, and I love building projects, solving problems, and learning new skills to help the team succeed!",
        years: [2024, 2025],
        historicalRoles: [{ year: 2024, role: "Web Developer" }],
    },
    {
        id: "noel-antony",
        name: "Noel Antony",
        role: "Builder",
        image: "/images/members/noel.jpeg",
        bio: "I'm Noel, a rookie member of the team FTC and I love building and creating things. I'm excited to learn, contribute, and help the team succeed!",
        years: [2025],
    },
    {
        id: "beck-hansen",
        name: "Beck Hansen",
        role: "Builder",
        image: "/images/members/beck.jpeg",
        bio: "Hi, I'm Beck. I am one of the builders on the team, and I love to bring new and creative ideas to the table, and tackle new challenges. I'm super grateful for my awesome colleagues, and I'm excited to contribute to the team this year",
        years: [2025],
    },
    {
        id: "eli-wilhelm",
        name: "Eli Wilhelm",
        role: "Builder",
        image: "/images/members/eli.png",
        bio: "Hi, I'm Eli! I'm a rookie and one of the builders on the team. I love bringing ideas to life through building, and I'm excited to learn, create, and contribute to the team!",
        years: [2025],
    },
    {
        id: "jacob-weldon",
        name: "Jacob Weldon",
        role: "Programmer",
        image: "/images/members/jacob.jpg",
        bio: "Hi! I'm Jacob, a passionate programmer who loves creating cool projects and solving problems. I enjoy learning new tech and helping my team succeed through teamwork, ideas, and support.",
        years: [2025],
    },
    {
        id: "ella-cahill",
        name: "Ella Cahill",
        role: "Builder",
        image: "/images/members/ella.jpg",
        bio: "Hi! I'm Ella, a builder on our robotics team. I enjoy creating strong and reliable parts for our robot and working with my teammates to make our designs come to life.",
        years: [2025],
    },
    {
        id: "sasha-kosokina",
        name: "Sasha Kosokina",
        role: "Builder",
        image: "/images/members/sasha.jpg",
        bio: "Hi! I'm Sasha, a builder on our robotics team. I love designing, building, and making sure every part fits perfectly. I enjoy working with my teammates to bring our robot ideas to life!",
        years: [2025],
    },
    {
        id: "ashley-zhu",
        name: "Ashley Zhu",
        role: "Builder",
        image: "/images/members/ashley.jpg",
        bio: "Hi! I'm Ashley, and I'm a builder on our robotics team. I love bringing ideas to life by constructing and assembling our robots, making sure everything fits and works perfectly. I enjoy teamwork and figuring out creative ways to solve problems while building something amazing with the team.",
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
