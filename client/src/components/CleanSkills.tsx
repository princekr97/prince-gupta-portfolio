import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './CleanSkills.module.css';
import usePortfolioData from '../hooks/usePortfolioData';
import { useHaptics } from '../hooks/useHaptics';

export const CleanSkills = () => {
  const data = usePortfolioData();
  const { triggerHaptic } = useHaptics();
  const [activeTab, setActiveTab] = useState('frontend');

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: '💻' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'database', label: 'Database', icon: '📊' },
    { id: 'tools', label: 'Tools', icon: '🛠️' }
  ];

  const getSkillsByTab = () => {
    switch (activeTab) {
      case 'frontend': return data.skills.frontend;
      case 'backend': return data.skills.backend;
      case 'database': return data.skills.database;
      case 'tools': return data.skills.tools;
      default: return data.skills.frontend;
    }
  };

  const activeSkills = getSkillsByTab();

  return (
    <section className={styles.skills} id="skills">
      <div className="container">
        <div className={styles.skillsContent}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.titleGlitch}>Technical Expertise</h2>
            <p className={styles.subtitle}>Building robust solutions with modern technologies</p>
          </motion.div>

          <div className={styles.tabsHeader}>
            <div className={styles.tabsContainer}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ''}`}
                  onClick={() => {
                    triggerHaptic('light');
                    setActiveTab(cat.id);
                  }}
                >
                  <span className={styles.tabIcon}>{cat.icon}</span>
                  <span className={styles.tabLabel}>{cat.label}</span>
                  {activeTab === cat.id && (
                    <motion.div
                      className={styles.activeTabIndicator}
                      layoutId="activeTabSkills"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={{ duration: 0.4 }}
              className={styles.skillsGrid}
            >
              {activeSkills.map((skill: any, i: number) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                  </div>

                  <div className={styles.progressContainer}>
                    <div className={styles.levelHeader}>
                      <span className={styles.levelText}>Proficiency</span>
                      <span className={styles.levelPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.track}>
                      <motion.div
                        className={styles.fill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className={styles.cardGlow}></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};