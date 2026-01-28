import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './Skills.module.css';
import { CyberCard } from '../../common/CyberCard';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '💻',
        skills: [
            { name: 'React', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Angular', level: 85 },
            { name: 'CSS/Sass', level: 90 }
        ]
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', level: 92 },
            { name: 'Express', level: 88 },
            { name: 'Java/Spring', level: 80 },
            { name: 'Python', level: 75 }
        ]
    },
    {
        title: 'DevOps & Tools',
        icon: '🛠️',
        skills: [
            { name: 'Docker', level: 85 },
            { name: 'AWS', level: 80 },
            { name: 'Git', level: 95 },
            { name: 'CI/CD', level: 82 }
        ]
    },
    {
        title: 'Databases',
        icon: '📊',
        skills: [
            { name: 'PostgreSQL', level: 90 },
            { name: 'MongoDB', level: 85 },
            { name: 'Redis', level: 80 },
            { name: 'Elasticsearch', level: 70 }
        ]
    }
];

export const Skills = () => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    return (
        <section className={`${styles.skills} section`} id="skills">
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Proficiency
                </motion.h2>

                <div className={styles.grid}>
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: idx * 0.15,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <CyberCard>
                                <div
                                    className={`${styles.category} ${expandedCategory === category.title ? styles.expanded : ''}`}
                                    onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                                >
                                    <div className={styles.categoryHeader}>
                                        <div className={styles.iconTitle}>
                                            <span className={styles.icon}>{category.icon}</span>
                                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                                        </div>
                                        <motion.span
                                            className={styles.arrow}
                                            animate={{ rotate: expandedCategory === category.title ? 180 : 0 }}
                                        >
                                            ↓
                                        </motion.span>
                                    </div>

                                    <AnimatePresence>
                                        {expandedCategory === category.title && (
                                            <motion.div
                                                className={styles.skillList}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {category.skills.map((skill, sIdx) => (
                                                    <div key={skill.name} className={styles.skillItem}>
                                                        <div className={styles.skillHeader}>
                                                            <span className={styles.skillName}>{skill.name}</span>
                                                            <span className={styles.skillLevel}>{skill.level}%</span>
                                                        </div>
                                                        <div className={styles.progressBg}>
                                                            <motion.div
                                                                className={styles.progressFill}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.level}%` }}
                                                                transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {!expandedCategory && (
                                        <p className={styles.clickHint}>Click to view skills</p>
                                    )}
                                </div>
                            </CyberCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
