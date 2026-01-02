import { FC } from 'react';
import { Card } from '../../../common/components/ui/Card';
import { SmallestText, SmallText } from '../../../common/components/typography/Text';
import { IGame } from '../../types/game-plan/Game';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../common/utils/dateUtils';
import { Icon } from '../../../common/components/ui/Icon';
import { Clock, MapPin } from 'lucide-react';
import { IKnockoutGame, KnockoutGameRuleType, PlacementInGroupRule, WinnerOfGameRule, LoserOfGameRule } from '../../types/game-plan/KnockoutGame';
import { IGroup } from '../../types/game-plan/Group';

interface KnockoutGameItemProps {
  game: IGame;
  knockoutGame: IKnockoutGame;
  groups?: IGroup[] | null;
  allGames?: IGame[];
}

export const KnockoutGameItem: FC<KnockoutGameItemProps> = ({ game, knockoutGame, groups, allGames }) => {
  const { t } = useTranslation();

  // Helper function to format rule text
  const formatRuleText = (rule: any): string => {
    if (!rule) return '';
    
    const ruleType = rule.getType();
    
    if (ruleType === KnockoutGameRuleType.PLACEMENT_IN_GROUP) {
      const placementRule = rule as PlacementInGroupRule;
      const groupId = placementRule.getGroupId();
      const place = placementRule.getPlace();
      
      // Find group name
      const group = groups?.find(g => g.getId() === groupId);
      const groupIndex = groups?.findIndex(g => g.getId() === groupId) ?? -1;
      const groupName = group?.getName() || t('tournamentOperation.gamePlan.groups.defaultName', { number: groupIndex !== -1 ? groupIndex + 1 : 1 });
      
      return t('tournamentOperation.gamePlan.knockoutRules.placementInGroup', { 
        place, 
        groupName 
      });
    } else if (ruleType === KnockoutGameRuleType.WINNER_OF_GAME) {
      const winnerRule = rule as WinnerOfGameRule;
      const gameId = winnerRule.getGameId();
      
      // Find game index
      const referencedGameIndex = allGames?.findIndex(g => g.getId() === gameId);
      const gameNumber = referencedGameIndex !== undefined && referencedGameIndex !== -1 ? referencedGameIndex + 1 : '?';
      
      return t('tournamentOperation.gamePlan.knockoutRules.winnerOfGame', { gameNumber });
    } else if (ruleType === KnockoutGameRuleType.LOSER_OF_GAME) {
      const loserRule = rule as LoserOfGameRule;
      const gameId = loserRule.getGameId();
      
      // Find game index
      const referencedGameIndex = allGames?.findIndex(g => g.getId() === gameId);
      const gameNumber = referencedGameIndex !== undefined && referencedGameIndex !== -1 ? referencedGameIndex + 1 : '?';
      
      return t('tournamentOperation.gamePlan.knockoutRules.loserOfGame', { gameNumber });
    }
    
    return '';
  };

  const firstParticipantText = formatRuleText(knockoutGame.getRuleForFirstParticipant());
  const secondParticipantText = formatRuleText(knockoutGame.getRuleForSecondParticipant());

  return (
    <Card className="flex px-10">
      {/* Top Row as Grid Layout */}
      <div className="grid grid-cols-10 items-center my-0">
        {/* Time */}
        <div className="col-span-5 flex items-center">
          <Icon className='mr-2' size="sm" icon={Clock} />
          <SmallestText dataTestId={`game-time-${game.getId()}`}>
            {formatDate(game.getStartTime())}
          </SmallestText>
        </div>

        {/* Field */}
        <div className="col-span-5 flex items-center justify-end">
          <Icon className='mr-2' size="sm" icon={MapPin} />
          <SmallestText dataTestId={`field-name-${game.getId()}`}>
            {game.getFieldName()}
          </SmallestText>
        </div>
      </div>

      {/* Participants and Score in Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-9 items-center justify-items-center mx-0 lg:mx-10 xl:mx-80">
        {/* First participant */}
        <div className="col-span-4 flex items-center justify-center min-w-0">
          <SmallText dataTestId={`first-participant-name-${game.getId()}`} className="truncate mr-2">
            {firstParticipantText}
          </SmallText>
        </div>

        {/* Score */}
        <div className="flex items-center justify-center">
          <SmallestText className="font-bold">
            {game.getStatus() === 'PLANNED' ? '-' : `${game.getFirstParticipantScore()} - ${game.getSecondParticipantScore()}`}
          </SmallestText>
        </div>

        {/* Second participant */}
        <div className="col-span-4 flex items-center justify-center min-w-0">
          <SmallText dataTestId={`second-participant-name-${game.getId()}`} className="truncate">
            {secondParticipantText}
          </SmallText>
        </div>
      </div>
    </Card>
  );
};

