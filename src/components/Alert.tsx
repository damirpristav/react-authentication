import { Button } from './Button';

export const Alert = ({ text, buttonLabel, isButtonDisabled, isButtonLoading, buttonAction }: Props) => {
  return (
    <div className="alert">
      <p>{text}</p>
      {buttonAction && (
        <Button
          type="button"
          className="button"
          onClick={buttonAction}
          label={buttonLabel}
          disabled={isButtonDisabled}
          isLoading={isButtonLoading}
        />
      )}
    </div>
  );
};

type Props = {
  text: string;
  buttonLabel?: string;
  isButtonLoading?: boolean;
  isButtonDisabled?: boolean;
  buttonAction?: () => void;
};
