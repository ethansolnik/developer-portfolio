"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

const PDFViewer = ({ pdfPath, onClose }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set loading to false after a short delay to give PDF time to start loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-[#1b203e]">
        <h2 className="text-white text-xl font-medium">Project Document</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-red-500 transition-colors"
          aria-label="Close PDF viewer"
        >
          <FaTimes size={24} />
        </button>
      </div>
      
      <div className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}
        
        <iframe
          src={pdfPath}
          className="w-full h-full"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
