import { motion } from 'framer-motion';
import { Navigation } from './components/layout/Navigation/Navigation';
import { Loader } from './components/common/Loader/Loader';
import { SEO } from './components/layout/SEO/SEO';
import { CleanHero } from './components/CleanHero';
import { About } from './components/sections/About/About';
import { CleanSkills } from './components/CleanSkills';
import { Certifications } from './components/sections/Certifications/Certifications';
import { ProjectsShowcase } from './components/sections/Projects/ProjectsShowcase';
import { ExperienceTimeline } from './components/sections/Experience/ExperienceTimeline';
import { CleanContact } from './components/CleanContact';
import { MagneticCursor } from './components/MagneticCursor';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Disable smooth scroll on mobile for better performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    if (isMobile) {
      return; // Skip Lenis on mobile
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="app-wrapper" style={{ position: 'relative' }}>
      <SEO />
      <Loader />
      <MagneticCursor />
      <Navigation />
      <PWAInstallPrompt />
      <main style={{ position: 'relative', minHeight: '100vh' }}>
        <section id="hero"><CleanHero /></section>
        <section id="about"><About /></section>
        <section id="experience"><ExperienceTimeline /></section>
        <section id="skills"><CleanSkills /></section>
        <section id="certifications"><Certifications /></section>
        <section id="projects"><ProjectsShowcase /></section>
        <section id="contact"><CleanContact /></section>
      </main>

      <motion.footer
        className="modern-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #090a0f 0%, #000 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <p style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          letterSpacing: '0.1em'
        }}>
          © {new Date().getFullYear()} Prince Kumar Gupta • Crafted with 💙
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
