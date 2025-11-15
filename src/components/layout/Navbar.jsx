import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

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
            href={`#${item.id}`}
            onClick={isMobile ? () => setIsOpen(false) : undefined}
            className={`relative block text-white transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:origin-left after:bg-white after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:opacity-80 ${isMobile ? 'underline-offset-2' : 'underline-offset-4'} ${activeLink === item.id ? 'after:w-full' : ''} `}
        >
            {item.text}
        </a>
    );

    const desktopNav = (
        <ul className="flex gap-20 text-base">
            {navItems.map((item) => (
                <li key={item.id} className="py-0">
                    <Link item={item} isMobile={false} />
                </li>
            ))}
        </ul>
    );

    const mobileNavLinks = navItems.map((item) => (
        <li key={item.id} className="py-4">
            <Link item={item} isMobile={true} />
        </li>
    ));

    return (
        <>
            <nav className="font-primary bg-primary sticky top-0 z-20 flex items-center justify-between px-4 py-4 lg:justify-around lg:px-0">
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
                            className={`transition-transform duration-500 ease-out ${darkMode ? 'rotate-180' : ''}`}
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
                <ul
                    className={` ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-primary fixed inset-y-0 right-0 z-50 flex w-80 flex-col gap-0 overflow-y-auto px-4 py-5 text-base shadow-lg transition-transform duration-300 ease-in-out`}
                >
                    {mobileNavLinks}
                </ul>
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
