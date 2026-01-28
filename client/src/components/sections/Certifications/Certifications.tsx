import { motion } from 'framer-motion';
import styles from './Certifications.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';
import { CyberCard } from '../../common/CyberCard';

export const Certifications = () => {
    const data = usePortfolioData();
    const certifications = data.certifications || [];

    if (certifications.length === 0) return null;

    return (
        <section className={styles.certs} id="certifications">
            <div className={`${styles.container} container`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>Certifications & Achievements</h2>
                    <p className={styles.subtitle}>Professional validations of my technical expertise</p>
                </motion.div>

                <div className={styles.grid}>
                    {certifications.map((cert: any, index: number) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CyberCard className={styles.certCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.icon}>{cert.icon}</div>
                                    <h3 className={styles.certTitle}>{cert.title}</h3>
                                    <p className={styles.issuer}>{cert.issuer}</p>
                                    <div className={styles.footer}>
                                        <span className={styles.date}>{cert.date}</span>
                                        {cert.link !== '#' && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.verifyLink}
                                            >
                                                Verify
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CyberCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
