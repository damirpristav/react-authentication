import { ButtonHTMLAttributes } from 'react';

export const Button = ({ label, isLoading, ...props }: Props) => {
  return (
    <button className="button" {...props}>
      <span className={isLoading ? 'opacity-0' : ''}>{label || 'submit'}</span>
      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </button>
  );
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isLoading?: boolean;
}
