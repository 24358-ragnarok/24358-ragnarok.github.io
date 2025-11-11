import { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Code, BookOpen, Mail } from "lucide-react";
import { resources } from "@/data/resources";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { ArrowRightIcon, EmailIcon } from "@/components/Icons";
import { generateResourcesPageMetadata } from "@/lib/metadata-utils";

export const metadata: Metadata = generateResourcesPageMetadata();

const categoryColors = {
    tools: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    code: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    official: "from-orange-500/20 to-red-500/20 border-orange-500/30",
    contact: "from-elite-gold/20 to-yellow-500/20 border-elite-gold/30",
};

// Icon mapping for Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Bot,
    Zap,
    Code,
    BookOpen,
    Mail,
};

export default function ResourcesPage() {
    return (
        <>
            {/* Breadcrumb Structured Data for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "/" },
                    { name: "Resources", url: "/resources" },
                ]}
            />

            {/* Header */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-top-show mb-6">
                        Resources for{" "}
                        <span className="gradient-text">Teams</span>
                    </h1>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Tools, code, and resources we use and share with the FTC
                        community
                    </p>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-10 md:py-12 relative">
                <div className="container-custom">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
                            resources.length === 1 ? "max-w-2xl mx-auto" : ""
                        }`}
                    >
                        {resources.map((resource) => {
                            const isExternal =
                                resource.url.startsWith("http") &&
                                !resource.url.includes("ragnarokftc.com");
                            const isEmail = resource.url.startsWith("mailto:");

                            return (
                                <Link
                                    key={resource.id}
                                    href={resource.url}
                                    target={
                                        isExternal && !isEmail
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        isExternal && !isEmail
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className={`group card card-hover glow-border bg-gradient-to-br ${
                                        categoryColors[
                                            resource.category as keyof typeof categoryColors
                                        ]
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {resource.icon &&
                                            iconMap[resource.icon] && (
                                                <div className="shrink-0 p-2 rounded-lg bg-ash-black/40 group-hover:bg-ash-black/60 transition-colors">
                                                    {(() => {
                                                        const IconComponent =
                                                            iconMap[
                                                                resource.icon
                                                            ];
                                                        return (
                                                            <IconComponent className="w-8 h-8 text-gray-300 group-hover:text-elite-gold transition-colors" />
                                                        );
                                                    })()}
                                                </div>
                                            )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <h3 className="text-2xl font-bold text-white font-display group-hover:text-elite-gold transition-colors">
                                                    {resource.title}
                                                </h3>
                                                {isExternal && !isEmail && (
                                                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-elite-gold group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                                                )}
                                                {isEmail && (
                                                    <EmailIcon className="w-5 h-5 text-gray-400 group-hover:text-elite-gold transition-colors shrink-0 mt-1" />
                                                )}
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">
                                                {resource.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 md:py-12 pb-16 relative">
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                        Want to{" "}
                        <span className="gradient-text">Contribute?</span>
                    </h2>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                        Have a resource or tool that&apos;s helped your team?
                        We&apos;d love to hear about it!
                    </p>
                    <a
                        href="mailto:team@ragnarokftc.com"
                        className="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3"
                    >
                        <EmailIcon className="w-6 h-6" aria-hidden={true} />
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
}
