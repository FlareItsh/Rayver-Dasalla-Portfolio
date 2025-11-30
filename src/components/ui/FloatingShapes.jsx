import React, { useState, useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const [isVisible, setIsVisible] = useState(true); // Changed to true for immediate visibility
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const shapesRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    // Trigger visibility after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track scroll position and velocity for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Calculate scroll velocity
      const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;

      setScrollY(currentScrollY);
      setScrollVelocity(velocity);

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shapes = [
    // Circles
    { type: 'circle', size: 60, top: '10%', left: '15%', delay: 0, animation: 'float' },
    { type: 'circle', size: 40, top: '60%', left: '80%', delay: 0.2, animation: 'float' },
    { type: 'circle', size: 30, top: '85%', left: '10%', delay: 0.4, animation: 'bounce' },
    { type: 'circle', size: 50, top: '30%', left: '85%', delay: 0.6, animation: 'float' },

    // Squares
    { type: 'square', size: 45, top: '20%', left: '75%', delay: 0.3, animation: 'rotate' },
    { type: 'square', size: 35, top: '70%', left: '20%', delay: 0.5, animation: 'float' },
    { type: 'square', size: 25, top: '45%', left: '5%', delay: 0.7, animation: 'bounce' },

    // Triangles
    { type: 'triangle', size: 50, top: '50%', left: '90%', delay: 0.4, animation: 'rotate' },
    { type: 'triangle', size: 40, top: '15%', left: '40%', delay: 0.6, animation: 'float' },
    { type: 'triangle', size: 30, top: '80%', left: '60%', delay: 0.8, animation: 'bounce' },
  ];

  return (
    <div ref={shapesRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, index) => {
        // Each shape has different resistance/lag factor
        const lagFactor = 0.7 + index * 0.05; // 0.7 to 1.15 range
        const catchUpSpeed = 0.3 + index * 0.02; // Different catch-up speeds

        // Shapes lag behind based on scroll velocity and their lag factor
        const lagOffset = scrollVelocity * lagFactor * 200;

        // Parallax effect - shapes at different depths move at different speeds
        const parallaxOffset = scrollY * catchUpSpeed;

        return (
          <div
            key={index}
            className="absolute"
            style={{
              top: shape.top,
              left: shape.left,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `translate(0, ${lagOffset - parallaxOffset}px)`,
              opacity: isVisible ? 0.15 : 0,
              transition:
                'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out',
              animation: isVisible
                ? `${shape.animation} ${6 + index * 0.5}s ease-in-out infinite`
                : 'none',
              animationDelay: `${shape.delay}s`,
            }}
          >
            {shape.type === 'circle' && (
              <div className="bg-primary/70 h-full w-full rounded-full shadow-[0_0_25px_rgba(22,48,43,0.5)] dark:bg-white/40 dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
            )}
            {shape.type === 'square' && (
              <div className="bg-primary/70 h-full w-full rotate-45 shadow-[0_0_25px_rgba(22,48,43,0.5)] dark:bg-white/40 dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
            )}
            {shape.type === 'triangle' && (
              <div
                className="shadow-[0_0_25px_rgba(22,48,43,0.5)] dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid rgba(22, 48, 43, 0.7)`,
                  filter: 'drop-shadow(0 0 12px rgba(22, 48, 43, 0.5))',
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
