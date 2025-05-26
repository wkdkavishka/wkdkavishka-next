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
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 transform hover:scale-105"
            >
              <FaUserCircle className="w-6 h-6 text-current" />
              <span>{siteData.personal.name}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ease-out ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-teal-500 to-teal-600 shadow-xl shadow-teal-500/30 transform -translate-y-0.5 scale-105 dark:from-teal-600 dark:to-teal-700 dark:shadow-teal-700/30'
                      : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 hover:bg-white hover:shadow-lg hover:shadow-gray-300/30 dark:hover:bg-gray-700/80 dark:hover:shadow-gray-800/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Cloud puff effect */}
                  <span className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                {/* Subtle glow effect */}
                <span 
                  className={`absolute -bottom-1 left-1/2 w-3/4 h-3 bg-teal-400/30 dark:bg-teal-600/30 rounded-full blur-md transition-all duration-500 transform -translate-x-1/2 scale-90 ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-2'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100 top-3'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 dark:from-teal-600 dark:to-teal-700'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
