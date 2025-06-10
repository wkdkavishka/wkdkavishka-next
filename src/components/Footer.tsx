import React from 'react';
import siteData from '@/data/site-data';

export const Footer = () => {
                    const currentYear = new Date().getFullYear();
                    const { personal } = siteData;

                    return (
                                        <footer className="bottom-0 w-full border-t-2 border-teal-200 bg-white/50 px-2 py-2 backdrop-blur dark:border-teal-800/80">
                                                            <div className="mx-auto max-w-4xl text-center">
                                                                                <p className="text-gray-600 dark:text-gray-400">
                                                                                                    ©{' '}
                                                                                                    {
                                                                                                                        currentYear
                                                                                                    }{' '}
                                                                                                    {
                                                                                                                        personal.name
                                                                                                    }
                                                                                                    .
                                                                                                    All
                                                                                                    rights
                                                                                                    reserved.
                                                                                </p>
                                                                                <p className="mt-2 text-sm text-teal-600 dark:text-teal-400">
                                                                                                    Built
                                                                                                    with
                                                                                                    Next.js,
                                                                                                    TypeScript,
                                                                                                    and
                                                                                                    Tailwind
                                                                                                    CSS
                                                                                </p>
                                                            </div>
                                        </footer>
                    );
};
