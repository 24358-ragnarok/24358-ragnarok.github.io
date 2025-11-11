import { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import { members, alumni } from "@/data/members";
import { generateMemberPageMetadata } from "@/lib/metadata-utils";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = generateMemberPageMetadata();

export default function MembersPage() {
    return (
        <>
            {/* Breadcrumb Structured Data for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "/" },
                    { name: "Team Members", url: "/members" },
                ]}
            />

            {/* Header */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="container-custom text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-top-show mb-6">
                        Meet the <span className="gradient-text">Team</span>
                    </h1>
                    <div className="h-0.5 w-24 bg-ultimate-red mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        The brilliant minds behind Ragnarok
                    </p>
                </div>
            </section>

            {/* Active Members */}
            <section className="py-10 md:py-12 relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {members.map((member, index) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                index={index}
                                priority={index < 3}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Alumni Section */}
            {alumni.length > 0 && (
                <>
                    <section className="py-10 md:py-12 relative">
                        <div className="container-custom text-center relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-300 mb-4">
                                Alumni
                            </h2>
                            <div className="h-0.5 w-20 bg-ultimate-red mx-auto rounded-full mb-4" />
                            <p className="text-lg text-gray-400 max-w-xl mx-auto">
                                Former team members who contributed to our
                                success
                            </p>
                        </div>
                    </section>

                    <section className="py-10 md:py-12 pb-16 relative">
                        <div className="container-custom">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                                {alumni.map((member, index) => (
                                    <MemberCard
                                        key={member.id}
                                        member={member}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
