import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectShowcase3D.module.css';

const projects = [
  {
    title: 'OLA ONDC Platform',
    tech: 'React • Node.js • Redis • WebSockets',
    color: '#00f0ff'
  },
  {
    title: 'Healthcare LMS',
    tech: 'Angular • PWA • PostgreSQL',
    color: '#7b61ff'
  },
  {
    title: 'Smart Mfg Dashboard',
    tech: 'React • D3.js • AWS • IoT',
    color: '#ff00e5'
  }
];

export const ProjectShowcase3D = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className={styles.showcase}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Featured Projects
      </motion.h2>

      <div className={styles.projects}>
        {projects.map((project, index) => {
          const targetScale = 1 - ((projects.length - index) * 0.05);
          
          return (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, targetScale }: any) => {
  const containerRef = useRef(null);

  return (
    <motion.div
      ref={containerRef}
      className={styles.cardContainer}
      style={{ top: `calc(10% + ${index * 25}px)` }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: targetScale }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={styles.card}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        data-magnetic
      >
        <div className={styles.cardContent}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectTech}>{project.tech}</p>
          <motion.button
            className={styles.viewBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Project →
          </motion.button>
        </div>
        <div 
          className={styles.cardGradient}
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}40 0%, transparent 70%)` }}
        />
      </motion.div>
    </motion.div>
  );
};
