'use client';

import About from '@/app/about/page';
import Contact from '@/app/contact/page';
import Home from '@/app/home/page';
import Projects from '@/app/projects/page';
import Skills from '@/app/services/page';
import TeamCarousel from '@/app/team/page';
import siteData from '@/data/site-data';
import Head from 'next/head';
import { EmailModal } from '@/components/EmailComp';
// import { Navigation } from '@/components/NavigationComp';
import { Footer } from '@/components/FooterComp';
import { ScrollFadeIn } from '@/hooks/ScrollFadeIn';
import { useState } from 'react';

// This is the main page component that renders all sections of the portfolio.
// Each section is a separate component for better organization and maintainability.

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen text-gray-800 transition-colors duration-300">
            <Head>
                <title>{siteData.personal.name} | Software Engineer</title>
                <meta name={siteData.personal.name} content={siteData.personal.name} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="fixed right-0 bottom-0 z-50 p-4 backdrop-blur-2xl">
                <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>

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

            <div className="bottom-0 px-10 pb-2">
                <Footer />
            </div>
        </div>
    );
}
