import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from './Certifications.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';

export const Certifications = () => {
    const data = usePortfolioData();
    const certifications = data.certifications || [];
    const scrollRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollRef.current || certifications.length <= 1) return;
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const index = Math.round((scrollLeft / maxScroll) * (certifications.length - 1));

        if (index !== activeIndex && index >= 0 && index < certifications.length) {
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const startAutoScroll = () => {
            if (window.innerWidth > 768 || !scrollRef.current) return;

            timeoutRef.current = setInterval(() => {
                if (!scrollRef.current) return;

                const container = scrollRef.current;
                const scrollWidth = container.scrollWidth;
                const clientWidth = container.clientWidth;
                const currentScroll = container.scrollLeft;

                // Move to next card, or back to start
                if (currentScroll + clientWidth >= scrollWidth - 20) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
                }
            }, 3500);
        };

        startAutoScroll();

        return () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
        };
    }, []);

    // Pause on interaction
    const handleInteraction = () => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
        }
    };

    if (certifications.length === 0) return null;

    return (
        <section className={styles.certs} id="certifications">
            <div className="container" style={{ padding: '0 24px' }}>
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

                <div
                    className={styles.grid}
                    ref={scrollRef}
                    onTouchStart={handleInteraction}
                    onMouseEnter={handleInteraction}
                    onScroll={handleScroll}
                >
                    {certifications.map((cert: any, index: number) => (
                        <CertCard key={cert.title || index} cert={cert} index={index} />
                    ))}
                </div>

                {/* Pagination Dots for Mobile */}
                <div className={styles.pagination}>
                    {certifications.map((_: any, idx: number) => (
                        <div
                            key={idx}
                            className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                            onClick={() => {
                                handleInteraction();
                                if (!scrollRef.current) return;
                                const container = scrollRef.current;
                                const maxScroll = container.scrollWidth - container.clientWidth;
                                const targetScroll = (idx / (certifications.length - 1)) * maxScroll;
                                container.scrollTo({
                                    left: targetScroll,
                                    behavior: 'smooth'
                                });
                            }}
                        />
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
            data-index={String(index + 1).padStart(2, '0')}
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
            {/* Chip Decorative Elements */}
            <div className={`${styles.cornerMark} ${styles.topLeft}`} />
            <div className={`${styles.cornerMark} ${styles.topRight}`} />
            <div className={styles.solderPoint} style={{ top: '10px', left: '10px' }} />
            <div className={styles.solderPoint} style={{ top: '10px', right: '10px' }} />
            <div className={styles.solderPoint} style={{ bottom: '10px', left: '10px' }} />
            <div className={styles.solderPoint} style={{ bottom: '10px', right: '10px' }} />

            <div className={styles.cardContent}>
                {/* Certificate Preview Image */}
                {cert.image && (
                    <div className={styles.imageWrapper}>
                        <img src={cert.image} alt={cert.title} className={styles.certImage} />
                    </div>
                )}

                <div className={styles.textSection}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon}>{cert.icon}</div>
                        <div className={styles.titleInfo}>
                            <h3 className={styles.certTitle}>{cert.title}</h3>
                            <div className={styles.metaLine}>
                                <span className={styles.issuer}>{cert.issuer}</span>
                                <span className={styles.separator}>|</span>
                                <span className={styles.dateValue}>{cert.date}</span>
                            </div>
                        </div>
                    </div>

                    {cert.description && (
                        <div className={styles.descriptionContainer}>
                            <p className={styles.certDescription}>{cert.description}</p>
                        </div>
                    )}

                    {cert.link && cert.link !== '#' && (
                        <div className={styles.footer}>
                            <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkedinBtn}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 119, 181, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span className={styles.btnText}>View Post</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', opacity: 0.5 }}>
                                    <path d="M7 17L17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </motion.a>
                        </div>
                    )}
                </div>
                <div className={styles.cardGlow} />
            </div>
        </motion.div >
    );
};
