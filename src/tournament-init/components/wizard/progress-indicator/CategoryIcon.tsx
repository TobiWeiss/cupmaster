import { Calendar, Check, Info, Settings, Users } from 'lucide-react';
import { Icon } from '../../../../common/components/ui/Icon';
import { Category } from './CategoryIndicator';
import { motion } from 'framer-motion';

interface CategoryIconProps {
  category: Category;
  isCompleted: boolean;
  isCurrent: boolean;
}

const CATEGORY_ICONS = {
  basicInformation: Info,
  tournamentDates: Calendar,
  teams: Users,
  mode: Settings,
  rules: Info,
} as const;

export const CategoryIcon = ({ category, isCompleted, isCurrent }: CategoryIconProps) => {
  if (isCompleted && !isCurrent) {
    return (
      <motion.div 
        initial={{ opacity: 0, transform: 'scale(0.5)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        transition={{ duration: 0.5 }}
      >
        <Icon icon={Check} size="base" className="text-green-800" />
      </motion.div>
    );
  }

  const IconComponent = CATEGORY_ICONS[category];
  return <Icon icon={IconComponent} size="base" />;
}; 