import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.css';
import { Magnetic } from '../../common/Magnetic/Magnetic';
import { useNavigationStore } from '../../../store/navigationStore';
import { useThemeStore } from '../../../store/themeStore';
import { useHaptics } from '../../../hooks/useHaptics';
import { Button } from '@components/common/Button';
import usePortfolioData from '../../../hooks/usePortfolioData';

const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

export const Navigation = () => {
    const { activeSection, setActiveSection, isMenuOpen, setIsMenuOpen, toggleMenu } = useNavigationStore();
    const { theme, toggleTheme } = useThemeStore();
    const { triggerHaptic } = useHaptics();
    const data = usePortfolioData();
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150; // Adjust for mobile nav height

            const currentSection = sections.find(section => {
                if (!section) return false;
                const rect = section.getBoundingClientRect();
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setActiveSection]);

    const scrollToSection = (id: string) => {
        // Update URL hash
        window.history.pushState(null, '', `#${id}`);

        const element = document.getElementById(id);
        if (!element) return;

        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 60 : 80;
        const elementPosition = element.offsetTop - offset;

        triggerHaptic('light');

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    };

    // Handle initial hash on load
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            setTimeout(() => scrollToSection(hash), 100);
        }
    }, []);

    // Block scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <div className={`${styles.container} container`}>
                    <motion.div
                        className={styles.logo}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        PKG<span className={styles.dot}>.</span>
                    </motion.div>

                    {/* Desktop Links */}
                    <ul className={styles.navLinks}>
                        {navItems.map(item => (
                            <li key={item.id} className={styles.navItem}>
                                <Magnetic>
                                    <button
                                        className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.label}
                                        {activeSection === item.id && (
                                            <WavyNavLine />
                                        )}
                                    </button>
                                </Magnetic>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.navRight}>
                        {/* Mobile Hamburger */}
                        <button
                            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                            onClick={() => {
                                triggerHaptic('medium');
                                toggleMenu();
                            }}
                            aria-label="Menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        <div className={styles.resumeBtn}>
                            <a href="/resume.pdf" download="Prince_Kumar_Gupta_Resume.pdf">
                                <Button variant="ghost" size="sm">Resume</Button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Rangoli-inspired Scroll Progress (Phase 4) - Moved 6px below header */}
                <motion.div
                    className={styles.scrollProgress}
                    style={{
                        scaleX: scrollYProgress,
                        transformOrigin: '0%',
                        background: 'linear-gradient(90deg, #ff9933, #ffffff, #138808)',
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        right: 0,
                        height: '3px'
                    }}
                />
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.mobileOverlay}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <ul className={styles.mobileLinks}>
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <button
                                        className={`${styles.mobileLink} ${activeSection === item.id ? styles.activeMobile : ''}`}
                                        onClick={() => {
                                            scrollToSection(item.id);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>

                        <div className={styles.mobileSocial}>
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <button
                                className={styles.themeToggle}
                                onClick={() => {
                                    triggerHaptic('light');
                                    toggleTheme();
                                }}
                            >
                                {theme === 'dark' ? '🌙' : '☀️'}
                            </button>
                        </div>

                        <div className={styles.mobileFooter}>
                            Prince Kumar Gupta • Senior Software Engineer
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Phase 2: Wavy Navigation Line
const WavyNavLine = () => {
    return (
        <svg
            className={styles.navWave}
            viewBox="0 0 100 20" // Optimized viewBox for cleaner wave
            preserveAspectRatio="none"
        >
            <motion.path
                d="M0,10 Q25,5 50,10 T100,10"
                fill="none"
                stroke="url(#nav-gradient)"
                strokeWidth="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: 1,
                    opacity: 1,
                    d: [
                        "M0,10 Q25,5 50,10 T100,10",
                        "M0,10 Q25,15 50,10 T100,10",
                        "M0,10 Q25,5 50,10 T100,10"
                    ]
                }}
                transition={{
                    pathLength: { duration: 0.5, ease: 'easeOut' },
                    d: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
            />
            <defs>
                <linearGradient id="nav-gradient">
                    <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                    <stop offset="100%" stopColor="var(--color-accent-purple)" />
                </linearGradient>
            </defs>
        </svg>
    );
};
