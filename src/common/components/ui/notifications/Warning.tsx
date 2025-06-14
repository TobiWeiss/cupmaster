interface WarningProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const Warning = ({ message, onConfirm, onCancel }: WarningProps): JSX.Element => {
    return (
        <div className="msg-container flex flex-col gap-4">
            <h1 className="text-lg font-bold">{message}</h1>
            <div className="flex flex-row gap-4">
                <button onClick={onConfirm} className="btn btn-primary">Bestätigen</button>
                <button onClick={onCancel} className="btn btn-secondary">Abbrechen</button>
            </div>
        </div>
    );
}

