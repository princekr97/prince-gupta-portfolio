import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './ScrollSection.module.css';

interface Card {
  title: string;
  description: string;
  icon: string;
}

const cards: Card[] = [
  { title: 'Frontend', description: 'React, Next.js, TypeScript', icon: '⚛️' },
  { title: 'Backend', description: 'Node.js, Express, MongoDB', icon: '🚀' },
  { title: 'Design', description: 'Figma, UI/UX, Animation', icon: '🎨' },
  { title: 'DevOps', description: 'Docker, AWS, CI/CD', icon: '⚙️' }
];

const ParallaxCard = ({ card, index }: { card: Card; index: number }) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={styles.cardIcon}>{card.icon}</div>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <p className={styles.cardDesc}>{card.description}</p>
    </motion.div>
  );
};

export const ScrollSection = () => {
  return (
    <section className={styles.section} style={{ position: 'relative' }}>
      <div className={styles.background} />
      
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What I Do
        </motion.h2>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <ParallaxCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
