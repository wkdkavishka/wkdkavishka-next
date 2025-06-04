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

  const navItems = useMemo<NavItem[]>(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Projects" },
      { id: "team", label: "People" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      let currentSection = "home";

      if (isAtBottom) {
        currentSection = "contact";
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", `#${id}`);
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b-2 border-teal-200 dark:border-teal-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
              <FaUserCircle className="w-6 h-6 text-current" />
              <span>{siteData.personal.name}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <span
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium cursor-pointer transition-all duration-300 ease-out ${
                  activeSection === item.id
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
