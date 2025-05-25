import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>© {currentYear} Your Name. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  );
};
