"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCode, FaPlay, FaFilePdf, FaArrowRight } from 'react-icons/fa';
import placeholder from '/public/png/placeholder.png';
import PDFViewer from '../../pdf-viewer';

const SingleProject = ({ project }) => {
  // Destructure with default values
  const { name, description, tags = [], code, demo, pdf, image } = project;
  const [showPDF, setShowPDF] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Handle PDF view
  const openPDF = (e) => {
    e.stopPropagation();
    setShowPDF(true);
  };

  // Handle card click
  const handleCardClick = (e) => {
    // If clicking a link or button, let that handler take over
    if (e.target.closest('a') || e.target.closest('button:not(.pdf-area)')) {
      return;
    }
    
    // Open PDF if available, otherwise fallback to demo or code
    if (pdf) {
      setShowPDF(true);
    } else if (demo) {
      window.open(demo, '_blank');
    } else if (code) {
      window.open(code, '_blank');
    }
  };

  return (
    <>
      <div 
        className="group project-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Simplified browser-style header - smaller with just the dots */}
        <div className="flex items-center bg-[#0a0d37] px-3 py-1.5 border-b border-[#1b2c68a0]">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
          </div>
        </div>
        
        {/* Main card content */}
        <div className="relative bg-[#0f0b24]/80 hover:bg-[#151041]/90 transition-all duration-1000 overflow-hidden h-card-body">
          {/* Project image background with improved animation */}
          <div className="absolute inset-0 opacity-60 group-hover:opacity-70 transition-opacity duration-1000">
            <Image
              src={image?.src || placeholder}
              alt={name}
              fill
              className={`object-cover project-image ${hovered ? 'project-image-active' : ''}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b24]/40 to-[#1a1443]/60 mix-blend-multiply transition-opacity duration-1000"></div>
          
          {/* Card content */}
          <div className="relative z-10 p-4 flex flex-col h-full"> {/* Reduced padding from p-5 to p-4 */}
            {/* Project title */}
            <h3 className="font-medium text-lg text-white mb-2 group-hover:text-[#16f2b3]/90 transition-colors duration-700 line-clamp-1 h-7">{name}</h3> {/* Reduced margin-bottom */}
            
            {/* Description with fixed height container */}
            <div className="text-description-wrapper mb-3 flex-grow min-h-[70px]"> {/* Reduced margin and min-height */}
              <p className={`text-sm text-white/90 ${hovered ? 'description-expanded' : 'description-collapsed line-clamp-3'}`}>
                {description}
              </p>
            </div>
            
            {/* Fixed height tags container with consistent spacing - fix height prop */}
            <div className="tags-wrap mb-3"> {/* Removed explicit h-8 height */}
              <div className={`flex flex-wrap gap-2 transition-opacity duration-1200 ease-in-out ${hovered ? 'opacity-95' : 'opacity-0'}`}>
                {tags && tags.length > 0 ? (
                  tags.map((tag, id) => (
                    <span 
                      key={id}
                      className="text-xs px-2.5 py-1 bg-[#2a1e7e]/50 rounded-full text-white/90 backdrop-blur-sm border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="opacity-0">No tags</span> // Invisible placeholder
                )}
              </div>
            </div>
            
            {/* Action buttons container with fixed height and identical structure */}
            <div className="actions-footer h-10">
              <div 
                className={`flex items-center justify-between transition-opacity duration-1000 ease-in-out ${hovered ? 'opacity-95' : 'opacity-0'}`} 
                onClick={handleCardClick}
              >
                <div className="flex items-center gap-3">
                  {demo && (
                    <Link
                      href={demo}
                      target="_blank"
                      className="action-button"
                    >
                      <FaPlay size={14} />
                      <span className="action-label">Demo</span>
                    </Link>
                  )}
                  
                  {code && (
                    <Link
                      href={code}
                      target="_blank"
                      className="action-button"
                    >
                      <FaCode size={14} />
                      <span className="action-label">Code</span>
                    </Link>
                  )}
                  
                  {pdf && (
                    <button 
                      className="action-button pdf-button pdf-area"
                    >
                      <FaFilePdf size={14} />
                      <span className="action-label">PDF</span>
                    </button>
                  )}
                  
                  {/* Always include a placeholder button even when some buttons exist */}
                  {(!demo || !code || !pdf) && (
                    <div className="invisible action-button" aria-hidden="true">
                      <span className="action-label">Placeholder</span>
                    </div>
                  )}
                </div>
                
                {/* Always show a button regardless of PDF status */}
                <div className={`details-button ${pdf ? "pdf-area cursor-pointer" : ""}`}>
                  <FaArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      {showPDF && pdf && (
        <PDFViewer 
          pdfPath={pdf} 
          onClose={() => setShowPDF(false)} 
        />
      )}
    </>
  );
};

export default SingleProject;