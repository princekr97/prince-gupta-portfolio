import { motion } from 'framer-motion';
import styles from './MandalaOverlay.module.css';

export const MandalaOverlay = () => {
    return (
        <svg
            className={styles.mandala}
            viewBox="0 0 400 400"
        >
            <defs>
                <radialGradient id="mandala-grad">
                    <stop offset="0%" stopColor="#ff9933" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#138808" />
                </radialGradient>
            </defs>

            {/* Indian-inspired 8-fold symmetry pattern */}
            {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                    <motion.path
                        d="M200,200 Q220,180 240,200 T260,240 Q240,260 200,240 Z"
                        fill="none"
                        stroke="url(#mandala-grad)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 3,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                    />
                    <motion.circle
                        cx="260"
                        cy="240"
                        r="3"
                        fill="#ff9933"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 2 + i * 0.1 }}
                    />
                </g>
            ))}

            <motion.circle
                cx="200"
                cy="200"
                r="20"
                fill="none"
                stroke="url(#mandala-grad)"
                strokeWidth="2"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </svg>
    );
};
