import React from "react";
import siteData from "@/data/site-data";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personal } = siteData;

  return (
    <footer className="py-8 px-6 bg-white dark:bg-gray-900/50 border-t-2 border-teal-200 dark:border-teal-800/80">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {currentYear} {personal.name}. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-teal-600 dark:text-teal-400">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};
