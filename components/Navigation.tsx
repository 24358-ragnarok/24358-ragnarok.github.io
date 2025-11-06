"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSeasonsOpen, setIsSeasonsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [pastHero, setPastHero] = useState(false);
    const pathname = usePathname();
    const isHomepage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            // Check if scrolled past hero section (90vh)
            if (isHomepage) {
                const heroHeight = window.innerHeight * 0.9;
                setPastHero(scrollY > heroHeight);
            } else {
                setPastHero(true); // On other pages, always show normal nav
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [isHomepage]);

    // Close mobile menu on scroll
    useEffect(() => {
        if (isOpen) {
            const handleScroll = () => {
                setIsOpen(false);
                setIsSeasonsOpen(false);
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("nav")) {
                setIsOpen(false);
                setIsSeasonsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/members", label: "Members" },
        { href: "/results", label: "Results" },
        { href: "#seasons", label: "Seasons", isDropdown: true },
    ];

    const seasonLinks = [
        { href: "/seasons/decode", label: "Decode" },
        { href: "/seasons/into-the-deep", label: "Into The Deep" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#010101]/98 backdrop-blur-md shadow-xl border-b border-ultimate-red/20"
                    : "bg-[#010101]/85 backdrop-blur-sm"
            }`}
        >
            <div className="container-custom">
                <div
                    className={`flex items-center transition-all duration-500 ${
                        isHomepage && !pastHero
                            ? "justify-center h-20"
                            : "justify-between h-16"
                    }`}
                >
                    {/* Logo - Only show when past hero or not on homepage */}
                    {(pastHero || !isHomepage) && (
                        <Link
                            href="/"
                            className="flex items-center gap-3 group transition-all duration-500"
                        >
                            <span className="text-2xl font-bold text-white font-top-show group-hover:text-gray-300 transition-colors">
                                24358
                            </span>
                            <span
                                className="text-2xl font-semibold font-top-show group-hover:text-[#ff3030] transition-colors"
                                style={{ color: "#ff0000" }}
                            >
                                Ragnarok
                            </span>
                        </Link>
                    )}

                    {/* Desktop Navigation */}
                    <div
                        className={`hidden md:flex items-center transition-all duration-500 ${
                            isHomepage && !pastHero ? "gap-10" : "gap-8"
                        }`}
                    >
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div
                                    key={link.label}
                                    className="relative group"
                                >
                                    <button
                                        className={`text-white hover:text-elite-gold transition-colors font-medium flex items-center gap-1 ${
                                            isHomepage && !pastHero
                                                ? "text-lg"
                                                : "text-sm"
                                        }`}
                                    >
                                        {link.label}
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-52 bg-[#0a0a0a] border border-ultimate-red/30 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl overflow-hidden backdrop-blur-md">
                                        {seasonLinks.map((season) => (
                                            <Link
                                                key={season.href}
                                                href={season.href}
                                                className="block px-5 py-3 text-white hover:text-elite-gold hover:bg-ultimate-red/10 transition-all text-sm border-b border-ultimate-red/10 last:border-0"
                                            >
                                                {season.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-white hover:text-elite-gold transition-colors font-medium ${
                                        isHomepage && !pastHero
                                            ? "text-lg"
                                            : "text-sm"
                                    } ${
                                        pathname === link.href
                                            ? "text-elite-gold"
                                            : ""
                                    }`}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ultimate-red rounded-full" />
                                    )}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 hover:text-elite-gold transition-colors ml-auto"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="pb-4 pt-2 border-t border-ultimate-red/20 bg-[#0a0a0a]/98 backdrop-blur-md">
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div
                                    key={link.label}
                                    className="border-b border-ultimate-red/10 last:border-0"
                                >
                                    <button
                                        onClick={() =>
                                            setIsSeasonsOpen(!isSeasonsOpen)
                                        }
                                        className="w-full flex items-center justify-between px-4 py-3.5 text-white hover:text-elite-gold hover:bg-ultimate-red/10 transition-all text-base font-medium"
                                    >
                                        <span>{link.label}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                isSeasonsOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            isSeasonsOpen
                                                ? "max-h-48 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {seasonLinks.map((season) => (
                                            <Link
                                                key={season.href}
                                                href={season.href}
                                                className="block px-8 py-3 text-gray-300 hover:text-elite-gold hover:bg-ultimate-red/10 transition-all text-sm border-l-2 border-transparent hover:border-ultimate-red/30"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsSeasonsOpen(false);
                                                }}
                                            >
                                                {season.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-3.5 text-white hover:text-elite-gold hover:bg-ultimate-red/10 transition-all text-base font-medium border-b border-ultimate-red/10 last:border-0 ${
                                        pathname === link.href
                                            ? "text-elite-gold bg-ultimate-red/15 border-l-4 border-elite-gold"
                                            : ""
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
