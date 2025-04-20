import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock tournament hook
vi.mock('./tournament-init/hooks/useTournaments', () => ({
  useTournaments: () => ({
    tournaments: [],
    isLoading: false,
    error: null
  })
}));

describe('App', () => {
  it('renders the home page by default', () => {
    render(<App />);
    
    // Verify create tournament card is present
    expect(screen.getByText('tournamentInit.home.createTournament.title')).toBeInTheDocument();
  });

  it('renders within the MainLayout', () => {
    render(<App />);
    
    // Verify main layout wrapper is present
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('is possible to toggle the theme', () => {
    render(<App />);

    const themeToggle = screen.getByTestId('theme-toggle');
    fireEvent.click(themeToggle);
    
    // expect the document to have the class dark
    expect(document.documentElement).toHaveClass('dark');

    // click the theme toggle again
    fireEvent.click(themeToggle);

    // expect the document to have the class light
    expect(document.documentElement).not.toHaveClass('dark');
  })
}); 