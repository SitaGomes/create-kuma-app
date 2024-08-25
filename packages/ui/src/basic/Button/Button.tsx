import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
};

export const Button = ({
  children,
  primary = false,
  size = 'medium',
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'bg-orange-500 hover:bg-orange-600 text-white'
    : 'border-2 border-slate-400 hover:border-slate-500 hover:bg-slate-100 text-black';
  const sizeClass =
    size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';

  return (
    <button
      type="button"
      className={`${mode} ${sizeClass} px-4 py-2 rounded-md transition-colors duration-200 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
};
