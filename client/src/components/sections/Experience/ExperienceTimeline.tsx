import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import styles from './ExperienceTimeline.module.css';
import usePortfolioData from '../../../hooks/usePortfolioData';

export const ExperienceTimeline = () => {
    const data = usePortfolioData();

    return (
        <section className={`${styles.timeline} section`} id="experience">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <motion.h2 className={styles.title}>
                        Professional Journey
                    </motion.h2>
                    <motion.p className={styles.subtitle}>
                        {data.personal.yearsOfExperience} years of building impactful solutions
                    </motion.p>
                </motion.div>

                <div className={styles.timelineContainer}>
                    {data.experience.map((exp, index) => (
                        <TimelineCard
                            key={exp.id}
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
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.2,
        freezeOnceVisible: false
    });

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}
            initial={{ opacity: 0, x: isEven ? -100 : 100, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
            }}
        >
            {/* Timeline dot with pulse */}
            <motion.div 
                className={styles.timelineDot}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
            >
                <motion.div
                    className={styles.dotPulse}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Experience card with 3D effect */}
            <motion.div
                className={styles.card}
                onMouseMove={(e) => {
                    if (isMobile) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    x.set(e.clientX - rect.left - rect.width / 2);
                    y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                style={isMobile ? {} : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0, 240, 255, 0.2)" }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <motion.div
                    className={styles.cardGlow}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                />

                <div className={styles.cardHeader}>
                    <div>
                        <motion.h3 
                            className={styles.role}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                        >
                            {experience.role}
                        </motion.h3>
                        <motion.p 
                            className={styles.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.2 + 0.5 }}
                        >
                            {experience.company}
                        </motion.p>
                    </div>
                    <motion.span 
                        className={styles.period}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.2 + 0.6 }}
                    >
                        {experience.duration}
                    </motion.span>
                </div>

                <motion.p 
                    className={styles.description}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                >
                    {experience.description}
                </motion.p>

                <div className={styles.achievements}>
                    <motion.h4 
                        className={styles.achievementsTitle}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.2 + 0.8 }}
                    >
                        Key Achievements:
                    </motion.h4>
                    <ul>
                        {experience.achievements.slice(0, 4).map((achievement, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.2 + 0.9 + i * 0.1 }}
                                whileHover={{ x: 5, color: "#00f0ff" }}
                            >
                                {achievement}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <motion.div 
                    className={styles.technologies}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.2 + 1.2 }}
                >
                    {experience.technologies.map((tech, i) => (
                        <motion.span
                            key={tech}
                            className={styles.techBadge}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.2 + 1.3 + i * 0.05 }}
                            whileHover={{ scale: 1.1, y: -3 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
