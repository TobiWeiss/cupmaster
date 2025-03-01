import { CategoryItem } from './CategoryItem';
import { easeInOut, motion } from 'motion/react';


export type Category = 'basicInformation' | 'tournamentDates' | 'participants' | 'mode' | 'rules';

export interface CategoryProgress {
  current: number;
  total: number;
}

export interface CategoryIndicatorProps {
  categories: Category[];
  currentCategory: Category;
  completedCategories: Category[];
  categoryProgress: {
    [key in Category]?: CategoryProgress;
  };
}


export const CategoryIndicator = ({
  categories,
  currentCategory,
  completedCategories,
  categoryProgress
}: CategoryIndicatorProps) => {


  return (
    <div className="flex flex-1 flex-col gap-4 w-64">
      {categories.map((category, index) => (
       <motion.div initial={{ y: -200, opacity: 0 }}
       animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.5, ease: easeInOut } }}
       exit={{ y: -200, opacity: 0, transition: { delay: 0.3 + index * 0.5, ease: easeInOut } }} className='flex flex-1 flex-col items-stretch justify-center'>
          <CategoryItem
            key={category}
            category={category}
            isCurrent={category === currentCategory}
            isCompleted={completedCategories.includes(category)}
            progress={categoryProgress[category]}
          />
        </motion.div>
      ))}
    </div>
  );
}; 