'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-full max-w-4xl rounded-4xl bg-white/30 p-12 text-center shadow-2xl backdrop-blur-md"
            >
                <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 p-2 shadow-lg">
                    <svg
                        className="h-20 w-20 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h1 className="mb-6 font-sans text-8xl font-extrabold tracking-tight text-blue-900 drop-shadow-sm md:text-9xl">
                    404
                </h1>

                <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text font-sans text-4xl font-bold text-transparent md:text-5xl">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mb-10 max-w-2xl bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-xl font-medium text-transparent">
                    The page you&apos;re looking for seems to have
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text font-semibold text-transparent">
                        &nbsp;melted away&nbsp;
                    </span>
                    or never existed.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="w-full transform rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-cyan-500 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
                    >
                        Return to Home
                    </Link>

                    <Link
                        href="/#contact"
                        className="group flex items-center text-lg font-semibold text-blue-700 transition-colors hover:text-blue-800"
                    >
                        <span>Need help?</span>
                        <svg
                            className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
