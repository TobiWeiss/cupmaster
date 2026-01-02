export const en = {
  translation: {
    common: {
      create: 'Create',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Error',
      add: 'Add',
      noItems: 'No items yet',
    },
    tournament: {
      name: 'Tournament Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      format: 'Tournament Format',
      formats: {
        league: 'League (All Teams in One Group)',
        groupKnockout: 'Group Stage + Knockout Rounds',
        knockout: 'Knockout Only',
      },
      status: {
        notStarted: 'Not Started',
        inProgress: 'In Progress',
        completed: 'Completed',
      },
      config: {
        formatConfig: 'Format Configuration',
        matchesAgainstEach: 'Matches Against Each Team',
        pointsForWin: 'Points for Win',
        pointsForDraw: 'Points for Draw',
        tiebreakers: 'Tiebreakers Order',
        numberOfGroups: 'Number of Groups',
        teamsPerGroup: 'Teams per Group',
        teamsQualifying: 'Teams Qualifying per Group',
        qualificationMode: 'Qualification Mode',
        knockoutMatches: 'Knockout Matches',
        awayGoalsRule: 'Away Goals Rule',
        extraTime: 'Extra Time',
        penalties: 'Penalties',
        thirdPlace: 'Third Place Match',
      },
    },
    home: {
      title: 'Football Tournament Manager',
      subtitle: 'Create and manage your football tournaments',
      createTournament: {
        title: 'Create Tournament',
        description: 'Start a new tournament with custom settings',
      },
      editTournament: {
        title: 'Edit Tournament',
        description: 'Manage your existing tournaments',
        noTournaments: 'No tournaments available',
      },
      tournamentList: {
        title: 'Your Tournaments',
      },
    },
    tournamentManagement: {
      creation: {
        teams: {
          empty: 'No teams added yet',
          namePlaceholder: 'Enter team name',
        }
      }
    },
    tournamentInit: {
      categories: {
        basicInformation: 'Basic Information',
        tournamentDates: 'Tournament Dates',
        teams: 'Teams',
        mode: 'Tournament Mode',
        rules: 'Rules'
      },
    },
    tournamentOperation: {
      gamePlan: {
        title: 'Game Plan Overview',
        description: 'Here you can view the game plan of your tournament.',
        noMatches: 'No games scheduled',
        groups: {
          title: 'Groups',
          defaultName: 'Group {{number}}',
          noParticipants: 'No participants in this group'
        },
        knockoutRules: {
          placementInGroup: 'Place {{place}} from {{groupName}}',
          winnerOfGame: 'Winner of Game {{gameNumber}}',
          loserOfGame: 'Loser of Game {{gameNumber}}'
        },
        rounds: {
          LAST_32: 'Round of 32',
          LAST_16: 'Round of 16',
          QUARTER_FINALS: 'Quarter Finals',
          SEMI_FINALS: 'Semi Finals',
          FINAL: 'Final',
          THIRD_PLACE: 'Third Place Match'
        }
      },
      settings: {
        title: 'Tournament Settings',
        description: 'Here you can edit your tournament settings. Click on the desired setting to edit it.',
        categories: {
          basic: {
            title: 'Basic Information',
            tournamentName: 'Tournament Name',
            format: 'Format',
            formats: {
              league: 'League',
              groupKnockout: 'Group Stage & Knockout System',
              knockout: 'Knockout System'
            },
            numberOfFields: 'Fields'
          },
          dates: {
            title: 'Tournament Times',
            startDate: 'Start Time',
            endDate: 'End Time',
            singleDay: 'Single Day'
          },
          format: {
            title: 'Tournament Format',
            matchesAgainstEachParticipant: 'Matches Against Each Participant',
            matchDuration: 'Match Duration',
            matchBreakDuration: 'Break Duration',
            pointsForWin: 'Points for Win',
            pointsForDraw: 'Points for Draw',
            tiebreakers: 'Tiebreakers',
            groupStage: {
              title: 'Group Stage Configuration'
            },
            knockoutStage: {
              title: 'Knockout Stage Configuration'
            }
          }
        },
        tiebreakers: {
          current: 'Current Tiebreaker Rules',
          available: 'Available Rules',
          none: 'No tiebreaker rules set',
          GOAL_DIFFERENCE: 'Goal Difference',
          HEAD_TO_HEAD: 'Head to Head',
          GOALS_SCORED: 'Goals Scored',
        }
      }
    }
  },
};