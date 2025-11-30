import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const rafRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const trailTimeoutRef = useRef(null);

  // Check dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateCursor = (e) => {
      // Store mouse position
      cursorRef.current = { x: e.clientX, y: e.clientY };

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Update cursor position using RAF for smooth animation
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: cursorRef.current.x, y: cursorRef.current.y });
      });

      // Throttle trail updates to prevent too many DOM elements
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }

      trailTimeoutRef.current = setTimeout(() => {
        setTrail((prev) => {
          const now = Date.now();
          // Remove old trail points (older than 300ms)
          const filtered = prev.filter((p) => now - p.id < 300);
          // Add new point
          const newTrail = [...filtered, { x: e.clientX, y: e.clientY, id: now }];
          // Keep only last 3 trail points for better performance
          return newTrail.slice(-3);
        });
      }, 16); // ~60fps throttle
    };

    const updateCursorType = (e) => {
      const target = e.target;
      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button');
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    window.addEventListener('mouseover', updateCursorType, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', updateCursorType);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
    };
  }, []);

  const cursorColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 26, 23, 1)';
  const cursorShadow = isDark ? '0 0 15px rgba(255, 255, 255, 1)' : '0 0 12px rgba(10, 26, 23, 1)';
  const ringColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 26, 23, 1)';
  const ringShadow = isDark ? '0 0 25px rgba(255, 255, 255, 0.8)' : '0 0 25px rgba(10, 26, 23, 1)';

  return (
    <>
      {/* Trail dots - only render active ones */}
      {trail.map((point, index) => {
        const age = Date.now() - point.id;
        const fadeOpacity = Math.max(0, 1 - age / 300);

        return (
          <div
            key={point.id}
            className="pointer-events-none fixed z-9999 h-1.5 w-1.5 rounded-full will-change-transform"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: fadeOpacity * 0.6,
              backgroundColor: cursorColor,
              boxShadow: cursorShadow,
              transition: 'opacity 0.1s linear',
            }}
          />
        );
      })}

      {/* Main cursor */}
      <div
        className={`pointer-events-none fixed z-9999 rounded-full border-2 will-change-transform ${
          isPointer ? 'h-12 w-12' : 'h-7 w-7'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          borderColor: ringColor,
          boxShadow: ringShadow,
          transition: isPointer ? 'width 0.2s ease, height 0.2s ease' : 'none',
        }}
      />

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-9999 h-2 w-2 rounded-full will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: cursorColor,
          boxShadow: `0 0 20px ${cursorColor}`,
        }}
      />
    </>
  );
}
