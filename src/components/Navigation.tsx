"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import siteData from "@/data/site-data";

interface NavItem {
  id: string;
  label: string;
}

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // 100px from bottom
      
      let currentSection = 'home';

      // If we're at the bottom, always highlight contact
      if (isAtBottom) {
        currentSection = 'contact';
      } else {
        // Check each section to see if it's in view
        for (const item of navItems) {
          const element = document.getElementById(item.id);
          if (!element) continue;

          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.pageYOffset;
          const elementBottom = bottom + window.pageYOffset;

          // If the middle of the viewport is within this section
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSection = item.id;
            break;
          }
        }
      }

      // Only update if the active section has changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Set up scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check after a short delay to ensure all elements are loaded
    const timer = setTimeout(handleScroll, 100);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [navItems, activeSection]);
  
  // Handle initial hash URL if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleHash = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (navItems.some(item => item.id === hash)) {
          setActiveSection(hash);
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Run once on mount
    handleHash();
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      setIsMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", `#${id}`);
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b-2 border-teal-200 dark:border-teal-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <FaUserCircle className="w-6 h-6 text-current" />
              <span>{siteData.personal.name}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? "text-teal-600 dark:text-teal-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${
                activeSection === item.id
                  ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                  : "text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
