import React from 'react';

export default function Button({ children, variant = 'solid', className = '', ...props }) {
  const baseClasses =
    'inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all duration-300 ease-out cursor-pointer hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[var(--color-textPrimary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const solidClasses =
    'border-2 border-transparent bg-[var(--color-darkButtonPrimary)] text-[var(--color-lightButtonPrimary)] hover:border-[var(--color-textPrimary)] hover:text-[var(--color-textPrimary)] hover:bg-transparent hover:shadow-lg';

  const outlinedClasses =
    'border-2 border-[var(--color-textPrimary)] text-[var(--color-textPrimary)] hover:bg-[var(--color-textPrimary)] hover:text-[var(--color-lightButtonPrimary)] hover:shadow-lg';

  const variantClasses = variant === 'outlined' ? outlinedClasses : solidClasses;

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
