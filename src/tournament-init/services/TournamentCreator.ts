import { Field, IField } from '../../tournament-operation/types/tournament/Field';
import { IParticipant, Participant } from '../../tournament-operation/types/tournament/Participant';
import { Tiebreaker } from '../../tournament-operation/types/tournament/Tiebreaker';
import { Tournament, } from '../../tournament-operation/types/tournament/Tournament';
import { TournamentFormat, TournamentPhase } from '../../tournament-operation/types/tournament/TournamentFormat';

/**
 * Converts form data into a Tournament object
 */
export class TournamentCreator {
  /**
   * Creates a Tournament instance from form data
   */
  static fromFormData(formData: Record<string, any>): Tournament {
    const tournament = new Tournament();

    // Basic Information
    tournament.setName(formData.name);
    tournament.setLogoUrl(formData.logoUrl);
    tournament.setStartDate(new Date(formData.startDate));
    tournament.setFields(formData.fields || 1);
    
    if (formData.multipleDays && formData.endDate) {
      tournament.setEndDate(new Date(formData.endDate));
    }

    // Set tournament type and phases based on format
    this.setTournamentTypeAndPhases(tournament, formData);

    // Add participants
    if (Array.isArray(formData.participants)) {
      formData.participants.forEach((participant: { name: string, logo: string }) => {
          tournament.addParticipant(new Participant(participant.name, participant.logo));
      });
    }

    // Add fields
    if (formData.fields) {
        let index = 0;
        const numberOfFields = formData!.fields! as unknown as number;
        const fields: IField[] = [];
        while(index < numberOfFields) {
            fields.push(new Field("Field " + (index + 1)));
            index++;
        }
        tournament.setFields(fields);
    }

    // Configure format-specific settings
    this.configureFormatSpecificSettings(tournament, formData);

    return tournament;
  }

  static toFormData(tournament: Tournament): Record<string, any> {
    const formData: Record<string, any> = {
      // Basic Information
      name: tournament.getName(),
      logoUrl: tournament.getLogoUrl(),
      startDate: tournament.getStartDate().toISOString(),
      fields: tournament.getFields().length,
      multipleDays: tournament.getEndDate() ? true : false,
      endDate: tournament.getEndDate()?.toISOString(),
      numberOfParticipants: tournament.getNumberOfParticipants(),
      participants: tournament.getParticipants().map((participant) => ({
        name: participant.name,
        logo: participant.logo,
      })),
      format: tournament.getFormat(),
    };

    // Format-specific configurations
    switch (tournament.getFormat()) {
      case TournamentFormat.LEAGUE:
        formData['leagueConfig.matchesAgainstEachParticipant'] = tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE);
        formData['leagueConfig.matchDuration'] = tournament.getMatchDuration(TournamentFormat.LEAGUE);
        formData['leagueConfig.matchBreak'] = tournament.getMatchBreakDuration(TournamentFormat.LEAGUE);
        formData['leagueConfig.pointsForWin'] = tournament.getPointsForWin(TournamentFormat.LEAGUE);
        formData['leagueConfig.pointsForDraw'] = tournament.getPointsForDraw(TournamentFormat.LEAGUE);
        formData['leagueConfig.tiebreakers'] = tournament.getTiebreakers(TournamentFormat.LEAGUE);
        break;

      case TournamentFormat.KNOCKOUT:
        formData['knockoutConfig.matchesAgainstEachParticipant'] = tournament.getMatchesAgainstEachParticipant(TournamentFormat.KNOCKOUT);
        formData['knockoutConfig.matchDuration'] = tournament.getMatchDuration(TournamentFormat.KNOCKOUT);
        formData['knockoutConfig.matchBreak'] = tournament.getMatchBreakDuration(TournamentFormat.KNOCKOUT);
        formData['knockoutConfig.hasThirdPlace'] = tournament.getHasThirdPlaceMatch(TournamentFormat.KNOCKOUT);
        break;

      case TournamentFormat.GROUP_KNOCKOUT:
        // Group Stage Config
        formData['groupConfig.matchesAgainstEachParticipant'] = tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.matchDuration'] = tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.matchBreak'] = tournament.getMatchBreakDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.pointsForWin'] = tournament.getPointsForWin(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.pointsForDraw'] = tournament.getPointsForDraw(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.tiebreakers'] = tournament.getTiebreakers(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.qualifiedParticipants'] = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
        formData['groupConfig.numberOfGroups'] = tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

        // Knockout Stage Config
        formData['knockoutConfig.matchesAgainstEachParticipant'] = tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);
        formData['knockoutConfig.matchDuration'] = tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);
        formData['knockoutConfig.matchBreak'] = tournament.getMatchBreakDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);
        formData['knockoutConfig.hasThirdPlace'] = tournament.getHasThirdPlaceMatch(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);
        break;
    }

    return formData;
  }

  /**
   * Sets tournament type and phases based on format
   */
  private static setTournamentTypeAndPhases(tournament: Tournament, formData: Record<string, any>): void {
    const format = formData.format as TournamentFormat;
    let phases: TournamentPhase[] = [];

    switch (format) {
      case TournamentFormat.LEAGUE:
        phases = [];
        break;
      case TournamentFormat.KNOCKOUT:
        phases = [TournamentPhase.KNOCKOUT_STAGE];
        break;
      case TournamentFormat.GROUP_KNOCKOUT:
        phases = [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE];
        break;
    }

    tournament.setType(format, phases);
  }

  /**
   * Configures format-specific settings
   */
  private static configureFormatSpecificSettings(tournament: Tournament, formData: Record<string, any>): void {
    const format = formData.format as TournamentFormat;

    switch (format) {
      case 'LEAGUE':
        this.configureLeagueSettings(tournament, formData);
        break;
      case 'KNOCKOUT':
        this.configureKnockoutSettings(tournament, formData);
        break;
      case 'GROUP_KNOCKOUT':
        this.configureGroupKnockoutSettings(tournament, formData);
        break;
    }
  }

  /**
   * Configures league-specific settings
   */
  private static configureLeagueSettings(tournament: Tournament, formData: Record<string, any>): void {
    tournament.setMatchesAgainstEachParticipant(
      formData['leagueConfig.matchesAgainstEachParticipant'] || 1,
      TournamentFormat.LEAGUE
    );
    tournament.setMatchDuration(
      formData['leagueConfig.matchDuration'] || 10,
      TournamentFormat.LEAGUE
    );
    tournament.setMatchBreakDuration(
      formData['leagueConfig.matchBreak'] || 2,
      TournamentFormat.LEAGUE
    );
    tournament.setPointsForWin(3, TournamentFormat.LEAGUE);
    tournament.setPointsForDraw(1, TournamentFormat.LEAGUE);
    tournament.setTiebreakers([Tiebreaker.GOAL_DIFFERENCE, Tiebreaker.HEAD_TO_HEAD, Tiebreaker.GOALS_SCORED], TournamentFormat.LEAGUE);
  }

  /**
   * Configures knockout-specific settings
   */
  private static configureKnockoutSettings(tournament: Tournament, formData: Record<string, any>): void {
    tournament.setMatchesAgainstEachParticipant(
      formData['knockoutConfig.matchesAgainstEachParticipant'] || 1,
      TournamentFormat.KNOCKOUT
    );
    tournament.setMatchDuration(
      formData['knockoutConfig.matchDuration'] || 10,
      TournamentFormat.KNOCKOUT
    );
    tournament.setMatchBreakDuration(
      formData['knockoutConfig.matchBreak'] || 2,
      TournamentFormat.KNOCKOUT
    );
    tournament.setHasThirdPlaceMatch(
      formData['knockoutConfig.hasThirdPlace'] || false,
      TournamentFormat.KNOCKOUT
    );
  }

  /**
   * Configures group + knockout specific settings
   */
  private static configureGroupKnockoutSettings(tournament: Tournament, formData: Record<string, any>): void {
    // Group Stage Configuration
    tournament.setMatchDuration(
      formData['groupConfig.matchDuration'] || 10,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );
    tournament.setMatchBreakDuration(
      formData['groupConfig.matchBreak'] || 2,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );
    tournament.setNumberOfGroups(
      formData['groupConfig.numberOfGroups'] || 1,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );
    tournament.setPointsForWin(3, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
    tournament.setPointsForDraw(1, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
    tournament.setTiebreakers(
      [Tiebreaker.GOAL_DIFFERENCE, Tiebreaker.HEAD_TO_HEAD, Tiebreaker.GOALS_SCORED],
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );

    tournament.setMatchesAgainstEachParticipant(
      formData['groupConfig.matchesAgainstEachParticipant'] || 1,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );

    tournament.setQualifiedParticipants(
      formData['groupConfig.qualifiedParticipants'] || 1,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.GROUP_STAGE
    );

    // Knockout Stage Configuration
    tournament.setMatchesAgainstEachParticipant(
      formData['knockoutConfig.matchesAgainstEachParticipant'] || 1,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.KNOCKOUT_STAGE
    );
    tournament.setMatchDuration(
      formData['knockoutConfig.matchDuration'] || 10,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.KNOCKOUT_STAGE
    );
    tournament.setMatchBreakDuration(
      formData['knockoutConfig.matchBreak'] || 2,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.KNOCKOUT_STAGE
    );
    tournament.setHasThirdPlaceMatch(
      formData['knockoutConfig.hasThirdPlace'] || false,
      TournamentFormat.GROUP_KNOCKOUT,
      TournamentPhase.KNOCKOUT_STAGE
    );
  }
} 