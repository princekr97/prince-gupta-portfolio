import { Navigation } from './components/layout/Navigation/Navigation';
import { Loader } from './components/common/Loader/Loader';
import { SEO } from './components/layout/SEO/SEO';
import { CleanHero } from './components/CleanHero';
import { CleanSkills } from './components/CleanSkills';
import { AnimatedBackground } from './components/common/AnimatedBackground/AnimatedBackground';

import { Certifications } from './components/sections/Certifications/Certifications';
import { ProjectShowcase3D } from './components/ProjectShowcase3D';
import { ExperienceTimeline } from './components/sections/Experience/ExperienceTimeline';
import { CleanContact } from './components/CleanContact';
import { CleanBlog } from './components/CleanBlog';
import { MagneticCursor } from './components/MagneticCursor';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';

import { Footer } from './components/layout/Footer/Footer';
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
      {/* Global Premium Animated Background */}
      <AnimatedBackground />

      <SEO />
      <Loader />
      <MagneticCursor />
      <Navigation />
      <PWAInstallPrompt />
      <main style={{ position: 'relative', minHeight: '100vh' }}>
        <CleanHero />
        <ExperienceTimeline />
        <CleanSkills />
        <Certifications />

        <ProjectShowcase3D />
        <CleanBlog />
        <CleanContact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
