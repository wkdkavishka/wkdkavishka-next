'use client';

import React from 'react';
import Image from 'next/image';
import siteData from '@/data/site-data';

export default function Page() {
    const { personal, socialLinks } = siteData;

    return (
        <section id="about" className="px-6 py-20">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
                    About Me
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
                    Get to know me better
                </p>
                <div className="flex flex-col items-center gap-12 md:flex-row">
                    <div className="flex w-full justify-center md:w-1/3">
                        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-blue-500">
                            <Image
                                src="/images/profile.jpg"
                                alt={`${personal.name}'s profile`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        {personal.about.map((paragraph, index) => (
                            <p
                                key={index}
                                className="mb-6 text-lg text-gray-600 dark:text-gray-300"
                            >
                                {paragraph}
                            </p>
                        ))}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                    aria-label={social.name}
                                >
                                    {React.createElement(social.icon, {
                                        size: 24,
                                    })}
                                </a>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() =>
                                    window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
                                }
                                className="inline-flex transform items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                            >
                                View Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
