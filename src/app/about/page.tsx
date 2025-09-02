'use client';

import React from 'react';
import Image from 'next/image';
import siteData from '@/data/site-data';
import { PersonalData, SocialData } from '@/data/site-data';

export default function Page() {
    const Personal: PersonalData = siteData.personal;
    const SocialLinks: SocialData[] = siteData.socialLinks;

    return (
        <section id="about" className="flex min-h-screen items-center justify-center px-6 py-20">
            <div className="mx-auto flex max-w-4xl flex-col items-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-5xl font-bold text-transparent">
                    About Me
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600">
                    Get to know me better
                </p>
                <div className="grid grid-cols-1 justify-between md:grid-cols-2">
                    {/* First Column: Profile Picture and Social Links */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-blue-500 md:h-80 md:w-80">
                            <Image
                                src={Personal.profileImage}
                                alt={`${Personal.name}'s profile`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="my-4 flex space-x-4">
                            {SocialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 transition-colors hover:text-blue-600"
                                    aria-label={social.name}
                                >
                                    {React.createElement(social.icon, {
                                        size: 30,
                                    })}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Second Column: About Texts and Download CV */}
                    <div className="flex flex-col justify-between gap-6 py-4 font-bold">
                        {Personal.about.slice(1).map((paragraph, index) => (
                            <p key={index} className="text-center text-xl text-gray-700">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() =>
                            window.open(Personal.resumeUrl, '_blank', 'noopener,noreferrer')
                        }
                        className="mx-auto items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                    >
                        View Resume
                    </button>
                </div>
            </div>
        </section>
    );
}
