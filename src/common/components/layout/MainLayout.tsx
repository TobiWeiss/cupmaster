import { Outlet } from 'react-router-dom';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Logo } from '../ui/Logo';
import { BackgroundImage } from '../ui/BackgroundImage';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-custom-primary-light dark:bg-custom-primary-dark relative overflow-hidden">
      <header className="bg-custom-fourth-400 p-4 relative z-10 shadow-md dark:shadow-neutral-100">
        <div className="max-w-8xl px-20 mx-auto flex justify-between items-center" >
          <Logo />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-8xl mx-auto p-4 relative z-10">
        <Outlet />
      </main>
      <div className="absolute object-cover bottom-0 right-0 w-1/2 h-1/2 pointer-events-none z-0">
        <BackgroundImage />
      </div>
    </div>
  );
};