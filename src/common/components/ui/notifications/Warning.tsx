import { SmallText } from "../../typography/Text";
import { AlertTriangle } from "lucide-react";
import { Icon } from "../Icon";

interface WarningProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const Warning = ({ message, onConfirm, onCancel }: WarningProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-3 min-w-[300px]">
            <div className="flex items-start gap-3">
                <Icon icon={AlertTriangle} size="base" className="text-yellow-500 mt-0.5" />
                <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark flex-1">{message}</SmallText>
            </div>
            <div className="flex flex-row gap-2 justify-end">
                <button 
                    onClick={onCancel} 
                    className="px-3 py-1.5 text-sm rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark text-custom-secondary-light dark:text-custom-secondary-dark hover:bg-custom-secondary-light/10 dark:hover:bg-custom-secondary-dark/10 transition-colors"
                >
                    Abbrechen
                </button>
                <button 
                    onClick={onConfirm} 
                    className="px-3 py-1.5 text-sm rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                    Bestätigen
                </button>
            </div>
        </div>
    );
}

