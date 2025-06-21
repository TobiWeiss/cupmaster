import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import helpAnimation from '../../assets/animations/help.json';
import { Modal } from './Modal';
import { MainHeading, SmallText } from '../typography/Text';

interface HelpProps {
  title?: string;
  explanation: string;
  size?: 'sm' | 'base' | 'lg';
}

export const Help = ({ title, explanation, size = 'base' }: HelpProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationData, setAnimationData] = useState(helpAnimation);

  const sizeStyles = {
    sm: 'w-6 h-6',
    base: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  useEffect(() => {
    const updateColors = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const newAnimationData = JSON.parse(JSON.stringify(helpAnimation));

      const updateLayerColors = (layer: any) => {
        // Handle expressions
        if (layer.ef) {
          layer.ef.forEach((effect: any) => {
            if (effect.nm === 'Primary' && effect.ef) {
              effect.ef.forEach((prop: any) => {
                
                if (prop.nm === 'Color') {
                  prop.v.k = isDarkMode 
                    ? [204, 204, 204, 1] // Light color for dark mode
                    : [0, 0, 0, 1];   // Dark color for light mode
                }
              });
            }
          });
        }

        // Process nested layers
        if (layer.layers) {
          layer.layers.forEach(updateLayerColors);
        }
      };

      // Process main layers and assets
      if (newAnimationData.layers) {
        newAnimationData.layers.forEach(updateLayerColors);
      }
      if (newAnimationData.assets) {
        newAnimationData.assets.forEach((asset: any) => {
          if (asset.layers) {
            asset.layers.forEach(updateLayerColors);
          }
        });
      }

      setAnimationData(newAnimationData);
    };

    updateColors();
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors();
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
    <>
      <div 
        className={`cursor-pointer ${sizeStyles[size]}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-6">
          {title && <MainHeading className="mb-4">{title}</MainHeading>}    
          <SmallText>{explanation}</SmallText>
        </div>
      </Modal>
    </>
  );
}; 