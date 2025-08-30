'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-100">404</h1>
                <h2 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Page Not Found
                </h2>
                <p className="mb-8 text-gray-600 dark:text-gray-300">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Return Home
                </Link>
            </motion.div>

            <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                Lost? Feel free to{' '}
                <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
                    contact me
                </Link>
            </div>
        </div>
    );
}
