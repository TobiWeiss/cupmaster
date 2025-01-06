import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainHeading, SubHeading, LargeText } from '../../../common/components/typography/Text';
import { Card } from '../../../common/components/ui/Card';
import { Button } from '../../../common/components/ui/Button';
import { wizardFields, IWizardField } from './WizardConfig';
import { WizardField } from './WizardField';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { Help } from '../../../common/components/ui/Help';
import { ProgressIndicator } from '../../../common/components/ui/ProgressIndicator';

interface TournamentWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

export const TournamentWizard = ({ onComplete, onCancel }: TournamentWizardProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [checkValidity, setCheckValidity] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);

  const activeQuestions = wizardFields.filter(field => 
    !field.showIf || field.showIf(formData)
  );

  const currentQuestion = activeQuestions[currentStep];

  useEffect(() => {
    // Reset completion state when step changes
    setStepCompleted(false);
    // Set completed if there's already a valid value
    if (formData[currentQuestion.name] !== undefined) {
      setStepCompleted(true);
    }
  }, [currentStep, currentQuestion.name]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setCheckValidity(true);
    // Set step as completed when valid value is entered
    if (value !== undefined && value !== '' && value !== null) {
      setStepCompleted(true);
    } else {
      setStepCompleted(false);
    }
  };

  const isLastStep = currentStep === activeQuestions.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData);
    } else {
      setStepCompleted(false);
      setCheckValidity(false);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      onCancel();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    if (!currentQuestion.required) return true;
    const value = formData[currentQuestion.name];
    return value !== undefined && value !== '';
  };

  const shouldShowSkip = () => {
    return !currentQuestion.required && 
           (formData[currentQuestion.name] === undefined || 
            formData[currentQuestion.name] === '' || 
            formData[currentQuestion.name] === null);
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <SubHeading className="text-start mb-20">
        {t('tournamentManagement.creation.title')}
      </SubHeading>

      <Card className="mb-8">
        <div className="flex items-stretch justify-end gap-2">
          <Help explanation={t(currentQuestion.explanation!)} size="lg" />
        </div>
        <div className="text-center mb-8 mx-8">
          <div className="flex items-center justify-center gap-2">
            <LargeText>{t(currentQuestion.question)}</LargeText>
          </div>
        </div>

        <div className="w-full px-8">
          <WizardField
            field={currentQuestion}
            value={formData[currentQuestion.name]}
            onChange={(value: any) => handleFieldChange(currentQuestion.name, value)}
            isValid={checkValidity ? isStepValid() : true}
          />
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            icon={ChevronLeft}
            onClick={handleBack}
          >
            {isFirstStep ? t('common.cancel') : t('common.back')}
          </Button>

          <Button
            variant={shouldShowSkip() ? 'outline' : 'primary'}
            icon={shouldShowSkip() ? SkipForward : ChevronRight}
            iconPosition="right"
            onClick={handleNext}
            disabled={!shouldShowSkip() && !isStepValid()}
          >
            {isLastStep 
              ? t('common.create') 
              : shouldShowSkip() 
                ? t('common.skip') 
                : t('common.next')
            }
          </Button>
        </div>
      </Card>

      <ProgressIndicator
        total={activeQuestions.length}
        current={currentStep}
        completed={stepCompleted}
      />
    </div>
  );
}; 