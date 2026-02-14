'use client';

import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CursorLight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Add new trail point
      setTrail((prevTrail) => {
        const newTrail = [
          ...prevTrail,
          { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }
        ];
        // Keep only last 15 points for performance
        return newTrail.slice(-15);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (index / trail.length) * 0.6,
            transform: `translate(-50%, -50%) scale(${0.3 + (index / trail.length) * 0.7})`,
          }}
        />
      ))}
      
      {/* Main cursor light */}
      <div
        className="cursor-light"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Glow effect */}
      <div
        className="cursor-light-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
