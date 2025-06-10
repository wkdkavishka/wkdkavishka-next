import React from 'react';
import Image from 'next/image';
import siteData from '@/data/site-data';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const { projects } = siteData;

  if (!projects || projects.length === 0) {
    return null;
  }

  // Color variants for project cards
  const colorVariants = [
    'from-blue-600/5 to-purple-600/5',
    'from-green-600/5 to-blue-600/5',
    'from-purple-600/5 to-pink-600/5',
    'from-pink-600/5 to-red-600/5',
    'from-yellow-600/5 to-orange-600/5',
    'from-teal-600/5 to-cyan-600/5',
  ];

  // Border hover colors
  const borderHoverColors = [
    'hover:border-blue-500/30 hover:ring-2 hover:ring-blue-500/20',
    'hover:border-green-500/30 hover:ring-2 hover:ring-green-500/20',
    'hover:border-purple-500/30 hover:ring-2 hover:ring-purple-500/20',
    'hover:border-pink-500/30 hover:ring-2 hover:ring-pink-500/20',
    'hover:border-yellow-500/30 hover:ring-2 hover:ring-yellow-500/20',
    'hover:border-teal-500/30 hover:ring-2 hover:ring-teal-500/20',
  ];

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
          Featured Projects
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          Some of my recent work and contributions
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const colorVariant = colorVariants[index % colorVariants.length];
            const borderHover = borderHoverColors[index % borderHoverColors.length];

            return (
              <div
                key={project.id}
                className={`group relative transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 ${borderHover}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colorVariant} rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100`}
                ></div>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <div className="relative h-40 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {project.title}
                  </h3>
                  <p className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700/50 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                    <div className="flex space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                          aria-label="View on GitHub"
                        >
                          <FiGithub className="h-5 w-5" />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 transition-colors hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
                        aria-label="View live demo"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
}
