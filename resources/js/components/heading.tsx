import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type HeadingProps = PropsWithChildren<{ title: string; className?: string }>;

export function Heading({ title, className = '', children }: HeadingProps) {
    return (
        <div className={cn('mb-8 space-y-0.5', className)}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {children && <p className="text-sm text-muted-foreground">{children}</p>}
        </div>
    );
}

type HeadingSmallProps = PropsWithChildren<{ title: string }>;

export function HeadingSmall({ title, children }: HeadingSmallProps) {
    return (
        <div>
            <h3 className="mb-0.5 text-base font-medium">{title}</h3>
            {children && <p className="text-sm text-muted-foreground">{children}</p>}
        </div>
    );
}

type HeadingLargeProps = PropsWithChildren<{ title: string; className?: string }>;

export function HeadingLarge({ title, children, className }: HeadingLargeProps) {
    return (
        <div className={cn('mb-12 space-y-0.5', className)}>
            <h1 className="mb-0.5 text-2xl font-semibold lg:text-4xl">{title}</h1>
            {children && <p className="text-base text-muted-foreground">{children}</p>}
        </div>
    );
}
