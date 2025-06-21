import React from 'react';
import Image from 'next/image';
import siteData from '@/data/site-data';

export const Hero = () => {
    const { personal } = siteData;

    return (
        <section id="home" className="flex min-h-screen items-center justify-center px-6 py-2">
            <div className="mx-auto max-w-4xl text-center">
                {/* Profile Image */}
                <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-gray-900 shadow-lg md:h-48 md:w-48 dark:border-gray-800 dark:bg-gray-700">
                    <div className="relative h-full w-full">
                        <Image
                            src={personal.profileImage}
                            alt={`${personal.name}'s profile`}
                            fill
                            sizes="(max-width: 768px) 12rem, 14rem"
                            className="object-cover"
                            priority
                            onError={(e) => {
                                // Fallback in case the image fails to load
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/images/profile.jpg';
                            }}
                        />
                    </div>
                </div>

                <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                    Hi, I&apos;m{' '}
                    <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                        {personal.name.split(' ')[0]}
                    </span>
                </h1>

                <h2 className="mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-400">
                    {personal.title}
                </h2>

                <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
                    {personal.about[0]}
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                        onClick={() => {
                            const contactSection = document.getElementById('contact');
                            contactSection?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                        className="inline-flex transform items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                    >
                        Get In Touch
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
};
