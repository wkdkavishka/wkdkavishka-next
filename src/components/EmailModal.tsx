'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex h-screen w-screen items-center justify-center overflow-y-auto backdrop-blur-lg" // appear in the middle seperate from the main page floating
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 20,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="relative z-[10000] w-full max-w-lg rounded-2xl border border-teal-100/50 bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl dark:border-teal-900/50 dark:bg-gray-800/95"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-teal-600 transition-colors hover:bg-teal-100/50 hover:text-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-300"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
            <div className="mb-6">
              <h3 className="mb-3 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                Send a Message
              </h3>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                I&apos;ll get back to you as soon as possible!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
                  placeholder="Hi there! I'd love to chat about..."
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={!formData.name || !formData.email || !formData.message}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Send Message</span>
                <FiSend className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
