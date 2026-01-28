import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './GlassCard.module.css';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface GlassCardProps {
    children: ReactNode;
    depth?: number;
    className?: string;
    enableTilt?: boolean;
}

export const GlassCard = ({ children, depth = 1, className = '', enableTilt = true }: GlassCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Motion values for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs
    const springX = useSpring(x, { stiffness: 150, damping: 20 });
    const springY = useSpring(y, { stiffness: 150, damping: 20 });

    // Calculate rotation based on cursor position
    const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized position for tilt (-0.5 to 0.5)
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);

        // Update CSS variables for spotlight
        ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
        ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const shouldTilt = enableTilt && !isMobile;

    return (
        <motion.div
            ref={ref}
            className={`${styles.glassCard} ${className}`}
            style={{
                '--depth': depth,
                rotateX: shouldTilt ? rotateX : 0,
                rotateY: shouldTilt ? rotateY : 0,
                transformStyle: 'preserve-3d',
            } as any}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Multi-layer glass effect */}
            <div className={styles.glassLayer1} />
            <div className={styles.glassLayer2} />
            <div className={styles.glassLayer3} />

            {/* Spotlight effect */}
            <div className={styles.spotlight} />

            {/* Content */}
            <div className={styles.glassContent} style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
};
