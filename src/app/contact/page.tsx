'use client';

import React from 'react';
import { FiMail } from 'react-icons/fi';
import siteData from '@/data/site-data';
import { useEmail } from '@/contexts/EmailContext';

export default function ContactPage() {
    const { showEmailModal } = useEmail();
    const { socialLinks } = siteData;

    return (
        <section id="contact" className="px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                    Get In Touch
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
                    I&apos;m currently looking for new opportunities. Whether you have a question or
                    just want to say hi, I&apos;ll get back to you as soon as possible!
                </p>
                <button
                    onClick={showEmailModal}
                    className="inline-flex transform items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                >
                    <FiMail className="mr-2" />
                    Say Hello
                </button>
                <div className="mt-12 flex justify-center space-x-6">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 transition-colors hover:text-blue-600"
                            aria-label={social.name}
                        >
                            {React.createElement(social.icon, { size: 24 })}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
