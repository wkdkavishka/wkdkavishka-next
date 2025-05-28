"use client";

import Head from "next/head";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import siteData from "@/data/site-data";

// This is the main page component that renders all sections of the portfolio.
// Each section is a separate component for better organization and maintainability.

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Head>
        <title>{siteData.personal.name} | Software Engineer</title>
        <meta name={siteData.personal.name} content={siteData.personal.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <main>
        <ScrollFadeIn>
          <Hero />
        </ScrollFadeIn>
        <ScrollFadeIn delay={1}>
          <About />
        </ScrollFadeIn>
        <ScrollFadeIn delay={2}>
          <Skills />
        </ScrollFadeIn>
        <ScrollFadeIn delay={3}>
          <Projects />
        </ScrollFadeIn>
        <ScrollFadeIn delay={4}>
          <Contact />
        </ScrollFadeIn>
      </main>
      <Footer />
    </div>
  );
}
