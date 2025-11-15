import React from 'react';
import { LayoutDashboard, Component, Database } from 'lucide-react';

export default function Skills() {
  return (
    <>
      <div className="my-20 px-20">
        <h2 className="text-textPrimary my-10 text-left text-6xl font-bold">Skills</h2>
        <div className="text-textPrimary mx-auto max-w-7xl">
          <div className="grid grid-cols-1 justify-items-center gap-5 xl:grid-cols-3">
            {' '}
            {/* Changed to 1 col on small/mid screens (vertical stack), 3 cols on xl/full screen+ (horizontal) */}
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
