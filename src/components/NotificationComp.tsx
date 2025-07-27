import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';

const NotificationModal: React.FC = () => {
    const { notification, handleClose } = useNotification();
    const status = notification?.status;
    const message = notification?.message;
    const timeout = notification?.timeout ? notification.timeout : 5000;

    useEffect(() => {
        if (notification && timeout && timeout > 0) {
            const timer = setTimeout(handleClose, timeout);
            return () => clearTimeout(timer);
        }
    }, [notification, timeout, handleClose]);

    if (!notification) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`fixed top-10 right-6 z-[99999] flex items-center gap-3 rounded-lg px-6 py-4 shadow-lg ring-1 ${
                    status === 'success'
                                                ? 'bg-green-50 text-green-600 ring-green-400/20'
                        : status === 'error'
                                                    ? 'bg-red-50 text-red-600 ring-red-400/20'
                                                    : 'bg-blue-50 text-blue-600 ring-blue-400/20'
                }`}
                style={{ minWidth: 260 }}
            >
                <span>
                    {status === 'success' && (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.15" />
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 13l3 3 7-7"
                            />
                        </svg>
                    )}
                    {status === 'error' && (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.15" />
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 8l8 8M16 8l-8 8"
                            />
                        </svg>
                    )}
                    {status === 'info' && (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.15" />
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
                <span className="font-medium">{message}</span>
                <button
                    onClick={handleClose}
                                        className="ml-2 rounded-full p-1 text-inherit hover:bg-gray-100"
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
        </AnimatePresence>
    );
};

export default NotificationModal;
