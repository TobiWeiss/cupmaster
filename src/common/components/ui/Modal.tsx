import { FC, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Icon } from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-custom-primary-light dark:bg-custom-primary-dark rounded-lg shadow-lg max-w-lg w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-custom-secondary-light dark:text-custom-secondary-dark hover:bg-custom-secondary-light/10 dark:hover:bg-custom-secondary-dark/10 rounded-full"
        >
          <Icon icon={X} size="sm" />
        </button>
        {children}
      </div>
    </div>
  );
}; 