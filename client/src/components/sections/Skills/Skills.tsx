import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '💻',
        skills: [
            { name: 'React', level: 95, icon: '⚛️' },
            { name: 'Angular', level: 90, icon: '🅰️' },
            { name: 'Vue.js', level: 85, icon: '💚' },
            { name: 'TypeScript', level: 90, icon: '📘' },
            { name: 'JavaScript', level: 95, icon: '🟨' },
            { name: 'HTML5/CSS3', level: 95, icon: '🎨' }
        ]
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', level: 92, icon: '🟢' },
            { name: 'Express', level: 88, icon: '🚂' },
            { name: 'Java/Spring', level: 80, icon: '☕' },
            { name: 'Python', level: 75, icon: '🐍' },
            { name: 'PostgreSQL', level: 90, icon: '🐘' },
            { name: 'MongoDB', level: 85, icon: '🍃' }
        ]
    },
    {
        title: 'DevOps & Tools',
        icon: '🛠️',
        skills: [
            { name: 'Docker', level: 85, icon: '🐳' },
            { name: 'AWS', level: 80, icon: '☁️' },
            { name: 'Git', level: 95, icon: '🔧' },
            { name: 'CI/CD', level: 82, icon: '🔄' },
            { name: 'Redis', level: 80, icon: '🔴' },
            { name: 'Figma', level: 75, icon: '🎨' }
        ]
    }
];

export const Skills = () => {
    const [activeTab, setActiveTab] = useState('Frontend');
    const activeCategory = skillCategories.find(c => c.title === activeTab);

    return (
        <section className={styles.skills} id="skills">
            <div className="container">
                <div className={styles.skillsContent}>
                    <motion.div
                        className={styles.header}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.titleGlitch}>Technical Expertise</h2>
                        <p className={styles.subtitle}>Building robust solutions with modern technologies</p>
                    </motion.div>

                    <div className={styles.tabsHeader}>
                        <div className={styles.tabsContainer}>
                            {skillCategories.map((cat) => (
                                <button
                                    key={cat.title}
                                    className={`${styles.tabBtn} ${activeTab === cat.title ? styles.activeTab : ''}`}
                                    onClick={() => setActiveTab(cat.title)}
                                >
                                    <span className={styles.tabIcon}>{cat.icon}</span>
                                    <span>{cat.title}</span>
                                    {activeTab === cat.title && (
                                        <motion.div
                                            className={styles.activeTabIndicator}
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={styles.skillsGrid}
                        >
                            {activeCategory?.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className={styles.skillCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
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
                                                transition={{ duration: 1, delay: 0.2 }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.cardGlow} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
