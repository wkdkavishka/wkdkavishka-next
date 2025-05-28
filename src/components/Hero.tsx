import React from "react";
import Image from "next/image";
import siteData from "@/data/site-data";

export const Hero = () => {
  const { personal } = siteData;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-gray-200 dark:bg-gray-700">
          <div className="relative w-full h-full">
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
                target.src = "/images/profile.jpg";
              }}
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {personal.name.split(" ")[0]}
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
          {personal.title}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          {personal.about[0]}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};
