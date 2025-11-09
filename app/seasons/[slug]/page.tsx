import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { seasons } from "@/data/seasons";
import { generateSeasonPageMetadata } from "@/lib/metadata-utils";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { EmailIcon } from "@/components/Icons";

type Props = {
    params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
    return seasons.map((season) => ({
        slug: season.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const season = seasons.find((s) => s.slug === resolvedParams.slug);

    if (!season) {
        return {
            title: "Season Not Found",
        };
    }

    return generateSeasonPageMetadata(season);
}

export default async function SeasonPage({ params }: Props) {
    const resolvedParams = await params;
    const season = seasons.find((s) => s.slug === resolvedParams.slug);

    if (!season) {
        notFound();
    }

    return (
        <>
            {/* Breadcrumb Structured Data for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "/" },
                    { name: "Seasons", url: "/#robots" },
                    {
                        name: `${season.name} ${season.year}`,
                        url: `/seasons/${season.slug}`,
                    },
                ]}
            />

            {/* Header */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
                        {season.name}
                    </h1>
                    <p className="text-2xl text-elite-gold font-bold mb-6">
                        {season.year}
                    </p>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {season.description}
                    </p>
                </div>
            </section>

            {/* Phases */}
            {season.phases && season.phases.length > 0 && (
                <section className="py-10 md:py-12 relative">
                    <div className="container-custom relative z-10">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                                Our{" "}
                                <span className="gradient-text">Journey</span>
                            </h2>
                            <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                        </div>
                        <div className="max-w-4xl mx-auto space-y-6">
                            {season.phases.map((phase, index) => (
                                <div key={index} className="card glow-border">
                                    <div className="flex items-start gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-xl bg-ultimate-red flex items-center justify-center text-white font-bold text-xl font-display shadow-lg">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-3 font-display">
                                                {phase.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed text-lg">
                                                {phase.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery */}
            {season.gallery && season.gallery.length > 0 && (
                <section className="py-10 md:py-12 relative">
                    <div className="container-custom relative z-10">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                                <span className="gradient-text">Gallery</span>
                            </h2>
                            <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {season.gallery.map((item, index) => (
                                <div
                                    key={index}
                                    className="card card-hover overflow-hidden glow-border group"
                                >
                                    <div className="relative h-72 -m-8 mb-6 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-ash-black/60" />
                                    </div>
                                    <div className="px-8 pb-8">
                                        <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-elite-gold transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-10 md:py-12 pb-16 relative">
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                        Stay <span className="gradient-text">Connected</span>
                    </h2>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                        Follow our progress and see how we innovate in the world
                        of robotics!
                    </p>
                    <a
                        href="mailto:roboticswaukee@gmail.com"
                        className="btn-primary text-lg px-10 py-5"
                    >
                        <EmailIcon className="w-6 h-6" aria-hidden={true} />
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
}
