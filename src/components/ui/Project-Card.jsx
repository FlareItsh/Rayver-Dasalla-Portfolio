import { ExternalLink, Github } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

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
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!liveDemoLink || !showPreview) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const previewWidth = 400;
      const previewHeight = 300;
      const offset = 15;

      // Start with cursor position
      let x = e.clientX;
      let y = e.clientY;

      // Check space on all sides
      const spaceRight = viewportWidth - e.clientX;
      const spaceLeft = e.clientX;

      // Determine horizontal position - always to the side
      if (spaceRight >= previewWidth + offset) {
        // Enough space on right - place to the right
        x = e.clientX + offset;
      } else if (spaceLeft >= previewWidth + offset) {
        // Not enough on right - place to the left
        x = e.clientX - previewWidth - offset;
      } else {
        // Not enough on either side, try to fit on right with bounds
        x = e.clientX + offset;
        x = Math.max(10, Math.min(x, viewportWidth - previewWidth - 10));
      }

      // Determine vertical position - center on cursor, keep in viewport
      y = e.clientY - previewHeight / 2;
      y = Math.max(10, Math.min(y, viewportHeight - previewHeight - 10));

      setPreviewPosition({ x, y });
    });
  };

  const handleMouseEnter = () => {
    if (!liveDemoLink) return;

    // Show preview immediately
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-400/20 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] ${className}`}
    >
      {/* Top section: Image - Fixed h-48 container ensures consistent height; image fills full width/height with crop if needed */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
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

  // Render as plain div with preview
  return (
    <>
      {cardContent}

      {/* Live Demo Preview - Only show on desktop */}
      {showPreview && liveDemoLink && (
        <div
          className="border-primary bg-background pointer-events-none fixed z-10000 hidden overflow-hidden rounded-lg border-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform md:block"
          style={{
            left: `${previewPosition.x}px`,
            top: `${previewPosition.y}px`,
            width: '400px',
            height: '300px',
            transform: 'translateZ(0)', // GPU acceleration
          }}
        >
          <div className="bg-primary flex h-8 items-center justify-between px-3">
            <span className="text-xs font-semibold text-white">Preview</span>
            <ExternalLink className="h-3 w-3 text-white" />
          </div>
          <div className="h-[calc(100%-2rem)] w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-top"
              loading="eager"
              draggable="false"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
