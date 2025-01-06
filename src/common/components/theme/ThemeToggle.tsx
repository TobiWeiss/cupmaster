import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Icon } from '../ui/Icon';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 px-4 py-2 rounded-md border border-custom-secondary bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Icon 
          icon={Sun} 
          size="base"
          className="text-custom-secondary-dark" 
        />
      ) : (
        <Icon 
          icon={Moon} 
          size="base"
          className="text-custom-secondary-light" 
        />
      )}
    </button>
  );
}; 