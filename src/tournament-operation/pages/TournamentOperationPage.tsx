import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GamePlanOverview } from '../components/game-plan/GamePlanOverview';
import { ParticipantSettings } from '../components/participant-settings/ParticipantSettings';
import { TournamentSettings as TournamentSettings } from '../components/tournament-settings/TournamentSettings';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { useTournamentOperations } from '../hooks/useTournamentOperations';

type TabType = 'game-plan' | 'participants' | 'settings';

export const TournamentOperationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('game-plan');
  
  const {
    tournament,
    gamePlan,
    tournamentLoading,
    gamePlanLoading,
    handleParticipantChange,
    handleSettingsChange,
    handleGameReorder,
  } = useTournamentOperations(id);

  if (tournamentLoading || gamePlanLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading tournament...</p>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Tournament not found</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'game-plan':
        return (
          <GamePlanOverview
            gamePlan={gamePlan}
            onReorderGames={handleGameReorder}
          />
        );
      case 'participants':
        return (
          <ParticipantSettings
            tournament={tournament}
            onSave={handleParticipantChange}
          />
        );
      case 'settings':
        return (
          <TournamentSettings
            tournament={tournament}
            onSave={handleSettingsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="flex-1 container mx-auto px-4 py-8">
        {renderContent()}
      </div>
      <BottomNavigation
        activeView={activeTab}
        onViewChange={setActiveTab}
      />
    </div>
  );
}; 