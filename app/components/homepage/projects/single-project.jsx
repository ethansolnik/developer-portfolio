"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCode, FaPlay, FaFilePdf } from 'react-icons/fa';
import placeholder from '/public/png/placeholder.png';

const SingleProject = ({ project }) => {
  // Destructure with default values
  const { name, description, tags = [], code, demo, pdf, image } = project;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group h-full flex flex-col">
      <div className="h-36 lg:h-40 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        <Image
          src={image?.src || placeholder}
          alt={name}
          width={1080}
          height={720}
          className='h-full w-full group-hover:scale-110 transition-all duration-300 object-cover'
        />
      </div>
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <h3 className="font-medium text-base">{name}</h3>
        </div>
        
        <div 
          className='cursor-pointer flex-grow' 
          onClick={toggleExpand}
        >
          <p className={`text-xs md:text-sm text-[#d3d8e8] py-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {description}
          </p>
          {description && description.length > 150 && (
            <p className="text-xs text-violet-400 mt-1">
              {isExpanded ? "Click to collapse" : "Click to expand"}
            </p>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, id) => (
              <span 
                className='text-[10px] px-1.5 py-0.5 bg-[#0f0b24] rounded-md text-[#EFF3F4]' 
                key={id}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-2 pt-1 border-t border-[#1d293a]">
          {demo && (
            <Link
              href={demo}
              target='_blank'
              className="flex justify-center items-center w-7 h-7 rounded-full border-2 border-[#16f2b3] text-[#16f2b3] transition-all duration-300 hover:bg-[#231d4b] hover:text-violet-500 hover:border-violet-500"
              title="Demo">
              <FaPlay size={10} />
            </Link>
          )}
          
          {code && (
            <Link
              href={code}
              target='_blank'
              className="flex justify-center items-center w-7 h-7 rounded-full border-2 border-[#16f2b3] text-[#16f2b3] transition-all duration-300 hover:bg-[#231d4b] hover:text-violet-500 hover:border-violet-500"
              title="Code">
              <FaCode size={10} />
            </Link>
          )}
          
          {pdf && (
            <Link
              href={pdf}
              target='_blank'
              className="flex justify-center items-center gap-1 px-2 py-0.5 rounded-md border border-[#16f2b3] text-[#16f2b3] text-xs transition-all duration-300 hover:bg-[#231d4b] hover:text-violet-500 hover:border-violet-500 ml-auto"
              title="Research Paper">
              <FaFilePdf size={10} />
              <span className="text-[10px]">Paper</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;