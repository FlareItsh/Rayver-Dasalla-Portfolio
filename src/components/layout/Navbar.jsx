import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isVisible, setIsVisible] = useState(false); // New state for entrance animation
  const [dotPosition, setDotPosition] = useState({ left: 0, width: 0 }); // Track dot position
  const navRefs = React.useRef({}); // Store refs for each nav item

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = storedDarkMode === 'true' || (!storedDarkMode && prefersDark);
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.style.transition = 'all 0.3s ease-in-out';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    if (window.location.hash) {
      setActiveLink(window.location.hash.slice(1));
    }

    return () => observer.disconnect();
  }, []);

  // New effect: Trigger slide-down after a 1000ms (1 second) delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Increased delay to 1 second

    return () => clearTimeout(timer);
  }, []);

  // Update dot position when activeLink changes
  useEffect(() => {
    if (!isMobile && navRefs.current[activeLink]) {
      const activeElement = navRefs.current[activeLink];
      const rect = activeElement.getBoundingClientRect();
      const parentRect = activeElement.parentElement.parentElement.getBoundingClientRect();

      setDotPosition({
        left: rect.left - parentRect.left + rect.width / 2,
        width: rect.width,
      });
    }
  }, [activeLink, isMobile]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const navItems = [
    { id: 'home', text: 'HOME' },
    { id: 'about', text: 'ABOUT' },
    { id: 'projects', text: 'PROJECTS' },
    { id: 'contact', text: 'CONTACT' },
  ];

  const Link = ({ item, isMobile = false }) => (
    <a
      ref={(el) => {
        if (!isMobile) {
          navRefs.current[item.id] = el;
        }
      }}
      href={`#${item.id}`}
      onClick={isMobile ? () => setIsOpen(false) : undefined}
      className={`group relative block transition-all duration-300 ease-in-out ${
        isMobile
          ? `rounded-lg px-4 py-3 text-lg ${
              activeLink === item.id
                ? 'bg-white/10 font-bold text-white'
                : 'font-normal text-white/70 hover:bg-white/5 hover:text-white'
            }`
          : `text-base ${
              activeLink === item.id
                ? 'font-bold text-white'
                : 'font-normal text-white/70 hover:text-white'
            }`
      }`}
    >
      <span className="relative">
        {item.text}
        {/* Animated underline on hover - desktop only */}
        {!isMobile && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-white/0 via-white to-white/0 transition-all duration-300 ease-out group-hover:w-full"></span>
        )}
        {/* Glow effect on hover - desktop only */}
        {!isMobile && (
          <span className="absolute inset-0 rounded opacity-0 blur-sm transition-opacity duration-300 group-hover:bg-white/10 group-hover:opacity-100"></span>
        )}
      </span>
    </a>
  );

  const desktopNav = (
    <div className="relative">
      <ul className="flex gap-20 text-base">
        {navItems.map((item) => (
          <li key={item.id} className="py-0">
            <Link item={item} isMobile={false} />
          </li>
        ))}
      </ul>
      {/* Sliding glowing dot indicator */}
      {!isMobile && dotPosition.left > 0 && (
        <span
          className="absolute -bottom-2 h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
          style={{
            left: `${dotPosition.left}px`,
            transform: 'translateX(-50%)',
          }}
        ></span>
      )}
    </div>
  );

  const mobileNavLinks = navItems.map((item) => (
    <li key={item.id} className="group">
      <Link item={item} isMobile={true} />
    </li>
  ));

  // Conditional classes for navbar pure slide-down animation (hidden off-screen top, no fade)
  const navbarClasses = `font-primary bg-primary sticky top-0 z-20 flex items-center justify-between px-4 py-4 lg:justify-around lg:px-0 transition-transform duration-700 ease-out ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`; // Starts fully off-screen top (hidden), slides down to position after delay

  return (
    <>
      <nav className={navbarClasses}>
        <div>
          <img className="size-13" src="/RD Logo Light.png" alt="Rayver Dasalla" />
        </div>
        {!isMobile ? desktopNav : null}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="relative rounded-full p-1 transition-all duration-500 ease-out hover:bg-white/10"
          >
            <div
              className={`transition-transform duration-500 ease-out ${darkMode ? 'rotate-360' : ''}`}
            >
              {darkMode ? (
                <Moon size={32} className="text-white" />
              ) : (
                <Sun size={32} className="text-white" />
              )}
            </div>
          </button>
          {isMobile && (
            <Menu
              size={32}
              className="cursor-pointer text-white"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </nav>
      {isMobile && (
        <div
          className={`bg-primary fixed inset-y-0 right-0 z-50 flex w-64 flex-col overflow-y-auto shadow-2xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header Section */}
          <div className="border-b border-white/10 p-6">
            <div className="mb-4 flex items-center justify-between">
              <img className="h-12 w-12" src="/RD Logo Light.png" alt="Rayver Dasalla" />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-all duration-300 ease-in-out hover:rotate-90 hover:bg-white/10"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="text-sm font-medium text-white/80">Navigation</div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-1 flex-col gap-2 px-6 py-6">{mobileNavLinks}</ul>

          {/* Footer Section */}
          <div className="border-t border-white/10 p-6">
            <p className="text-center text-xs text-white/60">© 2025 Rayver Dasalla</p>
          </div>
        </div>
      )}
      {isMobile && isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
