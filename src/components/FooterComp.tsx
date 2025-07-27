import React from 'react';
import siteData from '@/data/site-data';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { personal } = siteData;

    return (
        <footer className="rounded-4xl border-1 border-teal-200 bg-teal-100/50 p-2 shadow-lg backdrop-blur">
            <div className="mx-auto max-w-4xl text-center">
                                <p className="text-teal-600">
                    © {currentYear} {personal.name}. All rights reserved.
                </p>
                                {/* <p className="mt-2 text-sm text-teal-600">
                    Built with Next.js, TypeScript, and Tailwind CSS
                </p> */}
            </div>
        </footer>
    );
};
