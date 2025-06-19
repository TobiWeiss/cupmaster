import { useTranslation } from 'react-i18next';
import { Card } from '../../../common/components/ui/Card';
import { IWizardElement } from './WizardConfig';
import { ElementRenderer } from './element-renderer/ElementRenderer';
import { Help } from '../../../common/components/ui/Help';
import { WizardNavigation } from './WizardNavigation';
import { useState, useEffect } from 'react';
import { LargeText } from '../../../common/components/typography/Text';
import { Category, CategoryIndicator } from './progress-indicator/CategoryIndicator';
import { easeInOut, motion } from 'framer-motion';

interface TournamentWizardProps {
  onComplete: (data: Record<string, any>) => void;
  onCancel: () => void;
  wizardElements: IWizardElement[];
}

/**
 * Main wizard component for tournament creation.
 * Handles the step-by-step process of gathering tournament configuration from the user.
 * 
 * The wizard is driven by a WizardConfig.ts file, which defines the wizard elements and their properties.
 * 
 * The Wizard works on the following main components:
 * - CategoryIndicator: Displays the current category and the progress within all available categories
 * - ElementRenderer: Displays the current question and the input element for the answer
 * - WizardNavigation: Handles the navigation buttons
 * 
 * Value Change Flow:
 * 1. User interacts with an element (e.g., types in text field)
 * 2. Element calls onChange with new value
 * 3. handleFieldChange is called:
 *    - Updates formData with new value
 * 4. Effect triggers to filter questions based on new formData
 * 5. Effect triggers to check category completion
 * 
 * Navigation Flow (Next/Skip):
 * 1. User clicks next/skip button
 * 2. handleNextStep is called:
 *    - Sets checkValidity to true
 *    - Validates current step (isStepValid)
 *      - Checks if field is required
 *      - Runs validation function if exists
 *    - If valid or skipping:
 *      - If last step: calls onComplete with formData
 *      - Otherwise: increments currentStep
 * 3. Effect triggers to:
 *    - Update currentQuestion
 *    - Add question to touchedQuestions
 *    - Reset validation state
 *    - Check category completion
 */
export const TournamentWizard = ({ onComplete, onCancel, wizardElements }: TournamentWizardProps) => {
  const { t } = useTranslation();

  // State Management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeQuestions, setActiveQuestions] = useState<IWizardElement[]>(wizardElements);
  const [touchedQuestions, setTouchedQuestions] = useState<IWizardElement[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IWizardElement>(activeQuestions[currentStep]);
  const [checkValidity, setCheckValidity] = useState(false);
  const [completedCategories, setCompletedCategories] = useState<Category[]>([]);

  // Get unique categories from wizard fields
  const categories = Array.from(new Set(wizardElements.map(field => field.category)));

  // Get current category
  const currentCategory = currentQuestion?.category;

  // Navigation State
  const isLastStep = currentStep === activeQuestions.length - 1;
  const isFirstStep = currentStep === 0;
  const canSkip = !currentQuestion?.required &&
    (formData[currentQuestion?.name] === undefined ||
      formData[currentQuestion?.name] === '' ||
      formData[currentQuestion?.name] === null);

  /**
   * Updates the current question when the step changes
   */
  useEffect(() => {
    setCurrentQuestion(activeQuestions[currentStep]);
    setTouchedQuestions(prev => [...prev, activeQuestions[currentStep]]);
  }, [currentStep, activeQuestions]);

  /**
   * Filters questions based on form data
   * Some questions are only shown based on previous answers
   */
  useEffect(() => {
    const filteredQuestions = wizardElements.filter(field =>
      !field.showIf || field.showIf(formData)
    );
    setActiveQuestions(filteredQuestions);
  }, [formData, wizardElements]);

  /**
   * Resets validation state when question changes
   */
  useEffect(() => {
    setCheckValidity(false);
  }, [currentQuestion?.name, formData]);

  /**
   * Updates completed categories when moving to a new category
   */
  useEffect(() => {
    if (!currentCategory) return;

    const currentCategoryQuestions = wizardElements.filter(
      field => field.category === currentCategory
    );

    const isCurrentCategoryComplete = currentCategoryQuestions.every(question => {
      if (!touchedQuestions.includes(question) && question?.showIf?.(formData)) return false;
      if (!question.required) return true;
      const value = formData[question.name];
      if (value === undefined || value === '' || value === null) return false;
      return question.validation?.fun(value) ?? true;
    });

    if (isCurrentCategoryComplete && !completedCategories.includes(currentCategory)) {
      setCompletedCategories(prev => [...prev, currentCategory]);
    }
  }, [currentCategory, formData, wizardElements, touchedQuestions]);

  // Validation Functions

  /**
   * Checks if the current step's value is valid
   * Takes into account required fields and validation rules
   */
  const isStepValid = (): boolean => {
    const value = formData[currentQuestion?.name];

    // Optional fields can be empty
    if (!currentQuestion?.required && (value === undefined || value === null)) {
      return true;
    }

    // Required fields must have a value
    if (value === undefined || value === '' || value === null) {
      return false;
    }

    // Check custom validation rules if they exist
    return currentQuestion.validation?.fun(value) ?? true;
  };

  // Event Handlers

  /**
   * Updates form data when a field value changes
   */
  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Gets questions for the current category
   * Used for progress calculation and navigation
   */
  const getCurrentCategoryQuestions = () => {
    return activeQuestions.filter(
      question => question.category === currentCategory
    );
  };

  /**
   * Gets the current step within the current category
   */
  const getCurrentCategoryStep = () => {
    const categoryQuestions = getCurrentCategoryQuestions();
    return categoryQuestions.findIndex(
      question => question.name === currentQuestion?.name
    );
  };

  /**
   * Handles navigation to next step or form completion
   * Validates current step before proceeding
   */
  const handleNextStep = () => {
    setCheckValidity(true);

    if (!isStepValid()) {
      return;
    }
    if (isLastStep) {
      onComplete(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Handles navigation to previous step or cancellation
   */
  const handleBack = () => {
    if (isFirstStep) {
      onCancel();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  /**
   * Gets progress information for each category
   */
  const getCategoryProgress = () => {
    const progress: { [key: string]: { current: number; total: number } } = {};

    categories.forEach(category => {
      const categoryQuestions = activeQuestions.filter(q => q.category === category);
      const currentIndex = category === currentCategory
        ? getCurrentCategoryStep()
        : completedCategories.includes(category)
          ? categoryQuestions.length
          : 0;

      progress[category] = {
        current: currentIndex,
        total: categoryQuestions.length
      };
    });

    return progress;
  };

  return (
    <div className="flex gap-8 min-h-128">
      {/* Category Indicator */}

      <div className='flex flex-col gap-4 items-stretch justify-center' data-testid="wizard-category-indicator">   
          <CategoryIndicator
            categories={categories}
            currentCategory={currentCategory}
            completedCategories={completedCategories}
            categoryProgress={getCategoryProgress()}
          />
      </div>


      {/* Main Wizard Content */}
      
      <motion.div initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: (categories.length) * 0.5, ease: easeInOut } }}
          exit={{ x: 200, opacity: 0, transition: { delay: (categories.length) * 0.5, ease: easeInOut } }} className='flex flex-col flex-1'>
      <div className="flex flex-col flex-1">
        <Card className="flex-1 min-h-150 max-h-150 justify-between">
          {/* Help Icon */}
          <div className="flex items-stretch justify-end gap-2">
            <Help
              explanation={t(currentQuestion?.explanation ?? '')}
              size="lg"
              data-testid="wizard-help"
            />
          </div>

          {/* Question Display */}
          <div className="text-center mb-8 mx-8">
            <div className="flex items-center justify-center gap-2" data-testid="wizard-question">
              <LargeText data-testid="wizard-question">
                {t(currentQuestion?.question)}
              </LargeText>
            </div>
          </div>

          {/* Input Element */}
          <div className="w-full px-8">
            <ElementRenderer
              element={currentQuestion}
              value={formData[currentQuestion?.name]}
              onChange={(value: any) => handleFieldChange(currentQuestion.name, value)}
              isValid={checkValidity ? isStepValid() : true}
              data-testid="wizard-element"
            />
          </div>

          {/* Navigation Buttons */}
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
      
      </div>
      </motion.div>
    </div>
  );
}; 