import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './Experience3D.module.css';

const experiences = [
  {
    year: '2024',
    role: 'Senior Software Engineer (SDE-2)',
    company: 'Tarento Information Technologies',
    description: 'Leading frontend architecture for enterprise projects',
    color: '#00f0ff'
  },
  {
    year: '2023',
    role: 'Software Engineer',
    company: 'Sunbird ED',
    description: 'Developed open-source education platform components',
    color: '#7b61ff'
  },
  {
    year: '2021',
    role: 'Software Engineer',
    company: 'Muraai Information Technologies',
    description: 'Full-stack development for smart manufacturing solutions',
    color: '#ff00e5'
  }
];

const TimelineItem = ({ exp, index }: any) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={styles.timelineItem}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div
        className={styles.card}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        data-magnetic
      >
        <div className={styles.yearBadge} style={{ background: exp.color }}>
          {exp.year}
        </div>
        
        <h3 className={styles.role}>{exp.role}</h3>
        <p className={styles.company}>{exp.company}</p>
        <p className={styles.description}>{exp.description}</p>
        
        <div 
          className={styles.glow}
          style={{ background: `radial-gradient(circle, ${exp.color}40 0%, transparent 70%)` }}
        />
      </motion.div>
      
      <motion.div
        className={styles.connector}
        style={{ background: exp.color }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </motion.div>
  );
};

export const Experience3D = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className={styles.experience}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Experience Journey
      </motion.h2>

      <div className={styles.timeline}>
        {experiences.map((exp, index) => (
          <TimelineItem key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};
