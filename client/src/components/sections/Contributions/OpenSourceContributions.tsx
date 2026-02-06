import { motion } from 'framer-motion';
import styles from './OpenSourceContributions.module.css';

export const OpenSourceContributions = () => {
    return (
        <section className={styles.contributions} id="contributions">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>Open Source Contributions</h2>
                </motion.div>

                <div className={styles.dashboard}>
                    {/* Main Featured Contribution */}
                    <motion.div
                        className={styles.mainCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.glassEffect} />

                        <div className={styles.cardHeader}>
                            <div className={styles.projectInfo}>
                                <div className={styles.sunbirdLogo}>S</div>
                                <div>
                                    <h3 className={styles.projectName}>Sunbird Ed (DIKSHA)</h3>
                                    <p className={styles.projectRole}>Core Infrastructure Maintainer</p>
                                </div>
                            </div>
                            <div className={styles.impactBadge}>200M+ Users</div>
                        </div>

                        <div className={styles.gridContent}>
                            <div className={styles.textContent}>
                                <p className={styles.summary}>
                                    A primary contributor to the MIT-licensed open-source technology powering **DIKSHA**,
                                    India's national digital infrastructure for education.
                                </p>

                                <ul className={styles.keyMoves}>
                                    <li>
                                        <div className={styles.bolt}>⚡</div>
                                        <div>
                                            <strong>DevOps Transformation:</strong> Architected the transition from Jenkins to **GitHub Actions**,
                                            slashing deployment times and modernizing CI/CD for over 100+ microservices.
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.bolt}>⚡</div>
                                        <div>
                                            <strong>Production Reliability:</strong> Managed mission-critical Release Merges (v6.0 to v8.0),
                                            ensuring zero-downtime deployments for a nationwide user base.
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.bolt}>⚡</div>
                                        <div>
                                            <strong>Cloud Optimization:</strong> Refined Docker orchestration and telemetry collection,
                                            improving system observability and resource efficiency.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.visualStats}>
                                <div className={styles.statBox}>
                                    <div className={styles.statLine} />
                                    <span className={styles.statVal}>100+</span>
                                    <span className={styles.statLab}>Microservices</span>
                                </div>
                                <div className={styles.statBox}>
                                    <div className={styles.statLine} />
                                    <span className={styles.statVal}>v8.0</span>
                                    <span className={styles.statLab}>Release Lead</span>
                                </div>
                                <motion.a
                                    href="https://github.com/Sunbird-Ed/SunbirdEd-portal/pulls?q=is%3Apr+is%3Aclosed+author%3Aprincegupta1131"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.prLink}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Pull Requests ↗
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
