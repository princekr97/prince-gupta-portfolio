import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import styles from './Premium3DEnhancer.module.css';

interface Premium3DEnhancerProps {
    children: React.ReactNode;
}

export const Premium3DEnhancer = ({ children }: Premium3DEnhancerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Multi-layer parallax depths
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const midgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);

    // Depth-of-field blur
    const backgroundBlur = useTransform(scrollYProgress, [0, 0.3], [0, 3]);

    // Camera dolly-in effect
    const cameraScale = useTransform(scrollYProgress, [0, 0.2], [1.05, 1]);
    const cameraOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize to -1 to 1
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            mouseX.set(x * 20); // Max 20px movement
            mouseY.set(y * 20);
        };

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className={styles.enhancer}>
            {/* Background Layer - Slowest */}
            <motion.div
                className={styles.backgroundLayer}
                style={{
                    y: backgroundY,
                    filter: useTransform(backgroundBlur, (v) => `blur(${v}px)`),
                    x: useTransform(smoothMouseX, (v) => v * 0.3),
                }}
            />

            {/* Midground Layer - Moderate */}
            <motion.div
                className={styles.midgroundLayer}
                style={{
                    y: useTransform(smoothMouseY, (v) => midgroundY.get() + v * 0.6),
                    x: useTransform(smoothMouseX, (v) => v * 0.6),
                }}
            />

            {/* Foreground Content - Fastest */}
            <motion.div
                className={styles.foregroundLayer}
                style={{
                    y: smoothMouseY,
                    x: smoothMouseX,
                    scale: cameraScale,
                    opacity: cameraOpacity,
                }}
                initial={{ scale: 1.05, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
                {children}
            </motion.div>

            {/* Floating particles for depth */}
            <div className={styles.particlesContainer}>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            x: useTransform(smoothMouseX, (v) => v * (i * 0.1)),
                            y: useTransform(smoothMouseY, (v) => v * (i * 0.1)),
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
