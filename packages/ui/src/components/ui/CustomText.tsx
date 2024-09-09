import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@kuma/ui/lib/utils';

export const textVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-orange-400',
      secondary: 'text-secondary',
      default: 'text-foreground',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    weight: 'normal',
  },
});

export interface CustomTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span';
}

export const CustomText = React.forwardRef<
  HTMLParagraphElement,
  CustomTextProps
>(({ className, variant, size, weight, as = 'p', ...props }, ref) => {
  const Comp = as;
  return (
    <Comp
      ref={ref}
      className={cn(textVariants({ variant, size, weight, className }))}
      {...props}
    />
  );
});

CustomText.displayName = 'CustomText';
