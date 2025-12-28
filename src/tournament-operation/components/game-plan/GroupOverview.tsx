import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../common/components/ui/Card';
import { Icon } from '../../../common/components/ui/Icon';
import { SmallText, SmallestText } from '../../../common/components/typography/Text';
import { IGroup } from '../../types/game-plan/Group';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';

interface GroupOverviewProps {
  groups: IGroup[] | null;
}

export const GroupOverview: FC<GroupOverviewProps> = ({ groups }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  if (!groups || groups.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card className="overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left focus:outline-none"
          data-testid="group-overview-toggle"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon={Users} size="base" />
              <SmallText className="text-start font-bold" data-testid="group-overview-title">
                {t('tournamentOperation.gamePlan.groups.title')}
              </SmallText>
            </div>
            <Icon
              icon={isOpen ? ChevronUp : ChevronDown}
              size="base"
              className="transition-transform duration-200"
            />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groups.map((group, groupIndex) => (
                  <motion.div
                    key={group.getId()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.1 }}
                    data-testid={`group-${group.getId()}`}
                  >
                    <Card className="p-4 h-full">
                      <div className="mb-3">
                        <SmallText className="font-bold" data-testid={`group-name-${group.getId()}`}>
                          {group.getName() || t('tournamentOperation.gamePlan.groups.defaultName', { number: groupIndex + 1 })}
                        </SmallText>
                      </div>
                      <div className="flex flex-col gap-3">
                        {group.getParticipants().map((participant) => (
                          <div
                            key={participant.getId()}
                            className="flex items-center gap-3"
                            data-testid={`participant-${participant.getId()}`}
                          >
                            {participant.getLogo() ? (
                              <img
                                src={participant.getLogo()}
                                alt={participant.getName()}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                data-testid={`participant-logo-${participant.getId()}`}
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center flex-shrink-0">
                                <Users size={16} className="text-custom-secondary-light dark:text-custom-secondary-dark" />
                              </div>
                            )}
                            <SmallestText className="truncate" data-testid={`participant-name-${participant.getId()}`}>
                              {participant.getName()}
                            </SmallestText>
                          </div>
                        ))}
                      </div>
                      {group.getParticipants().length === 0 && (
                        <SmallestText className="text-custom-secondary-light dark:text-custom-secondary-dark italic">
                          {t('tournamentOperation.gamePlan.groups.noParticipants')}
                        </SmallestText>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

