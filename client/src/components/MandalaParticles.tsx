import { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './MandalaParticles.module.css';

export const MandalaParticles = () => {
  const particles = useMemo(() => {
    const temp: Array<{ x: number; y: number; delay: number }> = [];
    const mandalaPattern = [
      { radius: 100, count: 8 },
      { radius: 200, count: 16 },
      { radius: 300, count: 24 },
      { radius: 400, count: 32 }
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
    <svg className={styles.mandalaParticles} viewBox="-500 -500 1000 1000">
      <defs>
        <radialGradient id="mandala-gradient">
          <stop offset="0%" stopColor="#ff9933" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#138808" />
        </radialGradient>
      </defs>
      
      {particles.map((particle, i) => (
        <motion.circle
          key={i}
          cx={particle.x}
          cy={particle.y}
          r="3"
          fill="url(#mandala-gradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 1, 0.6],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}
    </svg>
  );
};
