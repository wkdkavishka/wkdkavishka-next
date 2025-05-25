"use client";

import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";

export default function ExamplesPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Scroll Animations
      </h1>

      <div className="space-y-12">
        {[1, 2, 3, 4, 5].map((item) => (
          <ScrollFadeIn
            key={item}
            className="p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg"
            delay={item}
          >
            <h2 className="text-2xl font-semibold mb-4">Section {item}</h2>
            <p className="text-gray-400">
              This section will fade in as you scroll down the page. Each
              section has a staggered delay to create a smooth, modern feel.
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
