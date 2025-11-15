import { ExternalLink } from 'lucide-react';
import React from 'react';

const SkillCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  languages = [], // New prop: Array of image src strings for language/tool icons
  indicator = <ExternalLink />, // Default to ExternalLink; can be overridden with any ReactNode
  link, // Optional: URL to link to (makes the whole card clickable)
  className = '', // Optional: Additional classes for the card container
}) => {
  const cardContent = (
    <div
      className={`hover:shadow-3xl flex w-full max-w-md min-w-[300px] flex-col overflow-hidden rounded-lg border border-gray-400/20 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-gray-500/50 ${className}`} // Added max-w-md (448px) to cap width on large screens; pairs with min-w for balanced sizing
    >
      {/* Top section: Image - Fixed h-48 container ensures consistent height; image fills full width/height with crop if needed */}
      <div className="relative h-52 overflow-hidden">
        {' '}
        {/* Added overflow-hidden for smooth image transform */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" // Fixed: w-lg -> w-full for full image coverage
        />
      </div>

      {/* Bottom section: Title, subtitle, languages, and indicator */}
      <div className="flex flex-none items-start justify-between p-4">
        {' '}
        {/* Fixed: flex-0 -> flex-none for standard Tailwind */}
        <div className="flex flex-1 flex-col space-y-1">
          {' '}
          {/* Added flex-1 to take available space */}
          <h2 className="text-textPrimary hover:text-primary text-lg font-bold transition-colors duration-300">
            {title}
          </h2>{' '}
          {/* Title color shift on hover */}
          <p className="text-textPrimary/70 text-sm font-medium">{subtitle}</p>
          {/* New: Languages icons row */}
          {languages.length > 0 && (
            <div className="mt-2 flex gap-3">
              {' '}
              {/* Removed redundant space-x-2 */}
              {languages.map((langSrc, index) => (
                <img
                  key={index}
                  src={langSrc}
                  alt=""
                  className="h-8 w-8 rounded object-contain transition-transform duration-300 hover:scale-110" // Small icons with hover scale
                />
              ))}
            </div>
          )}
        </div>
        {/* Right side indicator */}
        <div className="text-textPrimary ml-4 flex flex-col items-center space-y-1 transition-transform duration-300 hover:scale-110">
          {' '}
          {/* Added ml-4 for spacing */}
          {indicator}
        </div>
      </div>
    </div>
  );

  // If link is provided, wrap the card in an <a> tag to make it clickable
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline" // Moved hover classes to cardContent for unified effects
      >
        {cardContent}
      </a>
    );
  }

  // Otherwise, render as plain div
  return cardContent;
};

export default SkillCard;
