import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowDownRight, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const totalImages = 6;
  const [isVisibleText, setIsVisibleText] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isVisibleTagline, setIsVisibleTagline] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev % totalImages) + 1);
        setIsFading(false);
      }, 220); // Clean 220ms dip without transparent overlapping
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Staggered animations: text at 500ms, image at 1000ms, button at 1500ms
  useEffect(() => {
    const timerText = setTimeout(() => setIsVisibleText(true), 500);
    const timerImage = setTimeout(() => setIsVisibleImage(true), 1000);
    const timerButton = setTimeout(() => setIsVisibleButton(true), 1500);
    const timerTagline = setTimeout(() => setIsVisibleTagline(true), 2000);

    return () => {
      clearTimeout(timerText);
      clearTimeout(timerImage);
      clearTimeout(timerButton);
      clearTimeout(timerTagline);
    };
  }, []);

  // Gentle 3D perspective tilt on mouse move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 7,
      y: (x / (rect.width / 2)) * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const imagePath = `/images/me_${currentImage}.png`;

  return (
    <div className="flex min-h-[80vh] flex-col px-4 md:px-20">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:gap-32 md:py-12">
        {/* Left: Text - fades/slides from left to right */}
        <div
          className={`text-textPrimary order-2 flex max-w-md justify-center transition-all duration-700 ease-out md:order-1 ${
            isVisibleText ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          <div className="flex flex-col text-center md:text-left">
            <span className="text-textPrimary/50 w-full text-left text-xs font-medium italic sm:text-sm md:text-base">
              Hi I'm
            </span>
            <h1 className="w-full text-left text-4xl font-bold sm:text-5xl md:text-6xl lg:text-9xl">
              RAYVER
            </h1>
            <h1 className="w-full text-center text-4xl font-bold sm:text-right sm:text-5xl md:text-right md:text-6xl lg:text-9xl">
              DASALLA
            </h1>
            <span className="text-textPrimary/50 w-full text-center text-xs font-medium italic sm:text-right sm:text-sm md:text-base">
              (Flare)
            </span>

            {/* Personal Tagline */}
            <p
              className={`text-textPrimary/70 mt-4 w-full text-center text-sm font-medium transition-all duration-700 ease-out sm:text-right sm:text-base md:text-lg ${
                isVisibleTagline ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Crafting elegant solutions, one line at a time
            </p>

            {/* Sleek Social Links aligned under the tagline on the left side */}
            <div
              className={`mt-4 flex items-center justify-center gap-3 transition-all duration-700 ease-out sm:justify-end ${
                isVisibleTagline ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <a
                href="https://github.com/FlareItsh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400/20 bg-white/5 text-textPrimary/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/50 hover:bg-white/10 hover:text-textPrimary hover:shadow-xs"
              >
                <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://www.linkedin.com/in/rayver-dasalla-617b95391/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400/20 bg-white/5 text-textPrimary/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/50 hover:bg-white/10 hover:text-textPrimary hover:shadow-xs"
              >
                <Linkedin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Image with 3D Tilt, Ambient Glow, and Non-Ghosting Transition */}
        <div
          className={`order-1 flex max-w-md justify-center transition-all duration-700 ease-out md:order-2 ${
            isVisibleImage ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative flex items-center justify-center"
          >
            {/* Ambient Backlight Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-52 w-52 rounded-full bg-primary/20 blur-3xl transition-opacity duration-1000 animate-pulse sm:h-64 sm:w-64"></div>
            </div>

            <img
              src={imagePath}
              alt={`Me ${currentImage}`}
              className={`aspect-square max-w-[250px] scale-75 rounded-lg object-cover drop-shadow-2xl sm:max-w-md lg:scale-100 transition-all duration-250 ease-out ${
                isFading ? 'opacity-20 scale-95 blur-xs' : 'opacity-100 scale-100 blur-none'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Button & Minimal Scroll Indicator: Fades/slides from bottom to top */}
      <div
        className={`flex flex-col items-center justify-center gap-6 pb-6 transition-all duration-700 ease-out md:pb-10 ${
          isVisibleButton ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <a href="#contact" className="group">
          <Button
            variant="solid"
            className="flex items-center gap-2.5"
          >
            <span>LET'S TALK?</span>
            <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Button>
        </a>

        {/* Minimal Scroll Cue */}
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="text-textPrimary/40 hover:text-textPrimary/80 flex flex-col items-center gap-1 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
        >
          <span>Scroll</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </div>
  );
}
