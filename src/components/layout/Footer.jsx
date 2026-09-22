import React from 'react';
import { ArrowUp, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-gray-400/20 bg-black/5 dark:bg-white/5 text-textPrimary transition-colors">
      <div className="mx-auto px-4 sm:px-8 md:px-16 lg:px-20 py-10 sm:py-14">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-3.5 lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/RD Logo Dark.png"
                alt="Rayver Dasalla Logo"
                className="h-10 w-auto object-contain dark:hidden"
              />
              <img
                src="/RD Logo Light.png"
                alt="Rayver Dasalla Logo"
                className="hidden h-10 w-auto object-contain dark:block"
              />
              <div>
                <h3 className="text-xl font-bold tracking-tight text-textPrimary">
                  RAYVER DASALLA
                </h3>
                <p className="text-xs font-semibold tracking-wider text-textPrimary/60 uppercase">
                  Creative Full-Stack Developer
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-textPrimary/75">
              Crafting modern, accessible, and performant web applications with clean code and intuitive design.
            </p>
            <div className="flex items-center gap-2 text-xs text-textPrimary/70">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Davao City, Philippines</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 lg:col-span-4 lg:pl-6">
            <p className="text-xs font-bold tracking-widest text-textPrimary/50 uppercase">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm font-medium text-textPrimary/80 transition-all duration-200 hover:translate-x-1 hover:text-textPrimary"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Connections */}
          <div className="space-y-3.5 lg:col-span-3">
            <p className="text-xs font-bold tracking-widest text-textPrimary/50 uppercase">
              Connect
            </p>
            <p className="text-xs text-textPrimary/65">
              Feel free to connect or follow my work across social platforms:
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com/FlareItsh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400/20 bg-white/5 text-textPrimary/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 hover:text-textPrimary"
              >
                <i className="fa-brands fa-github text-base"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rayver-dasalla-617b95391/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400/20 bg-white/5 text-textPrimary/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 hover:text-textPrimary"
              >
                <i className="fa-brands fa-linkedin text-base"></i>
              </a>
              <a
                href="https://www.facebook.com/rayver.dasalla.7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400/20 bg-white/5 text-textPrimary/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 hover:text-textPrimary"
              >
                <i className="fa-brands fa-facebook text-base"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-400/20 pt-6 sm:flex-row">
          <p className="text-xs text-textPrimary/60 sm:text-sm">
            © {new Date().getFullYear()} Rayver Dasalla. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-lg border border-gray-400/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-textPrimary transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 cursor-pointer uppercase"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
