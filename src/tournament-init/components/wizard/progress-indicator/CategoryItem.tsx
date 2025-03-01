import { SmallestText } from '../../../../common/components/typography/Text';
import { useTranslation } from 'react-i18next';
import { CategoryIcon } from './CategoryIcon';
import { CategoryProgressBar } from './CategoryProgressBar';
import { Category, CategoryProgress } from './CategoryIndicator';

interface CategoryItemProps {
  category: Category;
  isCurrent: boolean;
  isCompleted: boolean;
  progress?: CategoryProgress;
}

const CATEGORY_LABELS = {
  basicInformation: 'tournamentInit.creation.categories.basicInformation',
  tournamentDates: 'tournamentInit.creation.categories.tournamentDates',
  participants: 'tournamentInit.creation.categories.participants',
  mode: 'tournamentInit.creation.categories.mode',
  rules: 'tournamentInit.creation.categories.rules',
} as const;

export const CategoryItem = ({ 
  category, 
  isCurrent, 
  isCompleted, 
  progress 
}: CategoryItemProps) => {
  const { t } = useTranslation();


  return (
    <div
      className={`
        flex flex-1 flex-col p-4 rounded-lg transition-opacity duration-1500 ease-out shadow-md
        ${isCurrent || isCompleted ? 'opacity-100' : 'opacity-50'}
        border border-custom-secondary-light dark:border-custom-secondary-dark rounded-lg 
        ${isCompleted
          ? 'dark:bg-custom-secondary-light'
          : 'bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark'
        }
      `}
    >
      <div className="flex flex-1 justify-center items-center mb-2">
        <div className="flex items-center gap-3" data-testid={`wizard-category-item-${category}`}>
          <CategoryIcon 
            category={category}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            dataTestId={`wizard-category-completed-icon-${category}`}
          />
          <SmallestText 
            className={`
              text-custom-secondary-light dark:text-custom-secondary-dark
              ${isCompleted ? 'dark:text-custom-secondary-dark' : ''}
            `}
          >
            {t(CATEGORY_LABELS[category])}
          </SmallestText>
        </div>
      </div>

      {progress && isCurrent && (
        <CategoryProgressBar 
          current={progress.current} 
          total={progress.total} 
        />
      )}
    </div>
  );
}; 