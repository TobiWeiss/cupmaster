import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { NotificationPosition, NotificationType } from "../types/NotifficationTypes";
import { Warning } from "../components/ui/notifications/Warning";

export const useNotify = () => {
    const showNotification = (message: string, type: NotificationType, position = NotificationPosition.TOP_RIGHT) => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        toast(message, {
            type: type,
            position: position,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: isDarkMode ? 'dark' : 'light',

        });
    }

    const showConfirmation = (message: string, onConfirm: () => void, onCancel: () => void) => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        toast.warning(<Warning message={message} onConfirm={onConfirm} onCancel={onCancel} />, {
            position: NotificationPosition.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: isDarkMode ? 'dark' : 'light',
        });
    }

    return {showNotification, showConfirmation}
}