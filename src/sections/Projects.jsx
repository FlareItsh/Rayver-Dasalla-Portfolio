import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import SkillCard from '../components/ui/Skill-Card';

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
      <div ref={mainRef} className="my-20 px-20">
        {/* Title - fades/slides from left to right */}
        <h2
          className={`text-textPrimary my-10 text-left text-6xl font-bold transition-all duration-700 ease-out ${
            isVisibleTitle ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          Projects
        </h2>
        <div className="mx-auto">
          {/* Projects flex - fades/slides from bottom to top */}
          <div
            className={`flex flex-wrap justify-center gap-5 transition-all duration-700 ease-out ${
              isVisibleProjects ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Switched to flex-wrap for dynamic wrapping; avoids overlap on narrow screens by wrapping based on min-w-[300px] in SkillCard */}
            <SkillCard
              imageSrc="/src/assets/images/Porshe-Page.png"
              imageAlt="Project Image"
              title="Porshe Corporate Website"
              subtitle="Corporate Website showcasing Porshe's Story to Greatness."
              languages={['/src/assets/icons/icon_9.png', '/src/assets/icons/icon_3.png']} // Array of icon srcs
              link="https://github.com/FlareItsh/Porshe-Cloned.git"
              indicator={<ExternalLink />}
            />
            <SkillCard
              imageSrc="/src/assets/images/Gatepass.png"
              imageAlt="Project Image"
              title="STI Gatepass System"
              subtitle="Gatepass System for STI Events."
              languages={['/src/assets/icons/icon_5.png', '/src/assets/icons/icon_6.png']} // Array of icon srcs
              link="https://example.com"
              indicator={<ExternalLink />}
            />
            <SkillCard
              imageSrc="/src/assets/images/Gearhead.png"
              imageAlt="Project Image"
              title="Gearhead Carwash (Work in Progress)"
              subtitle="Modern web-based platform that streamlines carwash operations, reduces human error, and delivers real-time analytics."
              languages={[
                '/src/assets/icons/icon_1.png',
                '/src/assets/icons/icon_2.png',
                '/src/assets/icons/icon_6.png',
                '/src/assets/icons/icon_10.png',
              ]} // Array of icon srcs
              link="https://github.com/FlareItsh/Gearhead.git"
              indicator={<ExternalLink />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
