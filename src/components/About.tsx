import React from "react";
import Image from "next/image";
import siteData from "@/data/site-data";

export const About = () => {
  const { personal, socialLinks } = siteData;

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500">
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
              <p key={index} className="text-lg mb-6">
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
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.name}
                >
                  {React.createElement(social.icon, { size: 24 })}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
