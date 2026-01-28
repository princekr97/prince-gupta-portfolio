import { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './MandalaParticles.module.css';

export const MandalaParticles = () => {
    const particles = useMemo(() => {
        const temp: Array<{ x: number; y: number; delay: number }> = [];
        const mandalaPattern = [
            { radius: 80, count: 8 },
            { radius: 160, count: 16 },
            { radius: 240, count: 24 },
            { radius: 320, count: 32 }
        ];

        mandalaPattern.forEach(({ radius, count }) => {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                temp.push({
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    delay: i * 0.02
                });
            }
        });

        return temp;
    }, []);

    return (
        <div className={styles.mandalaWrapper}>
            <svg className={styles.mandalaParticles} viewBox="-400 -400 800 800">
                <defs>
                    <radialGradient id="mandala-gradient">
                        <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                        <stop offset="50%" stopColor="var(--color-accent-purple)" />
                        <stop offset="100%" stopColor="var(--color-accent-magenta)" />
                    </radialGradient>
                </defs>

                {particles.map((particle, i) => (
                    <motion.circle
                        key={i}
                        cx={particle.x}
                        cy={particle.y}
                        r="2"
                        fill="url(#mandala-gradient)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1, 0.8],
                            opacity: [0, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 4,
                            delay: particle.delay,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};
