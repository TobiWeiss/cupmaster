import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/background.svg'; 

export const BackgroundImage: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateSvgColors = async () => {
      try {
        setIsVisible(false);
        await new Promise(resolve => setTimeout(resolve, 150));

        const response = await fetch(logo);
        const svgText = await response.text();
        const isDarkMode = document.documentElement.classList.contains('dark');

        const updatedSvg = svgText
          .replace(
            /style="fill:#FFFFFF;"/,
            `style="fill:${isDarkMode ? '#171717' : '#F0E7D8'};"`
          )
          .replace(
            /fill:#2D61C9/g,
            `fill:${isDarkMode ? '#ffffff' : '#171717'}`
          );

        // Encode the SVG for use in CSS url()
        const encodedSvg = encodeURIComponent(updatedSvg);
        setSvgContent(`data:image/svg+xml,${encodedSvg}`);
        setIsVisible(true);
      } catch (error) {
        console.error('Error loading SVG:', error);
        setIsVisible(true);
      }
    };

    updateSvgColors();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateSvgColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`w-full h-full transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {svgContent ? (
        <div
          className="w-full h-full"
          style={{ 
            backgroundImage: `url("${svgContent}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
      ) : (
        <img
          src={logo}
          alt="Footballer illustration"
          className="w-full h-full object-contain dark:opacity-5"
        />
      )}
    </div>
  );
}; 