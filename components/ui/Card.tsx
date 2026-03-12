import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, description, footer }) => {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
            {(title || description) && (
                <div className="p-6 pb-0">
                    {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
                    {description && <p className="text-sm text-gray-500 mt-1.5">{description}</p>}
                </div>
            )}
            <div className="p-6">{children}</div>
            {footer && <div className="p-6 pt-0 border-t border-gray-100 mt-auto">{footer}</div>}
        </div>
    );
};
