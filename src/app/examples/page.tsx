'use client';

import { ScrollFadeIn } from '@/app/hooks/ScrollFadeIn';

export default function ExamplesPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="mb-12 text-center text-4xl font-bold">Scroll Animations</h1>

      <div className="space-y-12">
        {[1, 2, 3, 4, 5].map((item) => (
          <ScrollFadeIn
            key={item}
            className="rounded-lg border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm"
            delay={item}
          >
            <h2 className="mb-4 text-2xl font-semibold">Section {item}</h2>
            <p className="text-gray-400">
              This section will fade in as you scroll down the page. Each section has a staggered
              delay to create a smooth, modern feel.
            </p>
          </ScrollFadeIn>
        ))}
      </div>

      <div className="mt-16 text-center text-sm text-gray-500">
        <p>Scroll down to see the fade-in animations in action!</p>
      </div>
    </div>
  );
}
