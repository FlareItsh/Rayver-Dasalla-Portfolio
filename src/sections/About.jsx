import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';

export default function About() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const totalImages = 12;
  const [isInView, setIsInView] = useState(false); // Trigger for scroll visibility
  const [isVisibleLeft, setIsVisibleLeft] = useState(false); // For left section
  const [isVisibleRight, setIsVisibleRight] = useState(false); // For right section
  const [isVisibleButtons, setIsVisibleButtons] = useState(false); // For buttons
  const [flippedIcon, setFlippedIcon] = useState(null); // Track which icon is flipped (mobile only)
  const [confetti, setConfetti] = useState([]); // Track confetti particles
  const mainRef = useRef(null); // Ref for intersection observer

  // Rich mapping for tech items with categories & descriptions
  const iconDetails = {
    1: { name: 'Laravel', category: 'Backend Framework', desc: 'Robust MVC architecture & RESTful APIs' },
    2: { name: 'React', category: 'Frontend Library', desc: 'Reactive UI components & modern state flow' },
    3: { name: 'Tailwind CSS', category: 'Modern Styling', desc: 'Utility-first responsive design systems' },
    4: { name: 'JavaScript', category: 'Core Language', desc: 'Modern ES6+ dynamic scripting & logic' },
    5: { name: 'Vue', category: 'Frontend Framework', desc: 'Progressive, intuitive user interfaces' },
    6: { name: 'Nuxt', category: 'Full-Stack Framework', desc: 'SSR & performance-optimized web apps' },
    7: { name: 'C#', category: 'Backend & Desktop', desc: 'Object-oriented application engineering' },
    8: { name: 'PHP', category: 'Server Scripting', desc: 'Server-side data management & API creation' },
    9: { name: 'Inertia', category: 'Full-Stack Bridge', desc: 'Seamless modern SPA connection with Laravel' },
    10: { name: 'MySQL', category: 'Relational Database', desc: 'Schema design, relations & fast queries' },
    11: { name: 'MSSQL Server', category: 'Enterprise DB', desc: 'Enterprise data storage & indexing' },
    12: { name: 'Figma', category: 'UI/UX Design', desc: 'Wireframing, prototyping & visual mockups' },
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

    const timerLeft = setTimeout(() => setIsVisibleLeft(true), 200);
    const timerRight = setTimeout(() => setIsVisibleRight(true), 400);
    const timerButtons = setTimeout(() => setIsVisibleButtons(true), 600);

    return () => {
      clearTimeout(timerLeft);
      clearTimeout(timerRight);
      clearTimeout(timerButtons);
    };
  }, [isInView]);

  const icons = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate confetti particles when icon flips
  const createConfetti = (iconNum) => {
    const particles = [];
    const colors = ['#16302b', '#1a1a40', '#ffffff', '#1e413a'];

    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const velocity = 60 + Math.random() * 40;

      particles.push({
        id: `${iconNum}-${i}-${Date.now()}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 30,
        size: Math.random() * 6 + 3,
        delay: 0,
        duration: 0.6 + Math.random() * 0.4,
        rotation: Math.random() * 360,
      });
    }
    return particles;
  };

  const handleIconClick = (iconNum) => {
    if (isMobile) {
      const newFlipped = flippedIcon === iconNum ? null : iconNum;
      setFlippedIcon(newFlipped);

      if (newFlipped !== null) {
        const newConfetti = createConfetti(iconNum).map((particle) => ({
          ...particle,
          iconNum,
        }));
        setConfetti(newConfetti);
        setTimeout(() => setConfetti([]), 1000);
      } else {
        setConfetti([]);
      }
    }
  };

  return (
    <>
      <div
        ref={mainRef}
        className="relative my-10 px-4 sm:px-8 md:my-20 md:px-20"
      >
        {/* Section Number Background */}
        <div className="pointer-events-none absolute top-0 left-4 text-[12rem] leading-none font-black opacity-[0.03] select-none sm:left-10 sm:text-[16rem] md:text-[20rem]">
          01
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left section: Narrative & CTAs */}
          <div
            className={`text-textPrimary flex flex-col justify-center transition-all duration-700 ease-out lg:col-span-7 ${
              isVisibleLeft ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <span className="text-textPrimary/60 mb-2 text-xs font-bold uppercase tracking-widest sm:text-sm">
              About Me
            </span>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              I'm a Full-Stack Web Developer
            </h2>

            <div className="text-textPrimary/75 mt-5 space-y-3.5 text-sm leading-relaxed sm:text-base md:text-lg">
              <p>
                I build clean, accessible, and high-performance digital products that solve real-world problems. With a deep focus on blending thoughtful UI design with scalable backend architectures, I transform ideas into reliable, end-to-end web experiences.
              </p>
              <p>
                Whether crafting responsive interfaces with React & Tailwind or engineering robust APIs and database systems with Laravel & MySQL, I strive for code that is clean, maintainable, and built to scale.
              </p>
            </div>

            {/* Core Highlights */}
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
              {[
                'Full-Stack Architecture',
                'RESTful APIs',
                'Responsive UI/UX',
                'Database Optimization',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-400/20 bg-white/5 px-3 py-1 text-xs font-medium text-textPrimary/90 shadow-xs sm:px-3.5 sm:py-1.5 sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons directly under the bio */}
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 transition-all duration-700 ease-out ${
                isVisibleButtons ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <a href="/Dasalla - CV.pdf" download className="w-full sm:w-auto">
                <Button className="w-full text-base sm:w-auto sm:text-lg md:text-xl" variant="solid">
                  VIEW CV
                </Button>
              </a>
              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  className="w-full text-base sm:w-auto sm:text-lg md:text-xl"
                  variant="outlined"
                >
                  LET'S WORK TOGETHER
                </Button>
              </a>
            </div>
          </div>

          {/* Right section: Interactive Tech Showcase Card */}
          <div
            className={`flex w-full justify-center transition-all duration-700 ease-out lg:col-span-5 ${
              isVisibleRight ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="w-full max-w-lg rounded-2xl border border-gray-400/20 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="text-textPrimary text-base font-bold sm:text-lg">
                    Technologies & Tools
                  </h3>
                </div>
                <span className="text-textPrimary/50 text-xs font-medium">Interactive Matrix</span>
              </div>

              {/* Spotlight Banner showing active/hovered tech */}
              <div className="mb-6 flex items-center gap-3.5 rounded-xl border border-gray-400/20 bg-white/10 p-3.5 transition-all duration-300 sm:p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 p-2 shadow-inner sm:h-14 sm:w-14">
                  <img
                    src={`/icons/icon_${currentImage}.png`}
                    alt={iconDetails[currentImage].name}
                    className="h-full w-full object-contain transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-textPrimary text-base font-bold sm:text-lg truncate">
                      {iconDetails[currentImage].name}
                    </h4>
                    <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary sm:text-xs">
                      {iconDetails[currentImage].category}
                    </span>
                  </div>
                  <p className="text-textPrimary/70 mt-0.5 text-xs sm:text-sm line-clamp-1">
                    {iconDetails[currentImage].desc}
                  </p>
                </div>
              </div>

              {/* Icons Grid (4 columns x 3 rows) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {icons.map((iconNum) => {
                  const isActive = iconNum === currentImage;
                  return (
                    <div
                      key={iconNum}
                      className="group relative flex aspect-square cursor-pointer items-center justify-center rounded-xl transition-all duration-300 hover:scale-105"
                      style={{
                        perspective: '1000px',
                      }}
                      onMouseEnter={() => {
                        if (!isMobile) setCurrentImage(iconNum);
                      }}
                      onClick={() => {
                        setCurrentImage(iconNum);
                        handleIconClick(iconNum);
                      }}
                    >
                      {/* Confetti particles */}
                      {flippedIcon === iconNum &&
                        confetti
                          .filter((p) => p.iconNum === iconNum)
                          .map((particle) => (
                            <div
                              key={particle.id}
                              className="pointer-events-none absolute"
                              style={{
                                left: '50%',
                                top: '50%',
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                backgroundColor: particle.color,
                                borderRadius: '50%',
                                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                                animation: `confetti-burst ${particle.duration}s ease-out forwards`,
                                transform: `translate(-50%, -50%)`,
                                '--tx': `${particle.x}px`,
                                '--ty': `${particle.y}px`,
                                '--rotation': `${particle.rotation}deg`,
                              }}
                            />
                          ))}

                      <div
                        className={`relative flex h-full w-full items-center justify-center rounded-xl border transition-all duration-300 ${
                          isActive
                            ? 'border-primary/50 bg-primary/10 ring-2 ring-primary/40 shadow-md'
                            : 'border-gray-400/20 bg-white/5 hover:border-gray-400/40 hover:bg-white/15'
                        } ${isMobile && flippedIcon === iconNum ? 'transform-[rotateY(180deg)]' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Front side - Icon */}
                        <div
                          className="absolute inset-0 flex items-center justify-center p-2.5"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <img
                            src={`/icons/icon_${iconNum}.png`}
                            alt={iconDetails[iconNum].name}
                            className={`h-full w-full object-contain drop-shadow-sm transition-transform duration-300 ${
                              isActive ? 'scale-110' : 'group-hover:scale-105'
                            }`}
                          />
                        </div>
                        {/* Back side - Icon Name (mobile only) */}
                        <div
                          className="bg-primary/90 absolute inset-0 flex items-center justify-center rounded-xl p-1 text-center text-[10px] font-bold text-white md:hidden"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          {iconDetails[iconNum].name}
                        </div>
                      </div>

                      {/* Desktop tooltip */}
                      <span className="bg-primary/95 pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 md:block">
                        {iconDetails[iconNum].name}
                      </span>
                      <span className="bg-primary/95 pointer-events-none absolute bottom-full left-1/2 z-20 mb-0.5 hidden h-1.5 w-1.5 -translate-x-1/2 rotate-45 opacity-0 transition-all duration-200 group-hover:opacity-100 md:block"></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
