import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);
  const rafRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const trailTimeoutRef = useRef(null);
  const audioRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Initialize audio on mount
  useEffect(() => {
    // Create audio element with an Osu-style click sound
    // Using a simple beep sound via Web Audio API
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    audioRef.current = audioContext;

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  // Play click sound - realistic stick hitting table sound
  const playClickSound = () => {
    if (!audioRef.current) return;

    const ctx = audioRef.current;

    // Create a more realistic "knock" sound using white noise and filters
    const bufferSize = ctx.sampleRate * 0.05; // 50ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate noise burst
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Band-pass filter to simulate wood resonance (200-800 Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 1;

    const gainNode = ctx.createGain();

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Sharp attack, quick decay for "knock" effect
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.05);
  };

  // Handle click events
  useEffect(() => {
    const handleClick = (e) => {
      if (isMobile) return;

      // Play click sound
      playClickSound();

      // Create visual click effect
      setClickEffect({ x: e.clientX, y: e.clientY, id: Date.now() });

      // Remove click effect after animation
      setTimeout(() => {
        setClickEffect(null);
      }, 400);
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isMobile]);

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

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

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

      {/* Click effect - Osu-style expanding circle */}
      {clickEffect && (
        <div
          key={clickEffect.id}
          className="pointer-events-none fixed z-9999 animate-ping rounded-full border-2 will-change-transform"
          style={{
            left: `${clickEffect.x}px`,
            top: `${clickEffect.y}px`,
            transform: 'translate(-50%, -50%)',
            borderColor: ringColor,
            width: '20px',
            height: '20px',
            animationDuration: '400ms',
            animationIterationCount: '1',
          }}
        />
      )}

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
