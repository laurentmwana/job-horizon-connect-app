import { cn } from '@/lib/utils'; // Ajout de l'import pour cn
import React from 'react';

type Props = {
    className?: string;
    width?: number | string;
    height?: number | string;
    variant?: 'default' | 'simple' | 'icon';
    size?: 'sm' | 'md' | 'lg';
};

export const AppLogo: React.FC<Props> = ({ className = '', variant = 'default', size = 'md', ...props }) => {
    // Configuration des tailles
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
    };

    // Rendu conditionnel selon la variante
    const renderLogo = () => {
        switch (variant) {
            case 'simple':
                return <h2 className={cn('font-semibold tracking-tight', sizeClasses[size])}>JHC</h2>;
            case 'icon':
                return (
                    <div
                        className={cn(
                            'flex items-center justify-center rounded-lg bg-primary font-bold text-white',
                            sizeClasses[size],
                            size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12',
                        )}
                    >
                        JHC
                    </div>
                );
            default:
                return (
                    <h2 className={cn('font-semibold tracking-tight', sizeClasses[size])}>
                        Job <span className="text-primary">Horizon</span> Connect
                    </h2>
                );
        }
    };

    return (
        <div className={cn('flex items-center', className)} {...props}>
            {renderLogo()}
        </div>
    );
};
