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

    const showConfirmation = (message: string) => {
        return new Promise((resolve) => {
          const toastId = toast(
            ({ closeToast }) => (
              <Warning message={message} onConfirm={() => {
                resolve(true);
                closeToast();
                toast.dismiss(toastId);
              }} onCancel={() => {
                resolve(false);
                closeToast();
                toast.dismiss(toastId);
              }} />
            ),
            {
              autoClose: false,
              closeOnClick: false,
              closeButton: false,
              position: NotificationPosition.TOP_RIGHT,
            }
          );
        });
      }

    return {showNotification, showConfirmation}
}