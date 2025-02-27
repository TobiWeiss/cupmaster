import { render, screen, fireEvent } from '@testing-library/react';
import { TournamentWizard } from '../TournamentWizard';
import { elements, IWizardElement } from '../WizardConfig';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

describe('TournamentWizard', () => {
  const mockOnComplete = vi.fn();
  const mockOnCancel = vi.fn();

  const renderWizard = (elements: IWizardElement[]) => {
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

  describe('Basic Functionality of the Wizard', async () => {
    it('should not be possible to go to the next step without answering the question if the question is required', async () => {
      const element = elements.find(element => element.required);
      renderWizard([element!, element!]);
      const nextButton = await screen.findByTestId(`wizard-next-button`);
      fireEvent.click(nextButton);
      const validationMessage = await screen.getByTestId(`wizard-validation-message`);
      expect(validationMessage.textContent).toBeTruthy();
    });

    it('should be possible to go to the next step with a valid answer for a required question', () => {
      const element = elements.find(element => element.required);
      renderWizard([element!, element!]);

      const nameInput = screen.getByTestId(`wizard-input-${element!.name}`);
      //fill in the input
      fireEvent.change(nameInput, { target: { value: 'Test Tournament' } });

      const nextButton = screen.getByTestId(`wizard-next-button`);
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(nextButton);
    });

    it('should be possible to skip a non-required question', () => {
      const element = elements.find(element => !element.required);
      renderWizard([element!, element!  ]);
      const skipButton = screen.getByTestId(`wizard-skip-button`);
      expect(skipButton).not.toBeDisabled();
      fireEvent.click(skipButton);
    });

    it('should display a validation message if the user tries to go to the next step without answering a required question', () => {
      const element = elements.find(element => element.validation);
      element!.validation!.fun = () => false;
      renderWizard([element!, element!]);


      const input = screen.getByTestId(`wizard-input-${element!.name}`);
      //fill in the input
      fireEvent.change(input, { target: { value: 'Test Tournament' } });

      const nextButton = screen.getByTestId(`wizard-next-button`);
      fireEvent.click(nextButton);

      const validationMessage = screen.getByTestId(`wizard-validation-message`);
      expect(validationMessage.textContent).toBeTruthy();
    });
  });
}); 
