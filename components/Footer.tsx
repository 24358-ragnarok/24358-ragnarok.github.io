import Link from "next/link";
import { teamInfo } from "@/data/team-info";
import { EmailIcon, GithubIcon, InstagramIcon } from "./Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#010101] border-t border-ultimate-red/20 py-20 relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Team Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-display font-top-show">
                            <span className="text-elite-gold text-xl">
                                {teamInfo.teamNumber}
                            </span>{" "}
                            <span className="text-white text-xl">
                                {teamInfo.teamName}
                            </span>
                        </h3>
                        <p className="text-white mb-4 text-sm">
                            {teamInfo.location}
                        </p>
                        <a
                            href={`mailto:${teamInfo.email}`}
                            className="inline-flex items-center gap-2 text-ultimate-red hover:text-elite-gold transition-colors text-sm font-medium"
                        >
                            <EmailIcon className="w-4 h-4" aria-hidden={true} />
                            {teamInfo.email}
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-display">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-elite-gold transition-colors text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/members"
                                    className="text-gray-300 hover:text-elite-gold transition-colors text-sm"
                                >
                                    Team Members
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/results"
                                    className="text-gray-300 hover:text-elite-gold transition-colors text-sm"
                                >
                                    Match Results
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-display">
                            Follow Us
                        </h3>
                        <div className="flex gap-3">
                            {teamInfo.socialLinks.map((social) => {
                                const Icon =
                                    social.icon === "github"
                                        ? GithubIcon
                                        : InstagramIcon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-gear-gray/40 border border-ultimate-red/30 flex items-center justify-center hover:bg-ultimate-red hover:border-ultimate-red hover:scale-110 transition-all group"
                                        aria-label={`Follow us on ${social.platform}`}
                                    >
                                        <Icon className="w-5 h-5 text-white group-hover:text-ash-black transition-colors" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-ultimate-red/20 pt-8 mt-12 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {currentYear}{" "}
                    <span className="text-elite-gold font-bold text-base">
                        {teamInfo.teamName}
                    </span>{" "}
                    - FTC Team {teamInfo.teamNumber}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
