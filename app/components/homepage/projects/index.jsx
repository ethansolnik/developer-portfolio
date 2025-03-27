"use client"

import { useEffect, useRef } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import SingleProject from './single-project';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const Projects = () => {
  const projectsRef = useRef(null);
  
  // Check for scrollToProjects flag when component mounts
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToProjects') === 'true';
    if (shouldScroll && projectsRef.current) {
      // Clear the flag
      sessionStorage.removeItem('scrollToProjects');
      
      // Scroll to projects section with a slight delay to ensure page is fully loaded
      setTimeout(() => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);
  
  return (
    <div id="projects" ref={projectsRef} className="relative z-50 my-12 lg:my-24">
      {/* Background gradient */}
      <div className="w-[200px] h-[200px] bg-purple-300/20 rounded-full absolute top-10 right-1/4 filter blur-[100px] opacity-30"></div>
      <div className="w-[150px] h-[150px] bg-blue-300/20 rounded-full absolute bottom-10 left-1/4 filter blur-[100px] opacity-20"></div>

      {/* Section divider */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section header */}
      <div className="flex justify-center my-8 lg:my-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500"></span>
            <span className="bg-[#1a1443] text-white p-2 px-5 text-xl rounded-md font-medium">
              PROJECTS
            </span>
            <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500"></span>
          </div>
          <p className="text-white/50 mt-5 text-center max-w-2xl text-sm sm:text-base leading-relaxed">
            A collection of academic and personal projects showcasing my skills across various domains
          </p>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 mt-8">
        {
          projectsData.map((project, i) => (
            <SingleProject project={project} key={i} />
          ))
        }
      </div>

      {/* View more button */}
      {projectsData.length > 6 && (
        <div className="flex justify-center mt-14 lg:mt-16">
          <Link
            className="view-more-button flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500/90 to-violet-600/90 px-8 py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-300 ease-out hover:text-white hover:shadow-lg hover:shadow-purple-500/20"
            role="button"
            href="/projects"
          >
            <span>View All Projects</span>
            <FaArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;