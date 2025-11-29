import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';

export default function About() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const totalImages = 12;
  const [isInView, setIsInView] = useState(false); // Trigger for scroll visibility
  const [isVisibleLeft, setIsVisibleLeft] = useState(false); // For left section (title + icons)
  const [isVisibleRight, setIsVisibleRight] = useState(false); // For right section (large image)
  const [isVisibleButtons, setIsVisibleButtons] = useState(false); // For buttons
  const [flippedIcon, setFlippedIcon] = useState(null); // Track which icon is flipped (mobile only)
  const mainRef = useRef(null); // Ref for intersection observer

  // Mapping for icon names shown on hover
  const iconNames = {
    1: 'Laravel',
    2: 'React',
    3: 'Tailwind CSS',
    4: 'JavaScript',
    5: 'Vue',
    6: 'Nuxt',
    7: 'C#',
    8: 'PHP',
    9: 'Inertia',
    10: 'MySql',
    11: 'MSSQL Server',
    12: 'Figma',
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

  // Intersection Observer: Trigger when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Run once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    );

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Staggered animations: Trigger only when in view
  useEffect(() => {
    if (!isInView) return;

    const timerLeft = setTimeout(() => setIsVisibleLeft(true), 200); // Slight delay for cascade
    const timerRight = setTimeout(() => setIsVisibleRight(true), 500);
    const timerButtons = setTimeout(() => setIsVisibleButtons(true), 800);

    return () => {
      clearTimeout(timerLeft);
      clearTimeout(timerRight);
      clearTimeout(timerButtons);
    };
  }, [isInView]);

  const icons = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <div ref={mainRef} className="flex min-h-[90vh] flex-col items-center justify-center">
        <div className="grid grid-cols-1 gap-0 px-4 py-10 sm:gap-4 md:grid-cols-2 md:gap-8 md:px-0">
          {/* Left section - fades/slides from left to right */}
          <div
            className={`text-textPrimary flex flex-col items-center justify-center p-4 transition-all duration-700 ease-out sm:p-6 md:p-8 ${
              isVisibleLeft ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <h2 className="text-center text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
              I'm a Full-Stack Web Developer
            </h2>

            <div className="mt-6 grid w-full grid-cols-2 justify-items-center gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6 md:mt-10 md:w-[60%] md:grid-cols-4 md:gap-10">
              {icons.map((iconNum) => (
                <div
                  key={iconNum}
                  className="group relative flex aspect-square h-20 w-20 items-center justify-center py-2 md:h-16 md:w-16 md:py-0"
                  onClick={() => {
                    if (isMobile) {
                      setFlippedIcon(flippedIcon === iconNum ? null : iconNum);
                    }
                  }}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`relative h-full w-full transition-transform duration-500 ${
                      isMobile && flippedIcon === iconNum ? 'transform-[rotateY(180deg)]' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front side - Icon */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={`/icons/icon_${iconNum}.png`}
                        alt={iconNames[iconNum]}
                        className={`h-full w-full cursor-pointer rounded-2xl object-contain drop-shadow-sm transition-transform duration-500 ease-in-out md:cursor-help md:drop-shadow-2xl ${
                          iconNum === currentImage ? 'scale-110' : ''
                        }`}
                      />
                    </div>
                    {/* Back side - Icon Name (mobile only) */}
                    <div
                      className="bg-primary/90 absolute inset-0 flex items-center justify-center rounded-2xl p-2 text-center text-sm font-bold text-white md:hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      {iconNames[iconNum]}
                    </div>
                  </div>
                  {/* Desktop tooltip - only visible on md and up */}
                  <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-3 hidden -translate-x-1/2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 ease-in-out group-hover:opacity-100 md:block">
                    {iconNames[iconNum]}
                  </span>
                  {/* Arrow pointer for tooltip - only visible on md and up */}
                  <span className="bg-primary/90 absolute bottom-full left-1/2 z-10 mb-1 hidden h-2 w-2 -translate-x-1/2 rotate-45 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100 md:block"></span>
                </div>
              ))}
            </div>
          </div>
          {/* Right section - fades/slides from right to left */}
          <div
            className={`hidden items-center justify-center p-4 transition-all duration-700 ease-out sm:p-6 md:flex md:p-8 ${
              isVisibleRight ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="group relative">
              {' '}
              {/* Added relative wrapper for large image tooltip */}
              <img
                src={`/icons/icon_${currentImage}.png`}
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
        {/* Buttons - fade/slide from bottom to top */}
        <div
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-700 ease-out sm:flex-row sm:gap-5 ${
            isVisibleButtons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <a href="/Dasalla - CV.pdf" download>
            <Button className="text-base sm:text-lg md:text-xl" variant="solid">
              VIEW CV
            </Button>
          </a>

          <a href="#contact">
            <Button className="text-base sm:text-lg md:text-xl" variant="outlined">
              {' '}
              LET'S WORK TOGETHER
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
