import { motion } from 'framer-motion';
import styles from './About.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';
import profileImg from '../../../assets/profile.jpg';

export const About = () => {
    const data = usePortfolioData();

    return (
        <section className={styles.about} id="about">
            <div className="container">
                <div className={styles.profileSection}>
                    {/* 3D Profile Card Container */}
                    <motion.div
                        className={styles.card3dContainer}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className={styles.profileCard}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className={styles.imageContainer}>
                                <motion.img
                                    src={profileImg}
                                    alt="Prince Kumar Gupta"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className={styles.holoScan}></div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.statsContainer}>
                                    <motion.div
                                        className={styles.statBox}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                    >
                                        <span className={styles.statNumber}>{data.stats.experience}+</span>
                                        <span className={styles.statLabel}>Years Exp</span>
                                    </motion.div>
                                    <motion.div
                                        className={styles.statBox}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                    >
                                        <span className={styles.statNumber}>{data.stats.projects}+</span>
                                        <span className={styles.statLabel}>Projects</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        className={styles.contentSection}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className={styles.titleGlitch}>Full Stack</h1>
                        <div className={styles.sectionSubtitle}>Developer</div>

                        <p className={styles.description}>
                            <span className={styles.descriptionHighlight}>{data.stats.experience}+ years of experience</span> building scalable, high-performance web applications across
                            <span className={styles.descriptionHighlight}> frontend, backend, and databases</span>. I specialize in {techs.slice(0, 4).map(t => t.name).join(', ')},
                            delivering clean, maintainable, production-ready systems used at scale.
                        </p>

                        <div className={styles.ownershipText}>
                            I own features end-to-end — from UI/UX implementation to backend architecture, API optimization,
                            and database design. Focused on performance, reliability, and long-term maintainability.
                        </div>

                        <div className={styles.actionsRow}>
                            <motion.a
                                href="/resume.pdf"
                                className={styles.downloadBtn}
                                whileHover={{ scale: 1.05, translateY: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Resume
                            </motion.a>
                            <div className={styles.socialIcons}>
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        whileHover={{ y: -5, rotate: 360, backgroundColor: 'var(--color-accent-cyan)' }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className={styles.techStackSection}>
                            <h2 className={styles.techGridTitle}>Core Technologies</h2>
                            <div className={styles.techGrid}>
                                {techs.map((tech, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.techCard}
                                        whileHover={{ y: -10, scale: 1.05 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className={styles.techIcon}>{tech.icon}</span>
                                        <div className={styles.techName}>{tech.name}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const techs = [
    { name: 'React', icon: '⚛️' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'REST APIs', icon: '🔌' }
];

const socials = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/prince-kumargupta-59796014b' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/' },
    { name: 'Email', icon: '📧', url: 'mailto:princekrgupta756@gmail.com' }
];
