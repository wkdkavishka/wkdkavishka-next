"use client";

import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import siteData from "@/data/site-data";
import { EmailModal } from "./EmailModal";

export const Contact = () => {
  const { socialLinks } = siteData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailSubmit = (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    const recipientEmail = process.env.NEXT_PUBLIC_EMAIL;
    const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll get back to you as soon as
          possible!
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <FiMail className="mr-2" />
          Say Hello
        </button>
        <div className="mt-12 flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={social.name}
            >
              {React.createElement(social.icon, { size: 24 })}
            </a>
          ))}
        </div>
      </div>
      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />
    </section>
  );
};
