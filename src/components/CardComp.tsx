import Image from 'next/image';
import { CardCompIntf } from '../data/site-data';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useState, useEffect } from 'react';

interface CardProps {
    project: CardCompIntf;
    colorVariant: string;
    borderHover: string;
    index: number;
    children?: React.ReactNode;
}

export const CardComp: React.FC<CardProps> = ({ project, colorVariant, borderHover, index }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransition(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % project.image.length);
                setTransition(false);
            }, 300);
        }, 5000);
        return () => clearInterval(interval);
    }, [project.image]);

    return (
        <div
            key={project.id}
            className={`group relative transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${borderHover}`}
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${colorVariant} rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100`}
            ></div>
            <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 overflow-hidden rounded-lg">
                    <div className="relative h-40 w-full">
                        <div className="relative h-full w-full">
                            {project.image.map((img, i) => (
                                <div
                                    key={i}
                                    className={`absolute inset-0 transition-all duration-500 ${
                                        i === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
                                    } ${transition ? 'scale-105 transform' : ''}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${project.title} - ${i + 1}`}
                                        fill
                                        className="rounded-lg object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index < 3}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {project.title}
                </h3>
                <p className="mb-4 flex-grow text-sm text-gray-600">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex space-x-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 transition-colors hover:text-gray-600"
                                aria-label="View on GitHub"
                            >
                                <FiGithub className="h-5 w-5" />
                            </a>
                        )}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-colors hover:text-blue-600"
                            aria-label="View live demo"
                        >
                            <FiExternalLink className="h-5 w-5" />
                        </a>
                    </div>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                    >
                        View Project →
                    </a>
                </div>
            </div>
        </div>
    );
};
