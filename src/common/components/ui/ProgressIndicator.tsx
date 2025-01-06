import { FC } from 'react';

interface ProgressIndicatorProps {
  total: number;
  current: number;
  completed: boolean;
}

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({ 
  total, 
  current, 
  completed 
}) => {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-2 w-16 rounded-full bg-gray-400 dark:bg-gray-700 overflow-hidden"
        >
          <div
            className={`
              h-full rounded-full transition-all duration-1000 ease-out
              ${index === current
                ? 'bg-custom-third'
                : index < current
                  ? 'bg-custom-fourth w-full'
                  : 'w-0'
              }
              ${index === current && !completed ? 'w-0' : 'w-full'}
            `}
          />
        </div>
      ))}
    </div>
  );
}; 