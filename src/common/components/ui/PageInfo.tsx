import { FC, useState } from 'react';
import { Card } from './Card';
import { Icon } from './Icon';
import { InfoIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { SmallText, SmallestText } from '../typography/Text';
import { motion, AnimatePresence } from 'framer-motion';

interface PageInfoProps {
  title: string;
  description: string;
  className?: string;
  defaultOpen?: boolean;
}

export const PageInfo: FC<PageInfoProps> = ({ 
  title, 
  description, 
  className = '',
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${className} overflow-hidden`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon={InfoIcon} size="base" />
            <SmallText className="text-start" data-testid="page-info-title">
              {title}
            </SmallText>
          </div>
          <Icon 
            icon={isOpen ? ChevronUp : ChevronDown} 
            size="base"
            className="transition-transform duration-200"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SmallestText className="mt-4">
              {description}
            </SmallestText>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
    </motion.div>
  );
}; 