"use client";

import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { useEmail } from "@/contexts/EmailContext";
import siteData from "@/data/site-data";

export default function ContactPage() {
  const { showEmailModal } = useEmail();
  const { socialLinks } = siteData;

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Get In Touch
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg font-bold text-gray-600">
          {siteData.personal.getInTouch}
        </p>
        <div className="mx-auto mb-8 flex max-w-md flex-col space-y-4 text-lg">
          <a
            href={`mailto:${siteData.personal.email}`}
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <FiMail className="mr-2" />
            {siteData.personal.email}
          </a>
          <a
            href={`tel:${siteData.personal.phone}`}
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <FiPhone className="mr-2" />
            {siteData.personal.phone}
          </a>
        </div>
        <button
          type="button"
          onClick={showEmailModal}
          className="inline-flex transform items-center rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white transition-opacity hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
        >
          <FiMail className="mr-2" />
          Send Mail
        </button>
        <div className="mt-12 flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 transition-colors hover:text-blue-600"
              aria-label={social.name}
            >
              {React.createElement(social.icon, { size: 30 })}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
