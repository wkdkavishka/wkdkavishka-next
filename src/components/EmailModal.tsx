'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
    });
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [notification, setNotification] = useState<null | {
        type: 'success' | 'error' | 'info';
        message: string;
    }>(null);

    useEffect(() => {
        setIsMounted(true);
        // Initialize EmailJS
        emailjs.init('qz_99WqAXBiP0MXqJ');
        return () => setIsMounted(false);
    }, []);

    const validateEmail = (email: string) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const validatePhone = (phone: string) => {
        // Accepts numbers, spaces, dashes, parentheses, and optional leading +
        return /^\+?[0-9\s\-()]{7,20}$/.test(phone.trim()) || phone.trim() === '';
    };

    const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!privacyAccepted) {
            showNotification('error', 'Please accept the privacy policy to proceed.');
            return;
        }
        if (!validateEmail(formData.email)) {
            showNotification('error', 'Please enter a valid email address.');
            return;
        }
        if (!validatePhone(formData.phone)) {
            showNotification('error', 'Please enter a valid phone number or leave it blank.');
            return;
        }

        try {
            setIsSubmitting(true);

            const templateParams = {
                full_name: formData.name,
                from_email: formData.email,
                company_name: formData.company,
                phone: formData.phone,
                message: formData.message,
                to_email: 'w.k.d.kavishka@outlook.com',
            };

            await emailjs.send(
                'service_y9ix33i',
                'template_e1c3rv8',
                templateParams,
                'qz_99WqAXBiP0MXqJ'
            );

            setFormData({ name: '', email: '', company: '', phone: '', message: '' });
            setPrivacyAccepted(false);
            showNotification('success', 'Message sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            showNotification('error', 'Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
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
        <>
            {/* Notification popup (replaces old success toast) */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`fixed top-10 right-6 z-[99999] flex items-center gap-3 rounded-lg px-6 py-4 shadow-lg ring-1 ${
                            notification.type === 'success'
                                ? 'bg-green-50 text-green-600 ring-green-400/20 dark:bg-green-900 dark:text-green-400'
                                : notification.type === 'error'
                                  ? 'bg-red-50 text-red-600 ring-red-400/20 dark:bg-red-900 dark:text-red-400'
                                  : 'bg-blue-50 text-blue-600 ring-blue-400/20 dark:bg-blue-900 dark:text-blue-400'
                        } `}
                        style={{ minWidth: 260 }}
                    >
                        <span>
                            {notification.type === 'success' && (
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="currentColor"
                                        fillOpacity="0.15"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 13l3 3 7-7"
                                    />
                                </svg>
                            )}
                            {notification.type === 'error' && (
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="currentColor"
                                        fillOpacity="0.15"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 8l8 8M16 8l-8 8"
                                    />
                                </svg>
                            )}
                            {notification.type === 'info' && (
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="12"
                                        fill="currentColor"
                                        fillOpacity="0.15"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 8v4m0 4h.01"
                                    />
                                </svg>
                            )}
                        </span>
                        <span className="font-medium">{notification.message}</span>
                        <button
                            onClick={() => setNotification(null)}
                            className="ml-2 rounded-full p-1 text-inherit hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Close notification"
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 6l6 6M12 6l-6 6"
                                />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-screen w-screen items-center justify-center overflow-y-auto p-4"
                        onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="group relative w-full max-w-lg transform rounded-xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-2xl hover:ring-2 hover:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 rounded-full p-1.5 text-teal-600 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
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
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white"
                                            placeholder="Your company name"
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
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white"
                                            placeholder="+1 (555) 000-0000"
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
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white"
                                            placeholder="Tell me about your project, requirements, or any questions you have..."
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-x-4">
                                        <label className="inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                checked={privacyAccepted}
                                                onChange={(e) =>
                                                    setPrivacyAccepted(e.target.checked)
                                                }
                                                className="peer sr-only"
                                            />
                                            <div className="peer relative h-6 w-11 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                                            <span className="ms-3 text-sm text-gray-600 dark:text-gray-300">
                                                By selecting this, you agree to our{' '}
                                                <a
                                                    href="#"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    privacy policy
                                                </a>
                                                .
                                            </span>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
