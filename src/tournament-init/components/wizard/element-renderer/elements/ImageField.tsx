import { Upload } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { WizardElementProps } from '../ElementRenderer';
import { useTranslation } from 'react-i18next';
import { easeInOut, motion } from 'framer-motion';

export const ImageField = ({ element: field, value, onChange }: WizardElementProps) => {
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex items-center space-x-4 justify-center">
      {value && (
        <img
          src={value}
          alt="Preview"
          className="h-16 w-16 object-cover rounded-md"
        />
      )}
      <Button
        variant="outline"
        size="lg"
        icon={Upload}
        onClick={() => document.getElementById(field.name)?.click()}
      >
        {t('common.upload')}
      </Button>
      <input
        id={field.name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        data-testid={`wizard-input-${field.name}`}
      />
    </motion.div>
  );
}; 