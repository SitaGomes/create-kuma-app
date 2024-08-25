import { HTMLAttributes, ReactNode } from 'react';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export const Heading = ({ children, ...props }: HeadingProps) => {
  return (
    <h1 className="text-red" {...props}>
      {children}
    </h1>
  );
};
