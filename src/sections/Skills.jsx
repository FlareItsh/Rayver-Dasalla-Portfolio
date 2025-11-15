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
      <div ref={mainRef} className="my-20 px-20">
        {/* Title - fades/slides from left to right */}
        <h2
          className={`text-textPrimary my-10 text-left text-6xl font-bold transition-all duration-700 ease-out ${
            isVisibleTitle ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          Skills
        </h2>
        <div className="text-textPrimary mx-auto max-w-7xl">
          {/* Cards grid - fades/slides from bottom to top */}
          <div
            className={`grid grid-cols-1 justify-items-center gap-5 transition-all duration-700 ease-out xl:grid-cols-3 ${
              isVisibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Skill Card */}
            <div className="w-full space-y-4 rounded-lg bg-white/5 p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <Component className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">Web Designing</h3>
              </div>
              <div className="text-justify text-sm leading-relaxed md:text-base lg:text-lg">
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
            <div className="w-full space-y-4 rounded-lg bg-white/5 p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Front-End Development
                </h3>
              </div>
              <div className="text-justify text-sm leading-relaxed md:text-base lg:text-lg">
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
            <div className="w-full space-y-4 rounded-lg bg-white/5 p-4 md:space-y-5 md:p-6">
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">Back-End Development</h3>
              </div>
              <div className="text-justify text-sm leading-relaxed md:text-base lg:text-lg">
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
