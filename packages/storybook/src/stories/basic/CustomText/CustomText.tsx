import { HTMLAttributes, ReactNode } from 'react';

export type CustomTextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export const CustomText = ({ children, ...props }: CustomTextProps) => {
  return (
    <p className="font" {...props}>
      {children}
    </p>
  );
};
