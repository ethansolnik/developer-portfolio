"use client";

import { useEffect, useState } from 'react';
import { isBrowser } from '../utils/browserUtils';

const createTag = (text, weight) => {
  // Only create DOM elements on the client side
  if (isBrowser()) {
    const element = document.createElement('span');
    // ...existing code...
    return element;
  }
  return null;
};

export default function ComponentWithDocument() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Any DOM manipulation should happen here
    // ...existing code...
  }, []);

  // Don't render anything until client-side
  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Component rendering that may use createTag
  // ...existing code...
}