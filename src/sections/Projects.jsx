import React from 'react';
import { ExternalLink } from 'lucide-react';
import SkillCard from '../components/ui/Skill-Card';

export default function Projects() {
  return (
    <>
      <div className="my-20 px-20">
        <h2 className="text-textPrimary my-10 text-left text-6xl font-bold">Projects</h2>
        <div className="mx-auto">
          <div className="flex flex-wrap justify-center gap-5">
            {' '}
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
