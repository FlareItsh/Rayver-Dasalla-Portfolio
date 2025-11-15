import React from 'react';

export default function Button({ children, variant = 'solid', className = '', ...props }) {
    const baseClasses =
        'inline-flex items-center justify-center px-6 py-3 font-primary font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const solidClasses =
        'border-2 border-transparent bg-[var(--color-darkButtonPrimary)] text-[var(--color-lightButtonPrimary)] hover:border-[var(--color-textPrimary)] hover:text-[var(--color-textPrimary)] hover:bg-transparent focus:ring-[var(--color-textPrimary)]';

    const outlinedClasses =
        'border-2 border-[var(--color-textPrimary)] text-[var(--color-textPrimary)] hover:bg-[var(--color-textPrimary)] hover:text-[var(--color-lightButtonPrimary)] focus:ring-[var(--color-textPrimary)]';

    const variantClasses = variant === 'outlined' ? outlinedClasses : solidClasses;

    return (
        <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {children}
        </button>
    );
}
