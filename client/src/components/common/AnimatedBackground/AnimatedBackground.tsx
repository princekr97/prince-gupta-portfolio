import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

export const AnimatedBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse position for interactive glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations
    const springConfig = { stiffness: 50, damping: 30 };
    const glowX = useSpring(mouseX, springConfig);
    const glowY = useSpring(mouseY, springConfig);

    // Transform for parallax effect
    const glowOpacity = useTransform(mouseX, [0, 1], [0.3, 0.6]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMobile, mouseX, mouseY]);

    return (
        <div className={styles.background} ref={containerRef}>
            {/* Base gradient layer */}
            <div className={styles.baseGradient} />

            {/* Aurora/Northern lights effect */}
            <div className={styles.auroraContainer}>
                <div className={styles.aurora1} />
                <div className={styles.aurora2} />
                <div className={styles.aurora3} />
            </div>

            {/* Animated mesh gradient */}
            <div className={styles.meshGradient} />

            {/* 3D Geometric shapes */}
            <div className={styles.shapesContainer}>
                <motion.div
                    className={styles.shape3d}
                    animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className={`${styles.shape3d} ${styles.shape2}`}
                    animate={{
                        rotateX: [360, 0],
                        rotateY: [0, 360],
                    }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className={`${styles.shape3d} ${styles.shape3}`}
                    animate={{
                        rotateX: [0, 360],
                        rotateY: [360, 0],
                    }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Interactive mouse-following glow */}
            {!isMobile && (
                <motion.div
                    className={styles.interactiveGlow}
                    style={{
                        x: glowX,
                        y: glowY,
                        opacity: glowOpacity,
                    }}
                />
            )}

            {/* Floating particles */}
            <div className={styles.particlesContainer}>
                {!isMobile && [...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.particle}
                        initial={{
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.5 + 0.2,
                        }}
                        animate={{
                            y: [null, `-100vh`],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Animated lines/rays */}
            <div className={styles.raysContainer}>
                <div className={styles.ray} style={{ '--delay': '0s', '--angle': '15deg' } as React.CSSProperties} />
                <div className={styles.ray} style={{ '--delay': '2s', '--angle': '45deg' } as React.CSSProperties} />
                <div className={styles.ray} style={{ '--delay': '4s', '--angle': '75deg' } as React.CSSProperties} />
                <div className={styles.ray} style={{ '--delay': '6s', '--angle': '105deg' } as React.CSSProperties} />
                <div className={styles.ray} style={{ '--delay': '8s', '--angle': '135deg' } as React.CSSProperties} />
            </div>

            {/* Noise texture overlay */}
            <div className={styles.noiseOverlay} />

            {/* Animated grid with perspective */}
            <div className={styles.perspectiveGrid} />

            {/* Glow spots */}
            <motion.div
                className={styles.glowSpot1}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={styles.glowSpot2}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            <motion.div
                className={styles.glowSpot3}
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
            />

            {/* Vignette effect */}
            <div className={styles.vignette} />
        </div>
    );
};
