import { Outlet, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Logo } from '../ui/Logo';

export const MainLayout = () => {
  const navigate = useNavigate();

  const goToInitPage = () => {
    navigate('/tournament-init', { replace: true });
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-custom-primary-light dark:bg-custom-primary-dark">
      {/* Fixed header */}
      <header className="flex-none bg-custom-primary-light dark:bg-custom-primary-dark rounded-b-3xl shadow-md">
        <div className="max-w-8xl px-20 mx-auto flex justify-between items-center py-3">
          <Logo onClick={goToInitPage} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Scrollable content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-100 dark:opacity-100"
          style={{
            backgroundImage: 'url(/src/common/assets/images/bg-light.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Scrollable main content */}
        <main className="h-full overflow-auto relative z-10">
          <div className="max-w-8xl mx-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};