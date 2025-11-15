import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function About() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const totalImages = 8;

  // Mapping for icon names shown on hover
  const iconNames = {
    1: 'Laravel',
    2: 'React',
    3: 'Tailwind CSS',
    4: 'JavaScript',
    5: 'C#',
    6: 'MySQL',
    7: 'Microsoft SQL Server',
    8: 'Figma',
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCurrentImage(1);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev % totalImages) + 1);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const icons = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
      <div className="flex h-[90vh] flex-col items-center justify-center">
        <div className="grid grid-cols-1 gap-0 px-4 py-10 sm:gap-4 md:grid-cols-2 md:gap-8 md:px-0">
          {/* Left section */}
          <div className="text-textPrimary flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <h2 className="text-center text-6xl leading-tight font-bold">
              I'm a Full-Stack Web Developer
            </h2>

            <div className="mt-6 grid w-full grid-cols-2 justify-items-center gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6 md:mt-10 md:w-[60%] md:grid-cols-4 md:gap-10">
              {icons.map((iconNum) => (
                <div
                  key={iconNum}
                  className="group relative flex h-20 w-full items-center justify-center py-2 md:h-16 md:py-0" // Added relative positioning and 'group' for hover state
                >
                  <img
                    src={`/src/assets/icons/icon_${iconNum}.png`}
                    alt={iconNames[iconNum]}
                    className={`h-full w-full cursor-help rounded-2xl object-contain drop-shadow-sm transition-transform duration-500 ease-in-out md:drop-shadow-2xl ${
                      iconNum === currentImage ? 'scale-110' : ''
                    }`} // Added cursor-help for visual hover cue
                  />
                  {/* Custom tooltip - appears on hover with enhanced styles */}
                  <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 ease-in-out group-hover:opacity-100">
                    {iconNames[iconNum]}
                  </span>
                  {/* Arrow pointer for tooltip */}
                  <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-1 h-2 w-2 -translate-x-1/2 rotate-45 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"></span>
                </div>
              ))}
            </div>
          </div>
          {/* Right section */}
          <div className="hidden items-center justify-center p-4 sm:p-6 md:flex md:p-8">
            <div className="group relative">
              {' '}
              {/* Added relative wrapper for large image tooltip */}
              <img
                src={`/src/assets/icons/icon_${currentImage}.png`}
                alt={iconNames[currentImage]}
                className="h-64 max-h-64 w-64 max-w-64 cursor-help rounded-lg object-contain drop-shadow-2xl sm:h-72 sm:max-h-72 sm:w-72 sm:max-w-72 md:h-96 md:max-h-96 md:w-96 md:max-w-96" // Added cursor-help
              />
              {/* Custom tooltip for large image with enhanced styles */}
              <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 ease-in-out group-hover:opacity-100">
                {iconNames[currentImage]}
              </span>
              {/* Arrow pointer for large tooltip */}
              <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-1 h-2 w-2 -translate-x-1/2 rotate-45 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"></span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <a href="/Dasalla - CV.pdf" download>
            <Button className="text-xl" variant="solid">
              VIEW CV
            </Button>
          </a>

          <a href="#contact">
            <Button className="text-xl" variant="outlined">
              {' '}
              LET'S WORK TOGETHER
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
