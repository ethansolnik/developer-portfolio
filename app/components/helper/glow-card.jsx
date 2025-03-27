"use client"

import { useEffect, useState, useRef } from 'react';

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true upon component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run this effect on client side
    if (!isClient) return;

    const container = containerRef.current;
    const card = cardRef.current;

    if (!container || !card) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    // Style the container
    container.style.setProperty('--gap', CONFIG.gap);
    container.style.setProperty('--blur', CONFIG.blur);
    container.style.setProperty('--spread', CONFIG.spread);
    container.style.setProperty(
      '--direction',
      CONFIG.vertical ? 'column' : 'row'
    );

    // Set initial state for the card
    card.style.setProperty('--active', CONFIG.opacity);
    card.style.setProperty('--start', 0);

    // Using a safer approach for pointer events
    const handlePointerMove = (event) => {
      // Skip if no event data
      if (!event || typeof event.clientX !== 'number') return;
      
      const x = event.clientX;
      const y = event.clientY;
      const cardBounds = card.getBoundingClientRect();

      if (
        x > cardBounds.left - CONFIG.proximity &&
        x < cardBounds.left + cardBounds.width + CONFIG.proximity &&
        y > cardBounds.top - CONFIG.proximity &&
        y < cardBounds.top + cardBounds.height + CONFIG.proximity
      ) {
        card.style.setProperty('--active', 1);
      } else {
        card.style.setProperty('--active', CONFIG.opacity);
      }

      const cardCenter = [
        cardBounds.left + cardBounds.width * 0.5,
        cardBounds.top + cardBounds.height * 0.5,
      ];

      let angle =
        (Math.atan2(y - cardCenter[1], x - cardCenter[0]) * 180) /
        Math.PI;

      angle = angle < 0 ? angle + 360 : angle;

      card.style.setProperty('--start', angle + 90);
    };

    // Using a safer event type
    window.addEventListener('mousemove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [isClient, identifier]);

  // Simple base styling if JavaScript is disabled or not loaded yet
  return (
    <div className={`glow-container-${identifier} glow-container`} ref={containerRef}>
      <article 
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`} 
        ref={cardRef}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;

