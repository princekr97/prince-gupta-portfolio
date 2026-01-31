import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './ExperienceTimeline.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';

export const ExperienceTimeline = () => {
    const data = usePortfolioData();

    return (
        <section className={styles.timeline} id="experience">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>Professional Journey</h2>
                    <p className={styles.subtitle}>
                        {data.personal.yearsOfExperience} years of engineering excellence
                    </p>
                </motion.div>

                <div className={styles.timelineContainer}>
                    {data.experience.map((exp, index) => (
                        <TimelineCard
                            key={exp.id || index}
                            experience={exp}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineCard = ({
    experience,
    index
}: {
    experience: any;
    index: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement for 3D tilt
    const rotateX = useSpring(useTransform(mouseY, [-250, 250], [7, -7]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), { stiffness: 100, damping: 30 });

    const isEven = index % 2 === 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 992;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);

        // Update CSS variables for glow effect
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}
            initial={{
                opacity: 0,
                x: isMobile ? 50 : (isEven ? -200 : 200), // Larger move distance for "coming to line" feel
                rotateY: isEven ? 30 : -30,
                scale: 0.9,
                z: -50
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                scale: 1,
                z: 0
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 1.0,
                delay: index * 0.15,
                type: "spring",
                stiffness: 50,
                damping: 12
            }}
        >
            {/* Timeline dot with pulse */}
            <motion.div
                className={styles.timelineDot}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
            >
                <motion.div
                    className={styles.dotPulse}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Experience card with 3D effect */}
            <motion.div
                ref={cardRef}
                className={styles.card}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                <div className={styles.cardGlow} />

                <div className={styles.experienceCard}>
                    {/* Header */}
                    <motion.div
                        className={styles.cardHeader}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.titleSection}>
                            <h2>{experience.company}</h2>
                            <div className={styles.role}>{experience.position}</div>
                        </div>
                    </motion.div>

                    {/* Info Compact */}
                    <motion.div
                        className={styles.infoCompact}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className={styles.infoLabel}>Client</span>
                        <span className={styles.infoValue}>{experience.client}</span>

                        <span className={styles.infoLabel}>Product</span>
                        <span className={`${styles.infoValue} ${styles.highlight}`}>
                            {experience.project}
                        </span>
                        <span className={styles.infoLabel}>Role</span>
                        <span className={`${styles.infoValue} ${styles.highlight}`}>
                            {experience.role}
                        </span>
                        <span className={styles.infoLabel}>Work Location</span>
                        <span className={styles.infoValue}>{experience.location}</span>

                        <span className={styles.infoLabel}>Duration</span>
                        <span className={styles.infoValue}>{experience.duration}</span>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        className={styles.description}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {experience.description}
                    </motion.div>

                    {/* Responsibilities */}
                    <ul className={styles.responsibilities}>
                        {experience.achievements.map((achievement: string, i: number) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                            >
                                {achievement}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Divider */}
                    <motion.div
                        className={styles.sectionDivider}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    ></motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        className={styles.techStack}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        {experience.technologies.map((tech: string, i: number) => (
                            <motion.span
                                key={tech}
                                className={styles.techBadge}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + (i * 0.05) }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
