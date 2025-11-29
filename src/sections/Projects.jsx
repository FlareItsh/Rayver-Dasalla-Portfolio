import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ui/Project-Card';

export default function Projects() {
  const [isInView, setIsInView] = useState(false); // Trigger for scroll visibility
  const [isVisibleTitle, setIsVisibleTitle] = useState(false); // For title
  const [isVisibleProjects, setIsVisibleProjects] = useState(false); // For projects flex
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
    const timerProjects = setTimeout(() => setIsVisibleProjects(true), 500); // Projects after

    return () => {
      clearTimeout(timerTitle);
      clearTimeout(timerProjects);
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
          Projects
        </h2>
        <div className="mx-auto">
          {/* Projects grid - fades/slides from bottom to top */}
          <div
            className={`grid grid-cols-1 justify-items-center gap-5 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3 ${
              isVisibleProjects ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <ProjectCard
              imageSrc="/images/Porshe-Page.png"
              imageAlt="Project Image"
              title="Porshe Corporate Website"
              subtitle="Corporate Website showcasing Porshe's Story to Greatness."
              languages={['/icons/icon_8.png', '/icons/icon_3.png']}
              githubLink="https://github.com/FlareItsh/Porshe-Cloned.git"
              liveDemoLink="https://porshe-cloned.infinityfree.me/"
            />
            <ProjectCard
              imageSrc="/images/Gatepass.png"
              imageAlt="Project Image"
              title="STI Gatepass System"
              subtitle="Gatepass System for STI Events."
              languages={['/icons/icon_2.png', '/icons/icon_6.png']}
              githubLink="https://github.com/FlareItsh/SSC-Events-Gatepass-System.git"
              liveDemoLink="https://gatepass-carl4dev.netlify.app/"
            />
            <ProjectCard
              imageSrc="/images/Gearhead.png"
              imageAlt="Project Image"
              title="Gearhead Carwash (Work in Progress)"
              subtitle="Modern web-based platform that streamlines carwash operations, reduces human error, and delivers real-time analytics."
              languages={[
                '/icons/icon_1.png',
                '/icons/icon_2.png',
                '/icons/icon_9.png',
                '/icons/icon_10.png',
              ]}
              githubLink="https://github.com/FlareItsh/Gearhead.git"
              liveDemoLink="https://gearhead-master-swtxlj.laravel.cloud/"
            />
          </div>
        </div>
      </div>
    </>
  );
}
