import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Hero from './sections/Hero.jsx';
import Navbar from './components/layout/Navbar.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';
import FloatingShapes from './components/ui/FloatingShapes.jsx';
import CustomCursor from './components/ui/CustomCursor.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);

  const konami = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Console message for developers
  useEffect(() => {
    console.log(
      '%c🔥 Hey there, curious developer! 🔥',
      'color: #16302b; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
    );
    console.log(
      "%cI see you're checking out the console. Nice! 👀",
      'color: #1a1a40; font-size: 14px;'
    );
    console.log(
      '%cTry the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise! 🎮',
      'color: #16302b; font-size: 14px; font-style: italic;'
    );
    console.log('%cBuilt with ❤️ by Rayver Dasalla', 'color: #1a1a40; font-size: 12px;');
  }, []);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKonamiSequence((prev) => {
        const newSequence = [...prev, e.key].slice(-10);

        if (JSON.stringify(newSequence) === JSON.stringify(konami)) {
          setKonamiActivated(true);
          console.log(
            '%c🎉 KONAMI CODE ACTIVATED! 🎉',
            'color: #ff0000; font-size: 24px; font-weight: bold;'
          );

          // Reset after 5 seconds
          setTimeout(() => setKonamiActivated(false), 5000);
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="border-t-primary mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-400/20"></div>
          <p className="text-textPrimary/60 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Konami Code Easter Egg */}
      {konamiActivated && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="animate-[fadeIn_0.5s_ease-out] text-center">
            <div className="mb-4 text-8xl">🎮</div>
            <h1 className="mb-2 text-6xl font-bold text-white">GAME OVER</h1>
            <p className="text-2xl text-white/80">Just kidding! You found the secret! 🎉</p>
            <p className="mt-4 text-lg text-white/60">You're a true gamer at heart! 🔥</p>
          </div>
        </div>
      )}

      <CustomCursor />
      <FloatingShapes />
      <div className="relative z-10 animate-[fadeIn_0.5s_ease-out]">
        <Navbar />
        <section className="scroll-m-25 py-4 md:py-10" id="home">
          <Hero />
        </section>
        <section className="scroll-m-20 py-4 md:py-10" id="about">
          <About />
        </section>
        <section className="scroll-m-20 py-4 md:py-10">
          <Skills />
        </section>
        <section className="scroll-m-20 py-4 md:py-10" id="projects">
          <Projects />
        </section>
        <section className="scroll-m-20 py-4 md:py-10" id="contact">
          <Contact />
        </section>
        <Footer />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
