import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TournamentSettings } from '../TournamentSettings';
import { Tournament } from '../../../types/tournament/Tournament';
import { TournamentFormat } from '../../../types/tournament/TournamentFormat';
import { Field } from '../../../types/tournament/Field';

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

            // Click edit button on name field
            const nameField = screen.getByTestId('text-element-edit-name');
            fireEvent.click(nameField);

            // Wait for the name input to be visible and change its value

            const nameInput = await screen.findByTestId('text-element-input-name');
            expect(nameInput).toBeInTheDocument();
            fireEvent.change(nameInput, { target: { value: 'New Tournament Name' } });

            // Click save button
            const saveButton = screen.getByTestId('text-element-save-name');
            fireEvent.click(saveButton);

            // Verify the save was called with the new name
            expect(mockOnSave).toHaveBeenCalled();
            const savedTournament = mockOnSave.mock.calls[0][0];
            expect(savedTournament.getName()).toBe('New Tournament Name');

        });

        it('should handle long tournament names', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the name field to edit
            const nameEditButton = screen.getByTestId('text-element-edit-name');
            fireEvent.click(nameEditButton);


            // Wait for the name input to be visible
            const nameInput = await screen.findByTestId('text-element-input-name');
            expect(nameInput).toBeInTheDocument();

            // Enter a very long name
            const longName = 'a'.repeat(101);
            fireEvent.change(nameInput, { target: { value: longName } });

            // Click save button and expect it to throw

            fireEvent.click(screen.getByTestId('text-element-save-name'));

            // Verify the save was not called
            expect(mockOnSave).not.toHaveBeenCalled();
            const nameField = await screen.findByTestId('setting-content-name');
            expect(nameField).toHaveTextContent('Test Tournament');
        });

        it('should allow adding and removing fields', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the fields section to edit
            const fieldsSection = screen.getByTestId('fieldlist-element-edit-fields');
            fireEvent.click(fieldsSection);

            // Wait for the field list to be visible and add a new field

             // Add new field via add button
             const addFieldButton = await screen.findByTestId('fieldlist-element-add-fields');
             expect(addFieldButton).toBeInTheDocument();
             fireEvent.click(addFieldButton);

            const fieldInput = await screen.findByTestId('fieldlist-element-field-fields-1');
            expect(fieldInput).toBeInTheDocument();
            fireEvent.change(fieldInput, { target: { value: 'Field 2' } });

            // Save the new field
            const saveFieldButton = await screen.findByTestId('fieldlist-element-save-fields');
            fireEvent.click(saveFieldButton);

            // Verify the save was called with the new field
            expect(mockOnSave).toHaveBeenCalled();
            const savedTournament = mockOnSave.mock.calls[0][0];
            expect(savedTournament.getFields().length).toBe(2);
            expect(savedTournament.getFields()[1].getName()).toBe('Field 2');

            // Remove the new field
            const removeFieldButton = await screen.findByTestId('fieldlist-element-remove-fields-1');
            fireEvent.click(removeFieldButton);

            const saveFieldButton2 = await screen.findByTestId('fieldlist-element-save-fields');
            fireEvent.click(saveFieldButton2);

            // Verify the save was called with the field removed
            expect(mockOnSave).toHaveBeenCalled();
            const finalTournament = mockOnSave.mock.calls[1][0];
            expect(finalTournament.getFields().length).toBe(1);
            expect(finalTournament.getFields()[0].getName()).toBe('Field 1');

        });
    });

    describe('Time Settings', () => {
        it('should allow setting a new start time', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the start time field to edit
            const startTimeField = await screen.findByTestId('setting-content-startDate');
            fireEvent.click(startTimeField);

            // Wait for the datetime inputs to be visible
            const dateInput = await screen.findByTestId('datetime-input-startDate-date');
            const timeInput = await screen.findByTestId('datetime-input-startDate-hour');
            expect(dateInput).toBeInTheDocument();
            expect(timeInput).toBeInTheDocument();

            // Set a new date (tomorrow)
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + 1);
            const year = newDate.getFullYear();
            const month = String(newDate.getMonth() + 1).padStart(2, '0');
            const day = String(newDate.getDate()).padStart(2, '0');
            const hours = String(newDate.getHours()).padStart(2, '0');
            const minutes = String(newDate.getMinutes()).padStart(2, '0');
            
            const dateString = `${year}-${month}-${day}`;
            const timeString = `${hours}:${minutes}`;

            fireEvent.change(dateInput, { target: { value: dateString } });
            fireEvent.change(timeInput, { target: { value: timeString } });

            // Click save button
            const saveButton = screen.getByTestId('datetime-input-save-startDate');
            fireEvent.click(saveButton);

            // Verify the save was called with the new date
            expect(mockOnSave).toHaveBeenCalled();
            const savedTournament = mockOnSave.mock.calls[0][0];
            const savedDate = savedTournament.getStartDate();
            expect(savedDate).toBeTruthy();
            
            // Compare the dates by checking year, month, day, hour, minute
            expect(savedDate!.getFullYear()).toBe(newDate.getFullYear());
            expect(savedDate!.getMonth()).toBe(newDate.getMonth());
            expect(savedDate!.getDate()).toBe(newDate.getDate());
            expect(savedDate!.getHours()).toBe(newDate.getHours());
            expect(savedDate!.getMinutes()).toBe(newDate.getMinutes());
        });

     
    });

    describe('League Config', () => {
        it('should allow changing match duration', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the match duration field to edit
            const durationField = screen.getByTestId('setting-content-matchDuration');
            fireEvent.click(durationField);

            // Wait for the number input to be visible and change the duration

            const incrementButton = await screen.findByTestId('number-input-increment-matchDuration');
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

        it('should not allow match duration below minimum', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the match duration field to edit
            const durationField = await screen.findByTestId('setting-content-matchDuration');
            fireEvent.click(durationField);

            // Wait for the number input to be visible and try to set duration below minimum
            const durationInput = await screen.findByTestId('number-input-value-matchDuration');
            expect(durationInput).toBeInTheDocument();
            fireEvent.change(durationInput, { target: { value: '0' } });

            // Click save button
            const saveButton = screen.getByTestId('number-input-save-matchDuration');
            fireEvent.click(saveButton);

            // Verify the save was called with the minimum duration
            expect(mockOnSave).not.toHaveBeenCalled();
            expect(durationField.textContent).toContain('10');

        });

        it('should allow changing points for win', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the points for win field to edit
            const pointsField = await screen.findByTestId('setting-content-pointsForWin');
            fireEvent.click(pointsField);

            // Wait for the number input to be visible and change the points
            const incrementButton = await screen.findByTestId('number-input-increment-pointsForWin');
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

        it('should allow changing points for draw', async () => {
            render(<TournamentSettings tournament={tournament} onSave={mockOnSave} />);

            // Click on the points for draw field to edit
            const pointsField = await screen.findByTestId('setting-content-pointsForDraw');
            fireEvent.click(pointsField);

            // Wait for the number input to be visible and change the points
            const incrementButton = await screen.findByTestId('number-input-increment-pointsForDraw');
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
