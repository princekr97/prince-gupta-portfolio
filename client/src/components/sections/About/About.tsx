import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styles from './About.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';
import profileImg from '../../../assets/profile.jpg';

export const About = () => {
    const data = usePortfolioData();
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations for parallax
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), {
        stiffness: 100,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), {
        stiffness: 100,
        damping: 30
    });

    // Parallax offsets for different layers
    const imageX = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), {
        stiffness: 150,
        damping: 25
    });
    const imageY = useSpring(useTransform(mouseY, [-300, 300], [-6, 6]), {
        stiffness: 150,
        damping: 25
    });

    const statsX = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), {
        stiffness: 120,
        damping: 20
    });
    const statsY = useSpring(useTransform(mouseY, [-300, 300], [-4, 4]), {
        stiffness: 120,
        damping: 20
    });

    // Background glow moves opposite direction (slower)
    const glowX = useSpring(useTransform(mouseX, [-300, 300], [3, -3]), {
        stiffness: 80,
        damping: 40
    });
    const glowY = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), {
        stiffness: 80,
        damping: 40
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;

            // Check if mobile
            const isMobile = window.innerWidth < 768;
            if (isMobile) return;

            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [mouseX, mouseY]);

    return (
        <section className={styles.about} id="about">
            <div className="container">
                <div className={styles.profileSection}>
                    {/* 3D Profile Card Container with Cinematic Entry */}
                    <motion.div
                        ref={cardRef}
                        className={styles.card3dContainer}
                        initial={{ opacity: 0, scale: 0.85, z: -100 }}
                        whileInView={{ opacity: 1, scale: 1, z: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 2.5,
                            ease: [0.25, 0.46, 0.45, 0.94] // Cinematic ease
                        }}
                    >
                        {/* Layer 1: Background Glow (Z: -40) */}
                        <motion.div
                            className={styles.backgroundGlow}
                            style={{ x: glowX, y: glowY }}
                        />

                        {/* Layer 2: Profile Halo (Z: -25) */}
                        <motion.div
                            className={styles.profileHalo}
                            animate={{
                                scale: [1, 1.03, 1],
                                opacity: [0.4, 0.6, 0.4]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Layer 3: Base Card (Z: 0) */}
                        <motion.div
                            className={styles.profileCard}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                        >
                            {/* Layer 4: Profile Image (Z: +20) */}
                            <motion.div
                                className={styles.imageContainer}
                                style={{
                                    x: imageX,
                                    y: imageY
                                }}
                            >
                                <motion.img
                                    src={profileImg}
                                    alt="Prince Kumar Gupta"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                                <div className={styles.holoScan}></div>
                            </motion.div>

                            {/* Layer 5: Stats Cards (Z: +35) */}
                            <motion.div
                                className={styles.cardContent}
                                style={{
                                    x: statsX,
                                    y: statsY
                                }}
                            >
                                <div className={styles.statsContainer}>
                                    <motion.div
                                        className={styles.statBox}
                                        whileHover={{
                                            y: -8,
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px rgba(0, 240, 255, 0.3)"
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <span className={styles.statNumber}>{data.stats.experience}</span>
                                        <span className={styles.statLabel}>Years Exp</span>
                                    </motion.div>
                                    <motion.div
                                        className={styles.statBox}
                                        whileHover={{
                                            y: -8,
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px rgba(0, 240, 255, 0.3)"
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <span className={styles.statNumber}>{data.stats.projects}</span>
                                        <span className={styles.statLabel}>Projects</span>
                                    </motion.div>
                                </div>
                            </motion.div>
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
                                {data.ui.hero.socialLinks.map((social, i) => (
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
