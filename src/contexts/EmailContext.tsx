'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { EmailModal } from '../components/EmailComp';

interface EmailContextType {
    showEmailModal: () => void;
    isEmailModalOpen: boolean;
    handleClose: () => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const useEmail = () => {
    const context = useContext(EmailContext);
    if (!context) {
        throw new Error('useEmail must be used within an EmailProvider');
    }
    return context;
};

export const EmailProvider = ({ children }: { children: ReactNode }) => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const showEmailModal = useCallback(() => {
        setIsEmailModalOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsEmailModalOpen(false);
    }, []);

    return (
        <EmailContext.Provider value={{ showEmailModal, isEmailModalOpen, handleClose }}>
            {children}
            {isEmailModalOpen && <EmailModal isOpen={isEmailModalOpen} onClose={handleClose} />}
        </EmailContext.Provider>
    );
};
