"use client";

import { useEffect, useState } from 'react';

// ...existing code...

const createTag = (text, weight) => {
  // Only access document in client-side rendering
  if (typeof window !== 'undefined') {
    const element = document.createElement('span');
    // ...existing code...
    return element;
  }
  return null;
};

// ...existing code...

export function TagCloud({ tags }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Move tag creation logic here
    // ...existing code...
  }, []);

  if (!mounted) {
    return null; // Return null or a placeholder during server-side rendering
  }

  // Rest of the component that uses createTag
  // ...existing code...
}
