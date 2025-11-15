"use client";

import { TeamCarouselComp } from "@/components/TeamCarouselComp";
import siteData from "@/data/site-data";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
        People I&apos;ve Worked With
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
        Some of the amazing people I&apos;ve had the pleasure to collaborate
        with
      </p>
      <TeamCarouselComp members={siteData.teamMembers || []} />
    </div>
  );
}
