'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import siteData, { TeamMember } from '@/data/site-data';

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const members: TeamMember[] = siteData.teamMembers || [];

  // Color variants for member cards
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === members.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? members.length - 1 : prevIndex - 1));
  };

  // useEffect(() => {
  //   if (!isAutoPlaying) return;

  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [isAutoPlaying]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === members.length - 1 ? 0 : prevIndex + 1));
    };

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, members.length]); // Add members.length to dependencies

  // const visibleMembers = [
  //   members[(currentIndex - 1 + members.length) % members.length],
  //   members[currentIndex],
  //   members[(currentIndex + 1) % members.length],
  // ];

  return (
    <section id="team" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
          People I&apos;ve Worked With
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          Some of the amazing people I&apos;ve had the pleasure to collaborate with
        </p>

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                prevSlide();
              }}
              className="z-10 mr-4 rounded-full bg-white p-2 text-blue-600 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800 dark:text-blue-400"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* card view section */}
            <div className="flex w-full overflow-hidden px-4 py-4">
              <div
                className="flex w-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className={`w-full flex-shrink-0 px-2 transition-all duration-300 ${
                      index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
                    }`}
                  >
                    <div
                      className={`h-full transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800 ${
                        borderHoverColors[index % borderHoverColors.length]
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-br px-6 pt-6 pb-2 ${
                          colorVariants[index % colorVariants.length]
                        } rounded-xl`}
                      >
                        <div className="flex flex-col items-center md:flex-row">
                          <div className="relative mb-6 h-32 w-32 flex-shrink-0 md:mr-6 md:mb-0 md:h-40 md:w-40">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 p-1">
                              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800">
                                {member.image ? (
                                  <Image
                                    src={member.image}
                                    alt={`${member.name}'s profile`}
                                    fill
                                    sizes="(max-width: 768px) 8rem, 10rem"
                                    className="object-cover"
                                    priority={index < 3} // Only preload first 3 images
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                    <span className="text-4xl font-bold text-gray-400 dark:text-gray-600">
                                      {member.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {member.name}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
                            <p className="mb-4 text-gray-500 dark:text-gray-400">
                              {member.company}
                            </p>

                            <div className="mb-4 flex justify-center space-x-3 md:justify-start">
                              <a
                                href={member.social.linkedin}
                                className="text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <FaLinkedin size={20} />
                              </a>
                              <a
                                href={member.social.twitter}
                                className="text-gray-500 transition-colors hover:text-blue-400"
                              >
                                <FaTwitter size={20} />
                              </a>
                              <a
                                href={member.social.github}
                                className="text-gray-500 transition-colors hover:text-gray-800 dark:hover:text-gray-200"
                              >
                                <FaGithub size={20} />
                              </a>
                            </div>

                            <div className="relative mt-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-700/70">
                              <FaQuoteLeft className="absolute -top-3 -left-3 text-2xl text-blue-500" />
                              <p className="text-gray-700 italic dark:text-gray-300">
                                {member.testimonial}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* END card view section */}

            <button
              onClick={() => {
                setIsAutoPlaying(false);
                nextSlide();
              }}
              className="z-10 ml-4 rounded-full bg-white p-2 text-blue-600 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800 dark:text-blue-400"
              aria-label="Next slide"
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          <div className="mt-8 flex justify-center space-x-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
