import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './FaceOverlay.module.css';

interface FaceOverlayProps {
    src: string;
    alt: string;
    className?: string;
}

export const FaceOverlay = ({ src, alt, className }: FaceOverlayProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const scanLines = Array.from({ length: 8 }, (_, i) => i);
    const particles = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className={`${styles.container} ${className}`}>
            {/* Main Image */}
            <motion.img
                src={src}
                alt={alt}
                className={styles.image}
                onLoad={() => setIsLoaded(true)}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
            />

            {/* Holographic Overlay */}
            <div className={styles.holographicOverlay}>
                <div className={styles.scanEffect} />
                <div className={styles.glitchEffect} />
            </div>

            {/* Scanning Lines */}
            <div className={styles.scanLines}>
                {scanLines.map((i) => (
                    <motion.div
                        key={i}
                        className={styles.scanLine}
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{
                            x: '100vw',
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'linear'
                        }}
                        style={{ top: `${10 + i * 12}%` }}
                    />
                ))}
            </div>

            {/* Floating Particles */}
            <div className={styles.particles}>
                {particles.map((i) => (
                    <motion.div
                        key={i}
                        className={styles.particle}
                        initial={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                            opacity: 0
                        }}
                        animate={{
                            x: Math.random() * 200 - 100,
                            y: Math.random() * 200 - 100,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* Corner Brackets */}
            <div className={styles.corners}>
                <div className={`${styles.corner} ${styles.topLeft}`} />
                <div className={`${styles.corner} ${styles.topRight}`} />
                <div className={`${styles.corner} ${styles.bottomLeft}`} />
                <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>

            {/* Face Recognition Grid */}
            <motion.div
                className={styles.faceGrid}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <svg viewBox="0 0 100 100" className={styles.gridSvg}>
                    {/* Grid Lines */}
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                    
                    {/* Face Detection Points */}
                    <motion.circle
                        cx="30" cy="35" r="1"
                        fill="#00f0ff"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    />
                    <motion.circle
                        cx="70" cy="35" r="1"
                        fill="#00f0ff"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                    />
                    <motion.circle
                        cx="50" cy="50" r="1"
                        fill="#ff0080"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                    />
                    <motion.circle
                        cx="50" cy="65" r="1"
                        fill="#00f0ff"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                    />
                </svg>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
                className={styles.statusIndicator}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <div className={styles.statusDot} />
                <span className={styles.statusText}>ONLINE</span>
            </motion.div>
        </div>
    );
};
