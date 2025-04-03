import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TournamentWizard } from '../TournamentWizard';
import { elements } from '../WizardConfig';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import scenarios from './scenarios.json';
import { TournamentFormat } from '../../../types/enums';
import { parseDateFromIsoString, parseTimeFromIsoString } from '../../../utils/DateUtils';


// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'en',
            changeLanguage: vi.fn(),
        },
    }),
}));

// Mock Help component since it might use Portal
vi.mock('../../../../common/components/ui/Help', () => ({
    Help: ({ explanation }: { explanation: string }) => <div data-testid="wizard-help">{explanation}</div>,
}));

describe('TournamentWizard Scenarios', () => {
    const mockOnComplete = vi.fn();
    const mockOnCancel = vi.fn();

    const renderWizard = () => {
        return render(
            <TournamentWizard
                wizardElements={elements}
                onComplete={mockOnComplete}
                onCancel={mockOnCancel}
            />
        );
    };

    beforeEach(() => {
        mockOnComplete.mockClear();
        mockOnCancel.mockClear();
    });

    // Helper functions for common test actions
    const fillBasicInformation = async (name: string) => {
        // Step 1: Tournament Name
        const nameInput = screen.getByTestId('wizard-input-name');
        fireEvent.change(nameInput, { target: { value: name } });
        expect(nameInput).toHaveValue(name);

        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Step 2: Logo Upload
        const logoInput = screen.getByTestId('wizard-input-logoUrl');
        fireEvent.change(logoInput, { target: { files: [new File(["test"], "test.png", { type: "image/png" })] } });
        await waitFor(() => {
            expect(screen.getByRole('img')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('wizard-next-button'));
    };

    const selectTournamentFormat = (format: string) => {
        const formatSelect = screen.getByTestId('wizard-select-format');
        fireEvent.change(formatSelect, { target: { value: format } });
        expect(formatSelect).toHaveValue(format);
        fireEvent.click(screen.getByTestId('wizard-next-button'));
    };

    const selectNumberOfFields = (fields: number) => {
        const fieldsSelect = screen.getByTestId('wizard-input-fields');
        fireEvent.change(fieldsSelect, { target: { value: fields } });
        expect(fieldsSelect).toHaveValue(fields.toString());
        fireEvent.click(screen.getByTestId('wizard-next-button'));
    };

    const fillDateInformation = (startDate: string, multipleDays: boolean, endDate: string,) => {
        // Start Date
        const startDateInput = screen.getByTestId('wizard-input-startDate-date');

        fireEvent.change(startDateInput, { target: { value: parseDateFromIsoString(startDate) } });
        const startDateHourInput = screen.getByTestId('wizard-input-startDate-hour');
        const time = parseTimeFromIsoString(startDate)
        fireEvent.change(startDateHourInput, { target: { value: time } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Multiple Days
        if (multipleDays) {
            fireEvent.click(screen.getByTestId('wizard-button-yes-multipleDays'));
        } else {
            fireEvent.click(screen.getByTestId('wizard-button-no-multipleDays'));
        }
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        if (multipleDays) {
            // End Date
            const endDateInput = screen.getByTestId('wizard-input-endDate');
            fireEvent.change(endDateInput, { target: { value: parseDateFromIsoString(endDate) } });
            fireEvent.click(screen.getByTestId('wizard-next-button'));
        }
    };

    const fillParticipantInformation = (numberOfParticipants: number, participants: Array<{ name: string }>) => {
        // Number of Participants
        const numberOfParticipantsInput = screen.getByTestId('wizard-input-numberOfParticipants');
        fireEvent.change(numberOfParticipantsInput, { target: { value: numberOfParticipants } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Team List
        const addParticipantButton = screen.getByTestId('wizard-participant-list-button-add');
        participants.forEach(participant => {
            fireEvent.click(addParticipantButton);
            const participantNameInput = screen.getByPlaceholderText('tournamentInit.creation.participants.namePlaceholder');
            fireEvent.change(participantNameInput, { target: { value: participant.name } });
            fireEvent.click(screen.getByText('common.save'));
        });
        fireEvent.click(screen.getByTestId('wizard-next-button'));
    };

    const fillLeagueConfiguration = (matchesPerTeam: number, duration: number, breakTime: number) => {
        // Matches Against Each Team
        const matchesInput = screen.getByTestId('wizard-input-leagueConfig.matchesAgainstEachParticipant');
        fireEvent.change(matchesInput, { target: { value: matchesPerTeam } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Duration
        const durationInput = screen.getByTestId('wizard-input-leagueConfig.matchDuration');
        fireEvent.change(durationInput, { target: { value: duration } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Break
        const breakInput = screen.getByTestId('wizard-input-leagueConfig.matchBreak');
        fireEvent.change(breakInput, { target: { value: breakTime } });
    };

    const fillKnockoutConfiguration = (legs: string, duration: number, breakTime: number, hasThirdPlace: boolean) => {
        // Knockout Legs
        const legsInput = screen.getByTestId('wizard-select-knockoutConfig.legs');
        fireEvent.change(legsInput, { target: { value: legs } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Duration
        const durationInput = screen.getByTestId('wizard-input-knockoutConfig.matchDuration');
        fireEvent.change(durationInput, { target: { value: duration } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Break
        const breakInput = screen.getByTestId('wizard-input-knockoutConfig.matchBreak');
        fireEvent.change(breakInput, { target: { value: breakTime } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Third Place
        if (hasThirdPlace) {
            fireEvent.click(screen.getByTestId('wizard-button-yes-knockoutConfig.hasThirdPlace'));
        }
    };

    const fillGroupConfiguration = (
        numberOfGroups: number,
        teamsQualifying: number,
        duration: number,
        breakTime: number
    ) => {
        // Number of Groups
        const groupConfig = screen.getByTestId('wizard-input-groupConfig.numberOfGroups');
        fireEvent.change(groupConfig, { target: { value: numberOfGroups } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Teams Qualifying
        const teamsQualifyingInput = screen.getByTestId('wizard-input-groupConfig.teamsQualifying');
        fireEvent.change(teamsQualifyingInput, { target: { value: teamsQualifying } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Duration
        const durationInput = screen.getByTestId('wizard-input-groupConfig.matchDuration');
        fireEvent.change(durationInput, { target: { value: duration } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));

        // Match Break
        const breakInput = screen.getByTestId('wizard-input-groupConfig.matchBreak');
        fireEvent.change(breakInput, { target: { value: breakTime } });
        fireEvent.click(screen.getByTestId('wizard-next-button'));
    };

    const verifyCompletionStatus = async (category: string) => {
        const indicator = await screen.findByTestId(`wizard-category-item-${category}`);
        expect(indicator).toHaveTextContent(category);
        const checkIcon = await screen.findByTestId(`wizard-category-completed-icon-${category}`);
        expect(checkIcon).toBeInTheDocument();
    };

    describe('End2End Testing the Wizard with different scenarios', () => {
        scenarios.forEach(scenario => {
            it(`should complete ${scenario.name} successfully`, async () => {
                renderWizard();

                // Fill basic information
                await fillBasicInformation(scenario.steps[0].value as string);
                selectTournamentFormat(scenario.steps[2].value as string);
                selectNumberOfFields(scenario.steps[3].value as number);
                await verifyCompletionStatus('basicInformation');

                // Fill dates
                fillDateInformation(scenario.steps[4].value as string, scenario.steps[5].value as boolean, scenario.steps[6].value as string);
                await verifyCompletionStatus('tournamentDates');

                // Fill team information
                fillParticipantInformation(
                    scenario.steps[7].value as number,
                    scenario.steps[8].values!
                );
                await verifyCompletionStatus('participants');

                // Fill format-specific configuration
                switch (scenario.expectedData.format) {
                    case TournamentFormat.LEAGUE:
                        fillLeagueConfiguration(
                            scenario.steps[9].value as number,
                            scenario.steps[10].value as number,
                            scenario.steps[11].value as number
                        );
                        break;

                    case TournamentFormat.KNOCKOUT:
                        fillKnockoutConfiguration(
                            scenario.steps[9].value as string,
                            scenario.steps[10].value as number,
                            scenario.steps[11].value as number,
                            scenario.steps[12].value as boolean
                        );
                        break;

                    case TournamentFormat.GROUP_KNOCKOUT:
                        fillGroupConfiguration(
                            scenario.steps[9].value as number,
                            scenario.steps[10].value as number,
                            scenario.steps[11].value as number,
                            scenario.steps[12].value as number
                        );
                        fillKnockoutConfiguration(
                            scenario.steps[13].value as string,
                            scenario.steps[14].value as number,
                            scenario.steps[15].value as number,
                            scenario.steps[16].value as boolean
                        );
                        break;
                }

                // Complete the wizard
                fireEvent.click(screen.getByTestId('wizard-create-button'));
                expect(mockOnComplete).toHaveBeenCalledWith(expect.objectContaining(scenario.expectedData));
            });
        });
    });
}); 
