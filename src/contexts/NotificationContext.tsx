'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import NotificationModal from '../components/NotificationComp';

export type NotificationStatus = 'success' | 'error' | 'info';

interface Notification {
    status: NotificationStatus;
    message: string;
    timeout?: number;
}

interface NotificationContextType {
    showNotification: (notification: Notification) => void;
    notification: Notification | null;
    handleClose: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const showNotification = useCallback((notif: Notification) => {
        setNotification(notif);
    }, []);

    const handleClose = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification, notification, handleClose }}>
            {children}
            {notification && <NotificationModal />}
        </NotificationContext.Provider>
    );
};
