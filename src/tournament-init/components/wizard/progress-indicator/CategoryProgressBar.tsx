interface CategoryProgressBarProps {
  current: number;
  total: number;
}

export const CategoryProgressBar = ({ current, total }: CategoryProgressBarProps) => (
  <div className="flex justify-center gap-2">
    {Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        className="h-2 w-16 rounded-full bg-gray-400 dark:bg-gray-700 overflow-hidden"
      >
        <div
          className={`
            h-full rounded-full transition-all duration-1000 ease-out
            ${index <= current
                ? 'bg-custom-fourth w-full'
                : 'w-0'
            }
          `}
        />
      </div>
    ))}
  </div>
);