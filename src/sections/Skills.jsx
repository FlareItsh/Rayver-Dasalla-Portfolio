import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Component, Database } from 'lucide-react';

export default function Skills() {
  const [isInView, setIsInView] = useState(false); // Trigger for scroll visibility
  const [isVisibleTitle, setIsVisibleTitle] = useState(false); // For title
  const [isVisibleCards, setIsVisibleCards] = useState(false); // For cards grid
  const mainRef = useRef(null); // Ref for intersection observer

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

    const timerTitle = setTimeout(() => setIsVisibleTitle(true), 200); // Title first
    const timerCards = setTimeout(() => setIsVisibleCards(true), 500); // Cards after

    return () => {
      clearTimeout(timerTitle);
      clearTimeout(timerCards);
    };
  }, [isInView]);

  return (
    <>
      <div ref={mainRef} className="my-10 px-4 sm:px-8 md:my-20 md:px-20">
        {/* Title - fades/slides from left to right */}
        <h2
          className={`text-textPrimary my-10 text-left text-4xl font-bold transition-all duration-700 ease-out sm:text-5xl md:text-6xl ${
            isVisibleTitle ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          Skills
        </h2>
        <div className="text-textPrimary mx-auto max-w-7xl">
          {/* Cards grid - fades/slides from bottom to top */}
          <div
            className={`grid grid-cols-1 justify-items-center gap-4 transition-all duration-700 ease-out sm:gap-5 xl:grid-cols-3 ${
              isVisibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Skill Card */}
            <div className="group w-full space-y-3 rounded-lg bg-white/5 p-3 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] sm:space-y-4 sm:p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <Component className="h-6 w-6 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                  Web Designing
                </h3>
              </div>
              <div className="text-justify text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg">
                <p>
                  I focus on creating responsive and user-friendly layouts that combine both
                  aesthetics and usability. I apply UI/UX principles such as accessibility, color
                  theory, and typography to ensure that every design looks good and feels intuitive.
                  I also use tools like Figma and Canva to plan and refine my designs before
                  development.
                </p>
              </div>
            </div>
            {/* Skill Card */}
            <div className="group w-full space-y-3 rounded-lg bg-white/5 p-3 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] sm:space-y-4 sm:p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                  Front-End Development
                </h3>
              </div>
              <div className="text-justify text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg">
                <p>
                  I work with HTML, CSS, and JavaScript to bring designs to life and make them
                  interactive. I have experience using frameworks and libraries such as React and
                  TailwindCSS to build modern, responsive interfaces that work across different
                  devices and browsers. I also pay attention to performance and optimization to
                  provide a smooth user experience.
                </p>
              </div>
            </div>
            {/* Skill Card */}
            <div className="group w-full space-y-3 rounded-lg bg-white/5 p-3 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] sm:space-y-4 sm:p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                  Back-End Development
                </h3>
              </div>
              <div className="text-justify text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg">
                <p>
                  I handle the server-side logic of applications. I work with Laravel to build
                  functional systems, manage databases like MySQL, and create RESTful APIs for
                  smooth communication between the front end and the server. I also make sure that
                  data handling, authentication, and security are properly implemented.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
