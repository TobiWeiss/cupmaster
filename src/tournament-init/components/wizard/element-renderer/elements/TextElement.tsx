
import { easeInOut } from "framer-motion";
import { motion } from "framer-motion";
import { WizardElementProps } from "../ElementRenderer";



export const TextElement = ({ element, value, onChange }: WizardElementProps) => {
  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex items-center w-full">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={element.placeholder}
        className="w-full px-4 py-2 pr-10 text-center text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
        required={element.required}
        data-testid={`wizard-input-${element.name}`}
      />
    </motion.div>
  );
};