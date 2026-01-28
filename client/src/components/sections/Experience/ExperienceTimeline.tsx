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
            initial={{ opacity: 0, x: isMobile ? 50 : (isEven ? -100 : 100) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 50
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

                <div className={styles.cardHeader} style={{ transform: "translateZ(50px)" }}>
                    <motion.h3 className={styles.role}>
                        {experience.role}
                    </motion.h3>
                    <motion.p className={styles.company}>
                        {experience.company}
                    </motion.p>
                    <motion.span className={styles.period}>
                        {experience.duration}
                    </motion.span>
                </div>

                <div style={{ transform: "translateZ(30px)" }}>
                    <motion.p className={styles.description}>
                        {experience.description}
                    </motion.p>

                    <div className={styles.achievements}>
                        <h4 className={styles.achievementsTitle}>Key Deliverables</h4>
                        <ul>
                            {experience.achievements.slice(0, 3).map((achievement: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                >
                                    {achievement}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.technologies}>
                        {experience.technologies.map((tech: string) => (
                            <span key={tech} className={styles.techBadge}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
