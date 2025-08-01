'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useNotification } from '../contexts/NotificationContext';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
    const portalRoot = useRef<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        portalRoot.current = document.getElementById('portal-root');
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            if (modalRef.current) {
                modalRef.current.focus();
            }
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

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
    const { showNotification } = useNotification();

    useEffect(() => {
        setIsMounted(true);
        emailjs.init('qz_99WqAXBiP0MXqJ');
        return () => setIsMounted(false);
    }, []);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^\+?[0-9\s\-()]{7,20}$/.test(phone.trim()) || phone.trim() === '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!privacyAccepted) {
            showNotification({
                status: 'error',
                message: 'Please accept the privacy policy to proceed.',
            });
            return;
        }
        if (!validateEmail(formData.email)) {
            showNotification({ status: 'error', message: 'Please enter a valid email address.' });
            return;
        }
        if (!validatePhone(formData.phone)) {
            showNotification({
                status: 'error',
                message: 'Please enter a valid phone number or leave it blank.',
            });
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
            showNotification({ status: 'success', message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            showNotification({
                status: 'error',
                message: 'Failed to send message. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (!isMounted || !portalRoot.current) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto backdrop-blur-lg"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    ref={modalRef}
                    tabIndex={-1}
                    // onClick={(e) => {
                    //     if (e.target === e.currentTarget) {
                    //         onClose();
                    //     }
                    // }}
                >
                    <motion.div className="relative w-full max-w-lg rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-blue-500">
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="relative z-10">
                            <button
                                onClick={onClose}
                                                                className="absolute top-4 right-4 rounded-full p-1.5 text-teal-600 transition-colors hover:text-teal-800"
                                aria-label="Close"
                            >
                                <FiX size={20} />
                            </button>
                            <div className="mb-6">
                                <h3 className="mb-3 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                                    Send a Message
                                </h3>
                                                                <p className="mb-6 text-sm text-gray-600">
                                    I&apos;ll get back to you as soon as possible!
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                                                                className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="company"
                                                                                className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="Your company name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                                                                className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                                                                className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                                                                className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="Tell me about your project, requirements, or any questions you have..."
                                        required
                                    />
                                </div>
                                <div className="flex gap-x-4">
                                    <label className="inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            checked={privacyAccepted}
                                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                                                                <div className="peer relative h-6 w-11 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
                                                                                <span className="ms-3 text-sm text-gray-600">
                                            By selecting this, you agree to our{' '}
                                            <a href="#" className="text-blue-600 hover:underline">
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
        </AnimatePresence>,
        portalRoot.current
    );
};
