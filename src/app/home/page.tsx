'use client';

import siteData from '@/data/site-data';
import { PersonalData, SocialData } from '@/data/site-data';
import React from 'react';
import { useEmail } from '@/contexts/EmailContext';
import { FiMail } from 'react-icons/fi';

export default function Page() {
    const personal: PersonalData = siteData.personal;
    const SocialLinks: SocialData[] = siteData.socialLinks;
    const { showEmailModal } = useEmail();

    return (
        <section id="home" className="flex min-h-screen items-center justify-center px-6 py-2">
            <div className="mx-auto max-w-4xl text-center">
                {/* Profile Image */}
                {/* <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-gray-900 shadow-lg md:h-48 md:w-48">
                    <div className="relative h-full w-full">
                        <Image
                            src={personal.profileImage}
                            alt={`${personal.name}'s profile`}
                            fill
                            sizes="(max-width: 768px) 12rem, 14rem"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div> */}

                <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                    Hi, I&apos;m{' '}
                    <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                        {personal.name.split(' ')[0]}
                    </span>
                </h1>

                <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text font-sans text-2xl font-bold text-transparent md:text-3xl">
                    {personal.title}
                </h2>

                <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-900 md:text-2xl">
                    {personal.about[0]}
                </p>

                <div className="mb-12 flex justify-center space-x-4">
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
                                size: 28,
                            })}
                        </a>
                    ))}
                </div>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                        onClick={showEmailModal}
                        className="inline-flex transform items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                    >
                        <FiMail className="mr-2" />
                        Send Mail
                    </button>
                    <button
                        onClick={() => {
                            const projectsSection = document.getElementById('projects');
                            projectsSection?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                        className="inline-flex transform items-center rounded-full bg-gradient-to-r from-teal-600 to-teal-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                    >
                        View My Work
                    </button>
                </div>
            </div>
        </section>
    );
}
