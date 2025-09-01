'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import siteData from '../data/site-data';

export const NavigationComp = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const navItems = useMemo(
        () => [
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'services', label: 'Services' },
            { id: 'projects', label: 'Projects' },
            { id: 'team', label: 'Team' },
            { id: 'contact', label: 'Contact' },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            const isAtBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

            let currentSection = 'home';

            if (isAtBottom) {
                currentSection = 'contact';
            } else {
                for (const item of navItems) {
                    const element = document.getElementById(item.id);
                    if (!element) continue;

                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = top + window.pageYOffset;
                    const elementBottom = bottom + window.pageYOffset;

                    if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                        currentSection = item.id;
                        break;
                    }
                }
            }

            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems, activeSection]);

    const router = useRouter();
    const pathname = usePathname();

    const scrollToSection = (idOrRoute: string) => {
        // If we're not on the home page, navigate to home first with the section hash
        if (pathname !== '/') {
            const hash = idOrRoute === 'home' ? '' : `#${idOrRoute}`;
            router.push(`/${hash}`);
            return;
        }

        // If we're already on the home page, just scroll to the section
        const element = document.getElementById(idOrRoute);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
            window.history.pushState({}, '', `#${idOrRoute}`);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav
            className="relative mx-auto rounded-4xl border-1 border-purple-300 bg-purple-100/70 shadow-lg backdrop-blur"
            ref={navRef}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-center md:justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-purple-200 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Site name - centered on mobile, left on desktop */}
                    <div className="flex w-full items-center justify-center md:w-auto md:justify-start">
                        <div className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                            <span
                                onClick={() => {
                                    scrollToSection('home');
                                    setIsOpen(false);
                                }}
                                className="cursor-pointer bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent transition-opacity hover:opacity-80"
                            >
                                {siteData.personal.name}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-6 md:flex">
                        {navItems.map((item) => (
                            <span
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setIsOpen(false);
                                }}
                                className={`cursor-pointer text-sm font-medium transition-colors ${
                                    activeSection === item.id
                                        ? 'text-purple-600'
                                        : 'text-gray-700 hover:text-purple-600'
                                }`}
                            >
                                {item.label}
                            </span>
                        ))}
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`${
                            isOpen ? 'block' : 'hidden'
                        } absolute right-0 left-0 z-50 mt-2 rounded-2xl border-t-0 border-purple-100 bg-purple-100/70 py-2 shadow-lg backdrop-blur md:hidden`}
                        style={{ top: 'calc(100% - 2px)' }}
                    >
                        {navItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setIsOpen(false);
                                }}
                                className={`block cursor-pointer px-4 py-3 text-sm font-medium ${
                                    activeSection === item.id
                                        ? 'bg-white/50 text-purple-600'
                                        : 'text-gray-700 hover:bg-white/50 hover:text-purple-600'
                                }`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
