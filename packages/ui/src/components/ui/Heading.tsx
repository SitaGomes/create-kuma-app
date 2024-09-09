import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@kuma/ui/lib/utils';

const headingVariants = cva('font-bold', {
  variants: {
    variant: {
      primary: 'text-orange-400',
      secondary: 'text-secondary',
    },
    size: {
      default: 'text-2xl',
      sm: 'text-xl',
      lg: 'text-3xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, size, as = 'h1', ...props }, ref) => {
    const Comp = as;
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Heading.displayName = 'Heading';
