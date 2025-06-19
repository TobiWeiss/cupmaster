import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TournamentSettings } from '../TournamentSettings';
import { Tournament } from '../../../types/tournament/Tournament';
import { TournamentFormat } from '../../../types/tournament/TournamentFormat';
import { Field } from '../../../types/tournament/Field';
import { TournamentNameTooLongException } from '../exceptions';

// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock notifications
vi.mock('../../../../common/hooks/useNotifications', () => ({
    useNotify: () => ({
        showNotification: vi.fn(),
    }),
}));

describe('TournamentSettings', () => {
    let mockOnSave: ReturnType<typeof vi.fn>;
    let tournament: Tournament;

    beforeEach(() => {
        mockOnSave = vi.fn().mockResolvedValue(true);
        tournament = Tournament.fromObject({
            id: 'test-tournament',
            status: 'INITIALIZED',
            config: {
                name: 'Test Tournament',
                startDate: new Date('2024-03-08T09:00:00.000Z'),
                numberOfParticipants: 6,
                type: {
                    format: TournamentFormat.LEAGUE,
                    phases: []
                },
                groupConfig: {
                    numberOfGroups: 0,
                    matchesAgainstEachParticipant: 0,
                    matchDuration: 0,
                    matchBreakDuration: 0,
                    pointsForWin: 0,
                    pointsForDraw: 0,
                    tiebreakers: [],
                    qualifiedParticipants: 0
                },
                knockoutConfig: {
                    matchesAgainstEachParticipant: 0,
                    matchDuration: 0,
                    matchBreakDuration: 0,
                    hasThirdPlaceMatch: false
                },
                leagueConfig: {
                    matchesAgainstEachParticipant: 1,
                    matchDuration: 10,
                    matchBreakDuration: 2,
                    pointsForWin: 3,
                    pointsForDraw: 1,
                    tiebreakers: []
                },
                fields: [
                    new Field('Field 1')
                ],
                logoUrl: ''
            },
            participants: []
        });
    });

    describe('Basic Settings', () => {
        it('should allow changing tournament name', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the name field to edit
            const nameField = screen.getByText('Test Tournament');
            fireEvent.click(nameField);

            // Wait for the name input to be visible and change its value
            await waitFor(() => {
                const nameInput = screen.getByTestId('text-input-name');
                expect(nameInput).toBeInTheDocument();
                fireEvent.change(nameInput, { target: { value: 'New Tournament Name' } });

                // Click save button
                const saveButton = screen.getByTestId('text-input-save-name');
                fireEvent.click(saveButton);

                // Verify the save was called with the new name
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getName()).toBe('New Tournament Name');
            });
        });

        it('should handle long tournament names', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the name field to edit
            const nameField = screen.getByText('Test Tournament');
            fireEvent.click(nameField);

            // Wait for the name input to be visible
            const nameInput = await screen.findByTestId('text-input-name');
            expect(nameInput).toBeInTheDocument();
            
            // Enter a very long name
            const longName = 'a'.repeat(101);
            fireEvent.change(nameInput, { target: { value: longName } });

            // Click save button and expect it to throw
            expect(() => {
                fireEvent.click(screen.getByTestId('text-input-save-name'));
            }).toThrow(TournamentNameTooLongException);

            // Verify the save was not called
            expect(mockOnSave).not.toHaveBeenCalled();
        });

        it('should allow adding and removing fields', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the fields section to edit
            const fieldsSection = screen.getByText('Field 1');
            fireEvent.click(fieldsSection);

            // Wait for the field list to be visible and add a new field
            await waitFor(() => {
                const addFieldButton = screen.getByTestId('field-list-add');
                expect(addFieldButton).toBeInTheDocument();
                fireEvent.click(addFieldButton);

                // Enter new field name
                const fieldInput = screen.getByTestId('text-input-field-1');
                expect(fieldInput).toBeInTheDocument();
                fireEvent.change(fieldInput, { target: { value: 'Field 2' } });

                // Save the new field
                const saveFieldButton = screen.getByTestId('text-input-save-field-1');
                fireEvent.click(saveFieldButton);

                // Verify the save was called with the new field
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getFields().length).toBe(2);
                expect(savedTournament.getFields()[1].getName()).toBe('Field 2');

                // Remove the new field
                const removeFieldButton = screen.getByTestId('field-list-remove-1');
                fireEvent.click(removeFieldButton);

                // Verify the save was called with the field removed
                expect(mockOnSave).toHaveBeenCalled();
                const finalTournament = mockOnSave.mock.calls[1][0];
                expect(finalTournament.getFields().length).toBe(1);
            });
        });
    });

    describe('Time Settings', () => {
        it('should allow setting a new start time', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the start time field to edit
            const startTimeField = screen.getByText('March 8, 2024, 9:00 AM');
            fireEvent.click(startTimeField);

            // Wait for the datetime input to be visible and set a new date
            await waitFor(() => {
                const dateTimeInput = screen.getByTestId('datetime-input-startDate');
                expect(dateTimeInput).toBeInTheDocument();
                fireEvent.change(dateTimeInput, { target: { value: '2024-03-09T10:00' } });

                // Click save button
                const saveButton = screen.getByTestId('datetime-input-save-startDate');
                fireEvent.click(saveButton);

                // Verify the save was called with the new date
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getStartDate()?.toISOString()).toBe('2024-03-09T10:00:00.000Z');
            });
        });

        it('should not allow setting a past date', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the start time field to edit
            const startTimeField = screen.getByText('March 8, 2024, 9:00 AM');
            fireEvent.click(startTimeField);

            // Wait for the datetime input to be visible and try to set a past date
            await waitFor(() => {
                const dateTimeInput = screen.getByTestId('datetime-input-startDate');
                expect(dateTimeInput).toBeInTheDocument();
                const pastDate = new Date();
                pastDate.setFullYear(pastDate.getFullYear() - 1);
                fireEvent.change(dateTimeInput, { target: { value: pastDate.toISOString().slice(0, 16) } });

                // Click save button
                const saveButton = screen.getByTestId('datetime-input-save-startDate');
                fireEvent.click(saveButton);

                // Verify the save was not called
                expect(mockOnSave).not.toHaveBeenCalled();
            });
        });
    });

    describe('League Config', () => {
        it('should allow changing match duration', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the match duration field to edit
            const durationField = screen.getByText('10 minutes');
            fireEvent.click(durationField);

            // Wait for the number input to be visible and change the duration
            await waitFor(() => {
                const incrementButton = screen.getByTestId('number-input-increment-matchDuration');
                expect(incrementButton).toBeInTheDocument();
                fireEvent.click(incrementButton);

                // Click save button
                const saveButton = screen.getByTestId('number-input-save-matchDuration');
                fireEvent.click(saveButton);

                // Verify the save was called with the new duration
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getMatchDuration(TournamentFormat.LEAGUE)).toBe(11);
            });
        });

        it('should not allow match duration below minimum', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the match duration field to edit
            const durationField = screen.getByText('10 minutes');
            fireEvent.click(durationField);

            // Wait for the number input to be visible and try to set duration below minimum
            await waitFor(() => {
                const durationInput = screen.getByTestId('number-input-value-matchDuration');
                expect(durationInput).toBeInTheDocument();
                fireEvent.change(durationInput, { target: { value: '0' } });

                // Click save button
                const saveButton = screen.getByTestId('number-input-save-matchDuration');
                fireEvent.click(saveButton);

                // Verify the save was called with the minimum duration
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getMatchDuration(TournamentFormat.LEAGUE)).toBe(5);
            });
        });

        it('should allow changing points for win', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the points for win field to edit
            const pointsField = screen.getByText('3 points');
            fireEvent.click(pointsField);

            // Wait for the number input to be visible and change the points
            await waitFor(() => {
                const incrementButton = screen.getByTestId('number-input-increment-pointsForWin');
                expect(incrementButton).toBeInTheDocument();
                fireEvent.click(incrementButton);

                // Click save button
                const saveButton = screen.getByTestId('number-input-save-pointsForWin');
                fireEvent.click(saveButton);

                // Verify the save was called with the new points
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getPointsForWin(TournamentFormat.LEAGUE)).toBe(4);
            });
        });

        it('should allow changing points for draw', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the points for draw field to edit
            const pointsField = screen.getByText('1 point');
            fireEvent.click(pointsField);

            // Wait for the number input to be visible and change the points
            await waitFor(() => {
                const incrementButton = screen.getByTestId('number-input-increment-pointsForDraw');
                expect(incrementButton).toBeInTheDocument();
                fireEvent.click(incrementButton);

                // Click save button
                const saveButton = screen.getByTestId('number-input-save-pointsForDraw');
                fireEvent.click(saveButton);

                // Verify the save was called with the new points
                expect(mockOnSave).toHaveBeenCalled();
                const savedTournament = mockOnSave.mock.calls[0][0];
                expect(savedTournament.getPointsForDraw(TournamentFormat.LEAGUE)).toBe(2);
            });
        });
    });
});
