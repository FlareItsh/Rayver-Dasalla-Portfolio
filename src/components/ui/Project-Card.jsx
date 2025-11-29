import { ExternalLink, Github } from 'lucide-react';
import React from 'react';

const ProjectCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  languages = [], // New prop: Array of image src strings for language/tool icons
  githubLink, // Optional: GitHub repository link
  liveDemoLink, // Optional: Live demo link
  className = '', // Optional: Additional classes for the card container
}) => {
  const cardContent = (
    <div
      className={`hover:shadow-3xl flex w-full flex-col overflow-hidden rounded-lg border border-gray-400/20 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-gray-500/50 ${className}`}
    >
      {/* Top section: Image - Fixed h-48 container ensures consistent height; image fills full width/height with crop if needed */}
      <div className="relative h-40 overflow-hidden">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      {/* Bottom section: Title, subtitle, languages, and link buttons */}
      <div className="flex flex-col p-3">
        <div className="flex flex-col space-y-1">
          <h2 className="text-textPrimary hover:text-primary text-base font-bold transition-colors duration-300">
            {title}
          </h2>
          <p className="text-textPrimary/70 text-xs font-medium">{subtitle}</p>
          {/* Languages icons row */}
          {languages.length > 0 && (
            <div className="mt-2 flex gap-2">
              {languages.map((langSrc, index) => (
                <img
                  key={index}
                  src={langSrc}
                  alt=""
                  className="h-6 w-6 rounded object-contain transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>
          )}
        </div>
        {/* Link buttons row */}
        {(githubLink || liveDemoLink) && (
          <div className="mt-3 flex gap-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 text-textPrimary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render as plain div (no longer wrapping in link)
  return cardContent;
};

export default ProjectCard;
