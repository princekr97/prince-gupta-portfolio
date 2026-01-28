import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './CleanSkills.module.css';
import usePortfolioData from '../hooks/usePortfolioData';
import { useHaptics } from '../hooks/useHaptics';

const getIconClass = (name: string) => {
  const iconMap: Record<string, string> = {
    'React.js': 'react-original',
    'Angular': 'angularjs-plain',
    'Vue.js': 'vuejs-plain',
    'TypeScript': 'typescript-plain',
    'JavaScript': 'javascript-plain',
    'HTML5/CSS3': 'html5-plain',
    'Node.js': 'nodejs-plain',
    'Express.js': 'express-original',
    'REST APIs': 'nodejs-plain',
    'MongoDB': 'mongodb-plain',
    'PostgreSQL': 'postgresql-plain',
    'SQL': 'mysql-plain',
    'Git/GitHub': 'github-original',
    'Jest': 'jest-plain',
    'Agile/Scrum': 'jira-plain'
  };
  return iconMap[name] || 'devicon-plain';
};

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
    <section className={styles.skills}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 className={styles.title}>
            Technical Skills
          </motion.h2>
          <motion.p className={styles.subtitle}>
            Technologies I work with
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <div className={styles.tabsContainer}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tabButton} ${activeTab === cat.id ? styles.activeTab : ''}`}
              onClick={() => {
                triggerHaptic('light');
                setActiveTab(cat.id);
              }}
            >
              <span className={styles.tabIcon}>{cat.icon}</span>
              <span className={styles.tabLabel}>{cat.label}</span>
              {activeTab === cat.id && (
                <motion.div
                  className={styles.activeIndicator}
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={styles.skillsGrid}
          >
            {activeSkills.map((skill: any, index: number) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={styles.skillCard}
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotateX: isMobile ? 0 : -30
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0
      }}
      viewport={{
        once: true,
        margin: "-100px",
        amount: 0.3
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      onViewportEnter={() => setHasAnimated(true)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      onMouseMove={(e) => {
        if (isMobile || !hasAnimated) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      style={isMobile || !hasAnimated ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className={styles.cardInner}
        animate={{
          rotateY: isHovered ? 180 : 0
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front */}
        <div className={styles.cardFront}>
          <motion.div
            className={styles.iconWrapper}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{
              delay: index * 0.15 + 0.3,
              duration: 0.6,
              type: "spring"
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 360 : 0
            }}
          >
            <i className={`devicon-${getIconClass(skill.name)} colored`} style={{ fontSize: '3rem' }}></i>
          </motion.div>

          <motion.h3
            className={styles.skillName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {skill.name}
          </motion.h3>

          <motion.div
            className={styles.staggerContainer}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <motion.div className={styles.percentText} variants={item}>
              {skill.level}%
            </motion.div>

            <motion.div className={styles.levelBarsContainer} variants={item}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.levelBarFront}
                  style={{
                    background: i < Math.ceil(skill.level / 20) ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    delay: index * 0.15 + i * 0.1 + 0.6,
                    duration: 0.5,
                    type: "spring"
                  }}
                />
              ))}
            </motion.div>

            <motion.div className={styles.expertLabel} variants={item}>
              Expert Level
            </motion.div>
          </motion.div>
        </div>

        {/* Back */}
        <div className={styles.cardBack} style={{ background: 'linear-gradient(135deg, #00f0ff, #0080ff)' }}>
          <motion.div
            className={styles.backContent}
            initial="hidden"
            animate={isHovered ? "show" : "hidden"}
            variants={container}
          >
            <motion.span className={styles.backIcon} variants={item}>
              <i className={`devicon-${getIconClass(skill.name)} colored`} style={{ fontSize: '3.5rem', color: '#1a1a1a' }}></i>
            </motion.span>
            <motion.h3 className={styles.backTitle} variants={item}>
              {skill.name}
            </motion.h3>
            <motion.div className={styles.levelBars} variants={item}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.levelBar}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < Math.ceil(skill.level / 20) ? 1 : 0.3 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </motion.div>
            <motion.p className={styles.backText} variants={item}>
              {skill.level}% Proficiency
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};