import React from 'react';
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <div className="relative inline-block text-left">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark focus:outline-none focus:ring-2 focus:ring-custom-third text-custom-secondary-light dark:text-custom-secondary-dark h-[38px] w-[70px] text-center"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-center">
            {lang.code.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};