import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    isFluid?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
    children,
    className = '',
    isFluid = false
}) => {
    return (
        <div className={`
      py-6 px-4 sm:px-6 lg:px-8
      ${isFluid ? 'w-full' : 'max-w-7xl mx-auto'}
      ${className}
    `}>
            {children}
        </div>
    );
};
