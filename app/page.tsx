"use client";

import { useEffect, useState } from "react";
import About from "@/app/about/page";
import Contact from "@/app/contact/page";
import Home from "@/app/home/page";
import Projects from "@/app/projects/page";
import Skills from "@/app/services/page";
import TeamCarousel from "@/app/team/page";
import { EmailModal } from "@/components/EmailComp";
import { ScrollFadeIn } from "@/hooks/ScrollFadeIn";

// This is the main page component that renders all sections of the portfolio.
// Each section is a separate component for better organization and maintainability.

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen text-gray-800 transition-colors duration-300"
      suppressHydrationWarning
    >
      <div className="fixed right-0 bottom-0 z-50 p-4 backdrop-blur-2xl">
        <EmailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {isMounted && (
        <main>
          <section id="home">
            <ScrollFadeIn>
              <Home />
            </ScrollFadeIn>
          </section>
          <section id="about">
            <ScrollFadeIn delay={1}>
              <About />
            </ScrollFadeIn>
          </section>
          <section id="services">
            <ScrollFadeIn delay={2}>
              <Skills />
            </ScrollFadeIn>
          </section>
          <section id="projects">
            <ScrollFadeIn delay={2}>
              <Projects />
            </ScrollFadeIn>
          </section>
          <section id="team">
            <ScrollFadeIn delay={2}>
              <TeamCarousel />
            </ScrollFadeIn>
          </section>
          <section id="contact">
            <ScrollFadeIn delay={2}>
              <Contact />
            </ScrollFadeIn>
          </section>
        </main>
      )}
    </div>
  );
}
