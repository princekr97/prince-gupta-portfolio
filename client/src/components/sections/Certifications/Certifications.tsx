import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './Certifications.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';

export const Certifications = () => {
    const data = usePortfolioData();
    const certifications = data.certifications || [];

    if (certifications.length === 0) return null;

    return (
        <section className={styles.certs} id="certifications">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>Certifications & Achievements</h2>
                    <p className={styles.subtitle}>Professional validations of tactical brilliance</p>
                </motion.div>

                <div className={styles.grid}>
                    {certifications.map((cert: any, index: number) => (
                        <CertCard key={cert.title || index} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CertCard = ({ cert, index }: { cert: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={styles.certCard}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            <div className={styles.cardContent}>
                <div className={styles.icon} style={{ transform: "translateZ(60px)" }}>{cert.icon}</div>
                <h3 className={styles.certTitle} style={{ transform: "translateZ(40px)" }}>{cert.title}</h3>
                <p className={styles.issuer} style={{ transform: "translateZ(30px)" }}>{cert.issuer}</p>

                <div className={styles.footer} style={{ transform: "translateZ(20px)" }}>
                    <span className={styles.date}>{cert.date}</span>
                    {cert.link && cert.link !== '#' && (
                        <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.verifyLink}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Verify
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </motion.a>
                    )}
                </div>
                <div className={styles.cardGlow} />
            </div>
        </motion.div>
    );
};
