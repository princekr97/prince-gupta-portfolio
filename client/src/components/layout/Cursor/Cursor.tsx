import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import styles from './Cursor.module.css';

export const Cursor = () => {
    const [cursorType, setCursorType] = useState('default');
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const trailIdCounter = useRef(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Add trail point with guaranteed unique ID
            trailIdCounter.current += 1;
            setTrail(prev => [
                ...prev.slice(-15),
                { x: e.clientX, y: e.clientY, id: trailIdCounter.current }
            ]);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) {
                setCursorType('pointer');
            } else if (target.closest('h1') || target.closest('h2')) {
                setCursorType('large');
            } else {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <AnimatePresence>
                {trail.map((point) => (
                    <motion.div
                        key={point.id}
                        className={styles.trailParticle}
                        initial={{ scale: 1, opacity: 0.3, x: point.x, y: point.y }}
                        animate={{ scale: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            left: -2,
                            top: -2,
                            zIndex: 9998,
                        }}
                    />
                ))}
            </AnimatePresence>

            <motion.div
                className={`${styles.cursor} ${styles[cursorType]}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <div className={styles.dot} />
            </motion.div>
            <motion.div
                className={styles.cursorFollower}
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </>
    );
};
