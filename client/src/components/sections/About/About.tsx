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
                                        <span className={styles.statNumber}>{data.stats.experience}</span>
                                        <span className={styles.statLabel}>Years Exp</span>
                                    </motion.div>
                                    <motion.div
                                        className={styles.statBox}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                    >
                                        <span className={styles.statNumber}>{data.stats.projects}</span>
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
                        <h2 className={styles.titleGlitch}>Full Stack</h2>
                        <div className={styles.sectionSubtitle}>Developer</div>

                        <p className={styles.description}>
                            <span className={styles.descriptionHighlight}>{data.stats.experience} years of experience</span> building scalable, high-performance web applications across
                            <span className={styles.descriptionHighlight}> frontend, backend, and databases</span>. I specialize in React, Angular, Node.js, and TypeScript,
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const socials = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/prince-kumargupta-59796014b' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/' },
    { name: 'Email', icon: '📧', url: 'mailto:princekrgupta756@gmail.com' }
];
