import { Button } from '../../../common/components/ui/Button';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SmallestText } from '../../../common/components/typography/Text';
import { Icon } from '../../../common/components/ui/Icon';

interface WizardNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  canSkip: boolean;
  isValid: boolean;
  onBack: () => void;
  onNext: () => void;
}

/**
 * Handles the display and logic of wizard navigation buttons
 * Determines which buttons to show based on wizard state
 */
export const WizardNavigation = ({
  isFirstStep,
  isLastStep,
  canSkip,
  isValid,
  onBack,
  onNext
}: WizardNavigationProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between mt-8" data-testid="wizard-actions">
      <Button
        variant="outline"
        icon={ChevronLeft}
        onClick={onBack}
        data-testid="wizard-back-button"
      >
        <SmallestText>{isFirstStep ? t('common.cancel') : t('common.back')}</SmallestText>
      </Button>

      <Button
        variant={canSkip ? 'outline' : 'primary'}
        onClick={onNext}
        disabled={!canSkip && !isValid}
        data-testid={isLastStep ? "wizard-create-button" : canSkip ? "wizard-skip-button" : "wizard-next-button"}
      >
        <SmallestText className={`${canSkip ? '' : 'text-white'}`}>{isLastStep 
          ? t('common.create') 
          : canSkip 
            ? t('common.skip') 
            : t('common.next')
        }</SmallestText>
        <Icon icon={canSkip ? SkipForward : ChevronRight} size="sm" color={!canSkip ? 'text-white' : 'text-custom-secondary-light dark:text-custom-secondary-dark'} className={'ml-2'} />
      </Button>
    </div>
  );
}; 