import { useEffect, useState } from 'react';
import { CategoryItem } from './CategoryItem';


export type Category = 'basicInformation' | 'tournamentDates' | 'teams' | 'mode' | 'rules';

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
      {categories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          isCurrent={category === currentCategory}
          isCompleted={completedCategories.includes(category)}
          progress={categoryProgress[category]}
        />
      ))}
    </div>
  );
}; 