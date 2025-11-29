import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add to trail
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        // Keep only last 5 trail points
        return newTrail.slice(-5);
      });
    };

    const updateCursorType = (e) => {
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button')
      );
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', updateCursorType);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="bg-primary/30 pointer-events-none fixed z-[9999] h-1 w-1 rounded-full transition-all duration-300"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: ((index + 1) / trail.length) * 0.5,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`border-primary/50 pointer-events-none fixed z-[9999] rounded-full border-2 transition-all duration-200 ${
          isPointer ? 'h-12 w-12' : 'h-6 w-6'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Inner dot */}
      <div
        className="bg-primary pointer-events-none fixed z-[9999] h-1.5 w-1.5 rounded-full transition-all duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
