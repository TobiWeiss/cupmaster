import { FC, useState, useEffect } from 'react';
import { Calendar, Users, Settings } from 'lucide-react';
import { easeInOut, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SmallText } from '../../../common/components/typography/Text';
import { Icon } from '../../../common/components/ui/Icon';

interface BottomNavigationProps {
  activeView: 'game-plan' | 'participants' | 'settings';
  onViewChange: (view: 'game-plan' | 'participants' | 'settings') => void;
}

export const BottomNavigation: FC<BottomNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  const { t } = useTranslation();
  const [previousView, setPreviousView] = useState(activeView);

  const navigationItems = [
    {
      id: 'game-plan',
      icon: Calendar,
      label: t('tournamentOperation.navigation.gamePlan'),
    },
    {
      id: 'participants',
      icon: Users,
      label: t('tournamentOperation.navigation.participants'),
    },
    {
      id: 'settings',
      icon: Settings,
      label: t('tournamentOperation.navigation.settings'),
    },
  ];

  // Get the index of a view in the navigation items
  const getViewIndex = (view: string) => navigationItems.findIndex(item => item.id === view);

  // Determine if we're moving left or right
  const isMovingRight = getViewIndex(activeView) > getViewIndex(previousView);

  // Update previous view when active view changes
  useEffect(() => {
    setPreviousView(activeView);
  }, [activeView]);

  return (
    <div className="fixed bottom-5 left-0 right-0 max-w-2xl mx-auto rounded-3xl bg-custom-primary-dark dark:bg-custom-primary-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-2">
          {navigationItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewChange(item.id as any)}
                className={`flex flex-col items-center px-8 py-2 rounded-lg ${
                  activeView === item.id
                    ? 'text-custom-secondary-light dark:text-custom-secondary-dark'
                    : 'text-custom-contrast-text-light dark:text-custom-contrast-text-dark'
                }`}
              >
                <Icon 
                color='text-custom-secondary-dark dark:text-custom-secondary-light'
                icon={item.icon} size="4xl" />
                <SmallText
                color='text-custom-secondary-dark dark:text-custom-secondary-light'
                >{item.label}</SmallText>
              </motion.button>
              {activeView === item.id && (
                <motion.div 
                  initial={{ 
                    x: isMovingRight ? -100 : 100 
                  }}
                  animate={{ 
                   
                    x: -30,
                    transition: { 
                      duration: 0.5, 
                     
                    } 
                  }}
                  exit={{ 
                    x: isMovingRight ? 100 : -100,
                    transition: { 
                      duration: 0.5,     
                    } 
                  }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-custom-secondary-dark dark:bg-custom-secondary-light rounded-t-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 