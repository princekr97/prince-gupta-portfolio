import { useRef, type ReactNode } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const MagneticButton = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md'
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.4;
        const deltaY = (e.clientY - centerY) * 0.4;

        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={buttonRef}
            className={`${styles.magneticButton} ${styles[variant]} ${styles[size]}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className={styles.buttonGradient}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />

            <span className={styles.buttonText}>{children}</span>
            <div className={styles.buttonGlow} />
        </motion.button>
    );
};
