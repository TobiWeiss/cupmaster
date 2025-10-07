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
    <div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900">
      {/* Diagonal Grid with Light */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Fixed header */}
      <header className="flex-none bg-custom-primary-light dark:bg-custom-primary-dark rounded-b-3xl shadow-md relative z-10">
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