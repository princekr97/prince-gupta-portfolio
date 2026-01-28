import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './CleanHero.module.css';
import usePortfolioData from '../hooks/usePortfolioData';
import { CodeRain } from './sections/Hero/CodeRain';

export const CleanHero = () => {
  const data = usePortfolioData();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    window.history.pushState(null, '', `#${sectionId}`);
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = window.innerWidth < 768 ? 60 : 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Animated Code Background */}
      <CodeRain />
      
      {/* Floating Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* 3D Shapes */}
      <motion.div
        className={styles.shapes3d}
        style={{
          transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)`
        }}
      >
        <motion.div
          className={styles.cube3d}
          animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={styles.sphere3d}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.greeting}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Hi, I am
        </motion.div>

        <motion.h1
          className={styles.nameDisplay}
        >
          {['PRINCE', 'KUMAR GUPTA'].map((line, lineIdx) => (
            <span key={lineIdx} className={styles.nameLine}>
              {line.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className={styles.nameWord}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + (lineIdx * 0.2) + (charIdx * 0.03),
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: '#00ffff',
                    transition: { duration: 0.2 }
                  }}
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.titleBlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div 
            className={styles.role}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
          >
            {data.personal.title}
          </motion.div>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
          >
            {data.personal.subtitle}
          </motion.p>
          <motion.p 
            className={styles.tagline}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
          >
            {data.personal.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.heroActions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            className={styles.btnPrimary}
            onClick={() => scrollToSection('projects')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            View Work
          </motion.button>
          <motion.button
            className={styles.btnSecondary}
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.statsBar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8
              }
            }
          }}
        >
          {[
            { num: data.stats.experience, label: 'Years Exp' },
            { num: data.stats.projects, label: 'Projects' },
            { num: data.stats.clients, label: 'Clients' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={styles.statItem}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.statNumber}>{stat.num}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={styles.scrollDown}>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
};
