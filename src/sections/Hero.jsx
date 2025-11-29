import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button'; // Adjust the import path as needed

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 6;
  const [isVisibleText, setIsVisibleText] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isVisibleTagline, setIsVisibleTagline] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);

  const fullText1 = 'RAYVER';
  const fullText2 = 'DASALLA';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev % totalImages) + 1);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Staggered animations: text at 500ms, image at 1000ms, button at 1500ms
  useEffect(() => {
    const timerText = setTimeout(() => setIsVisibleText(true), 500);
    const timerImage = setTimeout(() => setIsVisibleImage(true), 1000);
    const timerButton = setTimeout(() => setIsVisibleButton(true), 1500);
    const timerTagline = setTimeout(() => setIsVisibleTagline(true), 3500); // After typing completes

    return () => {
      clearTimeout(timerText);
      clearTimeout(timerImage);
      clearTimeout(timerButton);
      clearTimeout(timerTagline);
    };
  }, []);

  // Typing effect for first name - starts after fade-in
  useEffect(() => {
    if (!isVisibleText) return;

    setShowCursor1(true);
    let currentIndex = 0;
    const typingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= fullText1.length) {
          setTypedText1(fullText1.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor1(false);
          // Start typing second name
          setTimeout(() => {
            setShowCursor2(true);
            let index2 = 0;
            const interval2 = setInterval(() => {
              if (index2 <= fullText2.length) {
                setTypedText2(fullText2.slice(0, index2));
                index2++;
              } else {
                clearInterval(interval2);
                setShowCursor2(false);
              }
            }, 100);
          }, 200);
        }
      }, 100);
    }, 700); // Start typing 700ms after fade-in

    return () => clearTimeout(typingTimer);
  }, [isVisibleText]);

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
              {typedText1}
              {showCursor1 && <span className="animate-pulse">|</span>}
            </h1>
            <h1 className="w-full text-center text-4xl font-bold sm:text-right sm:text-5xl md:text-right md:text-6xl lg:text-9xl">
              {typedText2}
              {showCursor2 && <span className="animate-pulse">|</span>}
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
              Crafting elegant solutions, one line at a time ✨
            </p>
          </div>
        </div>
        {/* Right: Image - fades/slides from right to left */}
        <div
          className={`order-1 flex max-w-md justify-center transition-all duration-700 ease-out md:order-2 ${
            isVisibleImage ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          <img
            src={imagePath}
            alt={`Me ${currentImage}`}
            className="aspect-square max-w-[250px] scale-75 rounded-lg object-cover drop-shadow-2xl sm:max-w-md lg:scale-100"
          />
        </div>
      </div>
      {/* Button: Fades/slides from bottom to top */}
      <div
        className={`flex justify-center pb-8 transition-all duration-700 ease-out md:pb-12 ${
          isVisibleButton ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <a href="#contact">
          <Button variant="solid" className="text-lg sm:text-xl md:text-2xl">
            LET'S TALK?
          </Button>
        </a>
      </div>
    </div>
  );
}
