import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Hero from './sections/Hero.jsx';
import Navbar from './components/layout/Navbar.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <section className="scroll-m-25" id="home">
      <Hero />
    </section>
    <section className="scroll-m-20" id="about">
      <About />
    </section>
    <section>
      <Skills />
    </section>
    <section className="scroll-m-40" id="projects">
      <Projects />
    </section>
    <section className="scroll-m-20" id="contact">
      <Contact />
    </section>
    <Footer />
  </StrictMode>
);
