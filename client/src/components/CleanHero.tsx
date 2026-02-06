import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CleanHero.module.css';
import usePortfolioData from '../hooks/usePortfolioData';
import profileImg from '../assets/profile.jpg'; // Import profile image
import { MandalaOverlay } from './common/Decorations/MandalaOverlay';

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
    const element = document.getElementById(sectionId);
    if (!element) return;

    window.history.pushState(null, '', `#${sectionId}`);
    const offset = window.innerWidth < 768 ? 60 : 80;
    const elementPosition = element.offsetTop - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section
      className={styles.hero}
      id="hero"
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      {/* Background elements */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.heroGridInteractive} />
      <div className={styles.spotlight} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}>
        <MandalaOverlay />
      </div>

      {/* 3D shapes */}
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
        {/* Main Introduction */}
        <motion.div
          className={styles.greeting}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Hi, I am
        </motion.div>

        <motion.h1 className={styles.nameDisplay}>
          {['PRINCE KUMAR GUPTA'].map((line, lineIdx) => (
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

        {/* Integrated Profile & Bio Section */}
        <motion.div
          className={styles.aboutIntegrated}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className={styles.aboutGrid}>
            {/* Profile Card with Image & Stats */}
            <motion.div
              className={styles.profileCard}
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className={styles.profileImageWrapper}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.img
                  src="/src/assets/profile.jpg"
                  alt="Prince Kumar Gupta"
                  className={styles.profileImage}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  whileHover={{ scale: 1.08 }}
                />
                <div className={styles.profileGlow}></div>
              </motion.div>

              <div className={styles.statsGrid}>
                <motion.div
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <span className={styles.statNum}>{data.stats.experience}</span>
                  <span className={styles.statText}>Years Exp</span>
                </motion.div>
                <motion.div
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <span className={styles.statNum}>{data.stats.projects}</span>
                  <span className={styles.statText}>Projects</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className={styles.bioContent}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <motion.h2
                className={styles.bioTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className={styles.bioTitleMain}>Full Stack Developer</span>
                <span className={styles.bioTitleSub}>{data.personal.subtitle}</span>
              </motion.h2>

              <motion.p
                className={styles.bioText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                <span className={styles.highlight}>{data.stats.experience} years</span> building scalable web applications across
                <span className={styles.highlight}> frontend, backend, and databases</span>. Specializing in React, Angular, Node.js, and TypeScript—delivering production-ready systems at scale.
              </motion.p>

              <motion.div
                className={styles.bioOwnership}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              >
                End-to-end ownership — from UI/UX to backend architecture and database design. Focused on performance and maintainability.
              </motion.div>

              <motion.div
                className={styles.bioActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.6 }}
              >
                {/* Download Resume Button */}
                <div className={styles.btnGlowContainer}>
                  <button className={styles.glowButton} onClick={() => window.open('/resume.pdf')}>
                    Resume
                  </button>
                </div>

                {/* View Projects Button */}
                <div className={styles.btnGlowContainer}>
                  <button className={styles.glowButton} onClick={() => scrollToSection('projects')}>
                    Projects
                  </button>
                </div>
              </motion.div>

              <motion.div
                className={styles.socialLinks}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.6 }}
              >
                {[
                  { icon: '💼', url: 'https://www.linkedin.com/in/prince-kumargupta-59796014b', label: 'LinkedIn' },
                  { icon: '🐙', url: 'https://github.com/', label: 'GitHub' },
                  { icon: '📧', url: 'mailto:princekrgupta756@gmail.com', label: 'Email' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.4 + (i * 0.1), type: "spring", stiffness: 200 }}
                    whileHover={{ y: -5, rotate: 360 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
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
