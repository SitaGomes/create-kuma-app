'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@kuma/ui/lib/utils';

export type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, ...props }, ref) => {
    const Comp = Slot;

    return (
      <Comp
        className={cn(
          'transition-colors duration-200 hover:underline',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

CustomLink.displayName = 'CustomLink';

export { CustomLink };
