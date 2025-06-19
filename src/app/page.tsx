'use client';

import Head from 'next/head';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/app/home/page';
import { About } from '@/app/about/page';
import { Skills } from '@/app/services/page';
import Projects from '@/app/projects/page';
import { Contact } from '@/app/contact/page';
import { Footer } from '@/components/Footer';
import { ScrollFadeIn } from '@/app/hooks/ScrollFadeIn';
import siteData from '@/data/site-data';
import TeamCarousel from '@/app/team/page';

// This is the main page component that renders all sections of the portfolio.
// Each section is a separate component for better organization and maintainability.

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 to-purple-100 text-gray-800 transition-colors duration-300 dark:text-gray-200">
            <Head>
                <title>{siteData.personal.name} | Software Engineer</title>
                <meta name={siteData.personal.name} content={siteData.personal.name} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="sticky top-0 z-50 px-10 pt-2">
                <Navigation />
            </div>

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
                <ScrollFadeIn delay={3.5}>
                    <TeamCarousel />
                </ScrollFadeIn>
                <ScrollFadeIn delay={4}>
                    <Contact />
                </ScrollFadeIn>
            </main>

            <div className="bottom-0 px-10">
                <Footer />
            </div>
        </div>
    );
}
