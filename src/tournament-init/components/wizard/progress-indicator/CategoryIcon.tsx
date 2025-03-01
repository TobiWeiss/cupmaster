import { BookA, Calendar, Check, Info, Settings, Users } from 'lucide-react';
import { Icon } from '../../../../common/components/ui/Icon';
import { Category } from './CategoryIndicator';
import { motion } from 'framer-motion';
import { BasicProps } from '../../../../common/types/BasicProps';

interface CategoryIconProps extends BasicProps {
  category: Category;
  isCompleted: boolean;
  isCurrent: boolean;
}

const CATEGORY_ICONS = {
  basicInformation: BookA,
  tournamentDates: Calendar,
  participants: Users,
  mode: Settings,
  rules: Info,
} as const;

export const CategoryIcon = ({ category, isCompleted, isCurrent, dataTestId }: CategoryIconProps) => {
  if (isCompleted && !isCurrent) {
    return (
      <div data-testid={dataTestId}>
        <motion.div
          initial={{ opacity: 0, transform: 'scale(0.5)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          transition={{ duration: 0.5 }}
        >
          <Icon icon={Check} size="base" className="text-green-800" />
        </motion.div>
      </div>
    );
  }

  const IconComponent = CATEGORY_ICONS[category];
  return <Icon icon={IconComponent} size="base" />;
}; 