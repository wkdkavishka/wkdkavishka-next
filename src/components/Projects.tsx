import React from "react";
import Image from "next/image";
import siteData from "@/data/site-data";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export const Projects = () => {
  const { projects } = siteData;

  if (!projects || projects.length === 0) {
    return null;
  }

  // Color variants for project cards
  const colorVariants = [
    "from-blue-600/5 to-purple-600/5",
    "from-green-600/5 to-blue-600/5",
    "from-purple-600/5 to-pink-600/5",
    "from-pink-600/5 to-red-600/5",
    "from-yellow-600/5 to-orange-600/5",
    "from-teal-600/5 to-cyan-600/5",
  ];

  // Border hover colors
  const borderHoverColors = [
    "hover:border-blue-500/30 hover:ring-2 hover:ring-blue-500/20",
    "hover:border-green-500/30 hover:ring-2 hover:ring-green-500/20",
    "hover:border-purple-500/30 hover:ring-2 hover:ring-purple-500/20",
    "hover:border-pink-500/30 hover:ring-2 hover:ring-pink-500/20",
    "hover:border-yellow-500/30 hover:ring-2 hover:ring-yellow-500/20",
    "hover:border-teal-500/30 hover:ring-2 hover:ring-teal-500/20",
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Some of my recent work and contributions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colorVariant = colorVariants[index % colorVariants.length];
            const borderHover =
              borderHoverColors[index % borderHoverColors.length];

            return (
              <div
                key={project.id}
                className={`group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 dark:border-gray-700 ${borderHover}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colorVariant} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                          aria-label="View on GitHub"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
                        aria-label="View live demo"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
