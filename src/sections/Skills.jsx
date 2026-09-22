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
        <div className="text-textPrimary mx-auto">
          {/* Cards grid - fades/slides from bottom to top */}
          <div
            className={`grid grid-cols-1 gap-5 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3 ${
              isVisibleCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Skill Card 1: Web Designing */}
            <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-gray-400/20 bg-white/5 p-6 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] sm:p-7 md:p-8">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="flex flex-col space-y-4">
                {/* Header: Icon badge & Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Component className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Web Designing</h3>
                    <span className="text-textPrimary/55 text-xs font-semibold uppercase tracking-wider">
                      UI/UX & Prototyping
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-textPrimary/75 text-sm leading-relaxed sm:text-base">
                  Creating responsive, user-friendly layouts that blend aesthetic beauty with practical usability, grounded in accessibility and intuitive interaction principles.
                </p>

                {/* Capability Highlights */}
                <div className="space-y-1.5 pt-1 text-xs text-textPrimary/80 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>High-Fidelity Wireframes & Prototypes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Accessibility & Typography Hierarchy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Design Systems & Component Specs</span>
                  </div>
                </div>
              </div>

              {/* Tech Pills (Pinned to bottom) */}
              <div className="mt-6 pt-4 border-t border-gray-400/15">
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Canva', 'UI/UX', 'Wireframing', 'Prototyping'].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-gray-400/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-textPrimary/90 transition-colors duration-200 group-hover:border-gray-400/40 sm:text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Card 2: Front-End Development */}
            <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-gray-400/20 bg-white/5 p-6 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] sm:p-7 md:p-8">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="flex flex-col space-y-4">
                {/* Header: Icon badge & Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <LayoutDashboard className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Front-End Development</h3>
                    <span className="text-textPrimary/55 text-xs font-semibold uppercase tracking-wider">
                      Interactive SPAs & UI
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-textPrimary/75 text-sm leading-relaxed sm:text-base">
                  Bringing designs to life with clean, modular, and reactive architectures that ensure lightning-fast performance across browsers and devices.
                </p>

                {/* Capability Highlights */}
                <div className="space-y-1.5 pt-1 text-xs text-textPrimary/80 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Responsive, Mobile-First Architectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>State Management & Reactive Components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Performance & Core Web Vitals Optimization</span>
                  </div>
                </div>
              </div>

              {/* Tech Pills (Pinned to bottom) */}
              <div className="mt-6 pt-4 border-t border-gray-400/15">
                <div className="flex flex-wrap gap-2">
                  {['React', 'Tailwind CSS', 'JavaScript', 'Vue', 'HTML5/CSS3'].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-gray-400/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-textPrimary/90 transition-colors duration-200 group-hover:border-gray-400/40 sm:text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Card 3: Back-End Development */}
            <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-gray-400/20 bg-white/5 p-6 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-500/50 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] sm:p-7 md:p-8">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="flex flex-col space-y-4">
                {/* Header: Icon badge & Title */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Database className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Back-End Development</h3>
                    <span className="text-textPrimary/55 text-xs font-semibold uppercase tracking-wider">
                      APIs & Data Architecture
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-textPrimary/75 text-sm leading-relaxed sm:text-base">
                  Architecting secure, scalable server-side systems, designing relational database schemas, and engineering high-throughput RESTful APIs.
                </p>

                {/* Capability Highlights */}
                <div className="space-y-1.5 pt-1 text-xs text-textPrimary/80 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>RESTful API Design & Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Database Schema Design & Query Indexing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                    <span>Authentication, Session & Security Best Practices</span>
                  </div>
                </div>
              </div>

              {/* Tech Pills (Pinned to bottom) */}
              <div className="mt-6 pt-4 border-t border-gray-400/15">
                <div className="flex flex-wrap gap-2">
                  {['Laravel', 'PHP', 'MySQL', 'RESTful APIs', 'MSSQL'].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-gray-400/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-textPrimary/90 transition-colors duration-200 group-hover:border-gray-400/40 sm:text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
