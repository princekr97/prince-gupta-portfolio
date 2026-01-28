
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { LiquidBackground } from './LiquidBackground';
import { LiquidCube } from './LiquidCube';
import { LiquidBlob } from './LiquidBlob';
import { MagneticButton } from '@components/common/Button/MagneticButton';
import { MandalaOverlay } from '../../common/Decorations/MandalaOverlay';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export const Hero = () => {
    const { scrollY } = useScroll();
    const [typedText, setTypedText] = useState('');
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Exact 3D Tilt Logic from production specs
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [6, -6]);
    const rotateY = useTransform(x, [-300, 300], [-6, 6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Parallax & Gradient effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const hue = useTransform(scrollY, [0, 500], [180, 280]);

    // Typing animation
    const specialties = [
        'Full-Stack Engineer',
        'React Specialist',
        'Node.js Expert',
        'Cloud Architect'
    ];

    useEffect(() => {
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let charIndex = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        const type = () => {
            const current = specialties[currentIndex];

            if (!isDeleting && charIndex <= current.length) {
                currentText = current.substring(0, charIndex);
                charIndex++;
            } else if (isDeleting && charIndex >= 0) {
                currentText = current.substring(0, charIndex);
                charIndex--;
            } else if (!isDeleting && charIndex > current.length) {
                timeoutId = setTimeout(() => { isDeleting = true; type(); }, 2000);
                return;
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % specialties.length;
                charIndex = 0;
            }

            setTypedText(currentText);

            const speed = isDeleting ? 50 : 100;
            timeoutId = setTimeout(type, speed);
        };

        timeoutId = setTimeout(type, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className={styles.hero}
            id="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Layer (Z: -200) */}
            <div className={styles.backgroundEffects}>
                <LiquidBackground />
                <motion.div className={styles.gridPattern} style={{ y: y1 }} />
                <LiquidBlob />

                {/* Floating Glass Shape (Z: -80) */}
                <motion.div
                    className={styles.floatingShape}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transform: 'translateZ(-80px)' }}
                />

                <motion.div
                    className={styles.gradientOrb}
                    style={{
                        y: y2,
                        filter: useTransform(hue, h => `hue-rotate(${h}deg)`)
                    }}
                />

                {/* Subtle Mandala Background */}
                <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.5 }}>
                    <MandalaOverlay />
                </div>
            </div>

            {/* Content Layer (Z: 0 with 3D Tilt) */}
            <motion.div
                className={styles.content}
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* 3D Liquid Cube Layer */}
                <LiquidCube mouseX={x} mouseY={y} />

                {/* Floating code snippets */}
                <CodeBackground mouseX={x} mouseY={y} />

                <div className={styles.nameContainer}>
                    <motion.p 
                        className={styles.greeting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        PRINCE KUMAR GUPTA
                    </motion.p>
                    <motion.h1 
                        className={styles.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        Senior <br />
                        <motion.span 
                            className={styles.gradientName}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "backOut" }}
                        >
                            Full-Stack
                        </motion.span>
                    </motion.h1>
                </div>

                <motion.div
                    className={styles.roleContainer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <span className={styles.typedText}>
                        {typedText}
                        <span className={styles.cursor}>|</span>
                    </span>
                </motion.div>

                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.75, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    Building scalable web applications that serve millions of users
                </motion.p>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "backOut" }}
                >
                    <MagneticButton onClick={() => scrollToSection('projects')} size="lg">
                        View My Work
                    </MagneticButton>
                    <MagneticButton
                        variant="secondary"
                        onClick={() => scrollToSection('contact')}
                        size="lg"
                    >
                        Get In Touch
                    </MagneticButton>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className={styles.scrollIndicator}
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    onClick={() => scrollToSection('about')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 5v14m0 0l-7-7m7 7l7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* SVG Morph Overlay */}
            <svg className={styles.morphOverlay} viewBox="0 0 1000 1000">
                <defs>
                    <linearGradient id="liquid-gradient">
                        <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                        <stop offset="0.5" stopColor="var(--color-accent-purple)" />
                        <stop offset="1.0" stopColor="var(--color-accent-magenta)" />
                    </linearGradient>
                </defs>

                <path
                    d="M 100 100 Q 250 50 400 100 T 700 100"
                    fill="none"
                    stroke="url(#liquid-gradient)"
                    strokeWidth="3"
                    className={styles.morphPath}
                >
                    <animate
                        attributeName="d"
                        dur="10s"
                        repeatCount="indefinite"
                        values="
              M 100 100 Q 250 50 400 100 T 700 100;
              M 100 150 Q 250 100 400 150 T 700 150;
              M 100 100 Q 250 50 400 100 T 700 100
            "
                    />
                </path>
            </svg>
        </section >
    );
};


// Floating code snippets component
const CodeBackground = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    const codeSnippets = [
        { text: 'const expertise = ["React", "Node.js"];', x: '10%', y: '20%' },
        { text: 'npm install @innovation', x: '80%', y: '15%' },
        { text: 'async function build() { ... }', x: '15%', y: '70%' },
        { text: 'git commit -m "shipped"', x: '75%', y: '65%' },
        { text: '{ users: "1M+", uptime: "99.5%" }', x: '5%', y: '50%' },
        { text: 'return <Excellence />;', x: '85%', y: '85%' }
    ];

    return (
        <motion.div className={styles.codeSnippets} style={{ x: mouseX, y: mouseY }}>
            {codeSnippets.map((snippet, index) => (
                <motion.code
                    key={index}
                    className={styles.codeSnippet}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 8 + index,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        left: snippet.x,
                        top: snippet.y,
                        fontSize: '14px',
                        color: 'var(--color-accent-cyan)',
                        fontFamily: 'var(--font-mono)',
                    }}
                >
                    {snippet.text}
                </motion.code>
            ))}
        </motion.div>
    );
};

