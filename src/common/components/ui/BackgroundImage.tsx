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
            /style="fill:#F6F6F6;"/,
            `style="fill:${isDarkMode ? '#171717' : '#F0E7D8'};"`
          )
          .replace(
            /fill:#2D61C9/g,
            `fill:${isDarkMode ? '#ffffff' : '#171717'}`
          );

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
    <div className={`fixed bottom-0 right-0 w-[600px] h-[600px] transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {svgContent && (
        <div
          className="w-full h-full"
          style={{ 
            backgroundImage: `url("${svgContent}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
          }}
        />
      )}
    </div>
  );
}; 