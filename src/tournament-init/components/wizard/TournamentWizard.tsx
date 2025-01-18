import { useTranslation } from 'react-i18next';
import { SubHeading, LargeText } from '../../../common/components/typography/Text';
import { Card } from '../../../common/components/ui/Card';
import { IWizardElement } from './WizardConfig';
import { ElementRenderer } from './ElementRenderer';
import { Help } from '../../../common/components/ui/Help';
import { ProgressIndicator } from '../../../common/components/ui/ProgressIndicator';
import { WizardNavigation } from './WizardActions';
import { useState, useEffect } from 'react';

interface TournamentWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
  wizardFields: IWizardElement[];
}

/**
 * Main wizard component for tournament creation
 * Orchestrates the step-by-step process of gathering tournament configuration.
 * 
 * Orchestration is done by the following:
 * - WizardNavigation: Handles the display and logic of wizard navigation buttons
 * - ElementRenderer: Handles the display and logic of the wizard elements
 * - ProgressIndicator: Displays the progress of the wizard
 * 
 * The wizard is initialized with the wizardFields prop, which is an array of IWizardElement objects.
 * The wizardFields prop is defined in WizardConfig.ts.
 * 
 */
export const TournamentWizard = ({ onComplete, onCancel, wizardFields }: TournamentWizardProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState<IWizardElement>(wizardFields[currentStep]);
  const [activeQuestions, setActiveQuestions] = useState<IWizardElement[]>(wizardFields);
  const [checkValidity, setCheckValidity] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);

  // Update current question when step changes
  useEffect(() => {
    setCurrentQuestion(activeQuestions[currentStep]);
  }, [currentStep]);

  /**
   * Filters the wizard fields based on the form data
   * Only shows fields that should be displayed based on the current form data
   */
  useEffect(() => {
    setActiveQuestions(wizardFields.filter(field => 
      !field.showIf || field.showIf(formData)
    ));
  }, [formData]);

  /**
   * Resets the completion state when the question changes
   * Marks the step as completed if there's already a valid value
   */
  useEffect(() => {
    setCheckValidity(false);
    setStepCompleted(false);
    if (currentQuestion && formData[currentQuestion.name] !== undefined) {
      setStepCompleted(true);
    }
  }, [currentQuestion?.name]);
  
  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setStepCompleted(value !== undefined && value !== '' && value !== null);
  };

  const isStepValid = () => {
    if (!currentQuestion?.required) return true;
    const value = formData[currentQuestion.name];

    if (!value) return false;

    return currentQuestion.validation?.fun(value ?? '');
  };

  const canSkip = !currentQuestion?.required && 
    (currentQuestion && (formData[currentQuestion.name] === undefined || 
     formData[currentQuestion.name] === '' || 
     formData[currentQuestion.name] === null));

  const isLastStep = currentStep === activeQuestions.length - 1;
  const isFirstStep = currentStep === 0;

  const handleBack = () => {
    if (isFirstStep) {
      onCancel();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNextStep = () => {
    setCheckValidity(true);
    if(!isStepValid()) {
      return;
    }
    setStepCompleted(false);

    if (isLastStep) {
      onComplete(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <SubHeading className="text-start mb-20" data-testid="wizard-title">
        {t('tournamentManagement.creation.title')}
      </SubHeading>

      <Card className="mb-8">
        <div className="flex items-stretch justify-end gap-2">
          <Help 
            explanation={t(currentQuestion.explanation!)} 
            size="lg"
            data-testid="wizard-help"
          />
        </div>
        
        <div className="text-center mb-8 mx-8">
          <div className="flex items-center justify-center gap-2" data-testid="wizard-question">
            <LargeText data-testid="wizard-question">
              {t(currentQuestion.question)}
            </LargeText>
          </div>
        </div>

        <div className="w-full px-8">
          <ElementRenderer
            element={currentQuestion}
            value={formData[currentQuestion.name]}
            onChange={(value: any) => handleFieldChange(currentQuestion.name, value)}
            isValid={checkValidity ? isStepValid() : true}
            data-testid="wizard-element"
          />
        </div>

        <WizardNavigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          canSkip={canSkip}
          isValid={true}
          onBack={handleBack}
          onNext={handleNextStep}
          data-testid="wizard-actions"
        />
      </Card>

      <ProgressIndicator
        total={activeQuestions.length}
        current={currentStep}
        completed={stepCompleted}
        data-testid="wizard-progress"
      />
    </div>
  );
}; 