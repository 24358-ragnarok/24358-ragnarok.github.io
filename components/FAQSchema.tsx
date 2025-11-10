/**
 * FAQ Structured Data Component
 *
 * TODO: Update the FAQ questions and answers to match your team's most common questions
 * This helps search engines display rich snippets in search results
 */

import { generateFAQSchema } from "@/lib/metadata-utils";

const faqs = [
    {
        question: "What is FTC Team 24358 Ragnarok?",
        answer: "FTC Team 24358 Ragnarok is a FIRST Tech Challenge robotics team based in Waukee, Iowa. We are dedicated to bringing the cutting edge of robotics to student engineers and competing in FTC competitions.",
    },
    {
        question: "Where is FTC Team 24358 Ragnarok located?",
        answer: "We are based in Waukee, Iowa, and represent the Waukee Northwest Robotics Club. We compete in Iowa FTC league and tournament events.",
    },
    {
        question: "What is FIRST Tech Challenge (FTC)?",
        answer: "FIRST Tech Challenge is a robotics competition for students in grades 7-12. Teams design, build, program, and operate robots to compete in an alliance format against other teams. FTC combines the excitement of sport with the rigors of science and technology.",
    },
    {
        question: "How can I join FTC Team 24358 Ragnarok?",
        answer: "If you're interested in joining our team, please contact us at team@ragnarokftc.com. We welcome students passionate about robotics, engineering, programming, and STEM.",
    },
    {
        question: "Does FTC Team 24358 accept sponsors?",
        answer: "Yes! We welcome sponsors who want to support STEM education and robotics. Sponsorships help us with robot parts, competition fees, and team resources. Contact us at team@ragnarokftc.com to learn about sponsorship opportunities.",
    },
    {
        question: "What skills do you need for FTC robotics?",
        answer: "FTC teams need a diverse set of skills including mechanical design and building, programming (Java/Blocks), CAD design, electrical systems, team organization, and outreach. At Ragnarok, prior experience is not required - we teach team members the skills they need!",
    },
    {
        question: "When does the FTC season run?",
        answer: "The FTC season typically runs from September through April, with the game reveal in early September, league meets and qualifiers in the fall and winter, and championship events in the spring.",
    },
];

export default function FAQSchema() {
    const schema = generateFAQSchema(faqs);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
        />
    );
}
