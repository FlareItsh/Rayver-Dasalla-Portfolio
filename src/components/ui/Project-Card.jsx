import { ExternalLink, Github } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ProjectCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  languages = [],
  githubLink,
  liveDemoLink,
  className = '',
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!liveDemoLink || !showPreview) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const previewWidth = 400;
      const previewHeight = 280;
      const offset = 15;

      let x = e.clientX;
      let y = e.clientY;

      const spaceRight = viewportWidth - e.clientX;
      const spaceLeft = e.clientX;

      if (spaceRight >= previewWidth + offset) {
        x = e.clientX + offset;
      } else if (spaceLeft >= previewWidth + offset) {
        x = e.clientX - previewWidth - offset;
      } else {
        x = e.clientX + offset;
        x = Math.max(10, Math.min(x, viewportWidth - previewWidth - 10));
      }

      y = e.clientY - previewHeight / 2;
      y = Math.max(10, Math.min(y, viewportHeight - previewHeight - 10));

      setPreviewPosition({ x, y });
    });
  };

  const handleMouseEnter = () => {
    if (!liveDemoLink) return;
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
      className={`group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-400/20 bg-white/5 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] ${className}`}
    >
      {/* Top section: Image */}
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </div>

      {/* Bottom section: Content */}
      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-textPrimary hover:text-primary text-lg font-bold transition-colors duration-300 sm:text-xl">
            {title}
          </h2>
          <p className="text-textPrimary/70 text-xs leading-relaxed sm:text-sm">{subtitle}</p>

          {/* Languages icons row */}
          {languages.length > 0 && (
            <div className="pt-2 flex items-center gap-2">
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
          <div className="mt-4 flex items-center gap-2.5">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 text-textPrimary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
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

      {/* Live Demo Preview - Sleek macOS Window on desktop */}
      {showPreview && liveDemoLink && (
        <div
          className="pointer-events-none fixed z-10000 hidden overflow-hidden rounded-xl border border-white/20 bg-primary shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform md:block"
          style={{
            left: `${previewPosition.x}px`,
            top: `${previewPosition.y}px`,
            width: '400px',
            height: '280px',
            transform: 'translateZ(0)',
          }}
        >
          {/* Header */}
          <div className="flex h-8 items-center justify-between border-b border-white/10 bg-black/20 px-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></span>
            </div>
            <span className="text-[11px] font-medium text-white/80 truncate max-w-[200px]">
              {liveDemoLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
            <ExternalLink className="h-3 w-3 text-white/80" />
          </div>
          {/* Preview Image */}
          <div className="h-[calc(100%-2rem)] w-full overflow-hidden bg-background">
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
