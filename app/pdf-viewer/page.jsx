"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import Link from 'next/link';

// Create a client component that uses useSearchParams
function PDFViewerContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const filename = searchParams.get('file');
  const pdfPath = filename ? `/pdfs/${filename}.pdf` : null;
  
  useEffect(() => {
    // Redirect if no filename provided
    if (!filename) {
      router.push('/#projects');
      return;
    }
    
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [filename, router]);

  // Handle manual navigation back to projects section
  const handleBackToProjects = (e) => {
    e.preventDefault();
    router.push('/');
    
    // Set a flag in sessionStorage that we want to scroll to projects
    sessionStorage.setItem('scrollToProjects', 'true');
  };

  // If no filename, show nothing while redirecting
  if (!pdfPath) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d20]">
      {/* Header */}
      <header className="bg-[#0a0d37] p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={handleBackToProjects}
          className="flex items-center text-white gap-2 hover:text-[#16f2b3] transition-colors duration-200 bg-transparent border-none"
        >
          <FaArrowLeft size={16} />
          <span>Back to Projects</span>
        </button>
        
        <div className="flex items-center gap-3">
          <a
            href={pdfPath}
            download
            className="px-3 py-2 bg-[#1b1a4a] hover:bg-[#23215e] rounded-md text-white text-sm flex items-center gap-2 transition-colors"
          >
            <FaDownload size={14} />
            <span>Download</span>
          </a>
        </div>
      </header>
      
      {/* PDF Content */}
      <main className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0d20]/80 z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#16f2b3]"></div>
          </div>
        )}
        
        <iframe
          src={pdfPath}
          className="w-full h-[calc(100vh-64px)]"
          title="PDF Viewer"
          onLoad={() => setLoading(false)}
        />
      </main>
    </div>
  );
}

// Main component with Suspense boundary
export default function PDFViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0a0d20]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#16f2b3]"></div>
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  );
}
