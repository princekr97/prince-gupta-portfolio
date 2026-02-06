import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import styles from './ProjectsShowcase.module.css';

import usePortfolioData from '../../../hooks/usePortfolioData';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
    github?: string;
    prLink?: string;
    featured?: boolean;
    features?: string[];
    impact?: string;
    details?: {
        challenge: string;
        solution: string;
        outcomes: string[];
    };
}

export const ProjectsShowcase = () => {
    const data = usePortfolioData();

    return (
        <section className={styles.showcase} id="projects">
            <div className="container" style={{ padding: '0 24px' }}>
                <header className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.titleGlitch}>Projects & Contributions</h2>
                        <p className={styles.sectionSubtitle}>Tactical deployments & mission-critical codebases</p>
                    </motion.div>
                </header>

                <div className={styles.grid}>
                    {data.projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project as any}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isExpanded) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isContribution = !!project.prLink;
    const isSunbird = project.title.toLowerCase().includes('sunbird');

    const toggleExpand = (e: React.MouseEvent) => {
        if (isContribution && project.prLink) {
            window.open(project.prLink, '_blank');
            return;
        }
        e.stopPropagation();
        setIsExpanded(!isExpanded);
        // Reset 3D on expand
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            className={`${styles.cardWrapper} ${isExpanded ? styles.expanded : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={cardRef}
                layout
                className={styles.projectCard}
                style={{
                    rotateX: isExpanded ? 0 : rotateX,
                    rotateY: isExpanded ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className={styles.imageBox} onClick={toggleExpand}>
                    <img src={project.image} alt={project.title} className={styles.image} />
                    <div className={styles.imageOverlay} />
                    <div className={styles.holoScan} />

                    {isSunbird && (
                        <div className={styles.sunbirdLogo}>S</div>
                    )}

                    <div className={styles.cardBrand}>
                        {isContribution ? 'OSS Contribution' : project.category}
                    </div>

                    <div className={styles.tacticalCorner}>
                        <span className={styles.idLabel}>ID: 00{project.id}</span>
                    </div>
                </div>

                <div className={styles.cardContent} style={{ transform: isExpanded ? "none" : "translateZ(40px)" }}>
                    <div className={styles.cardHeader}>
                        <div className={styles.mainMeta}>
                            <span className={styles.impactLabel}>
                                {isContribution ? 'Direct Code Impact' : (project.impact || 'Core Delivery')}
                            </span>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                        </div>
                        <button
                            className={`${styles.tacticalBtn} ${isExpanded ? styles.active : ''}`}
                            onClick={toggleExpand}
                        >
                            {isExpanded ? 'Collapse' : 'Tactical Intel'}
                        </button>
                    </div>

                    <p className={styles.description}>{project.description}</p>

                    <div className={styles.cardFooter}>
                        <div className={styles.techStack}>
                            {project.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className={styles.techBadge}>{tech}</span>
                            ))}
                        </div>
                        <div className={styles.actionIcon} onClick={toggleExpand}>
                            {isContribution ? (
                                <span className={styles.prLink}>PR ↗</span>
                            ) : (
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    className={styles.chevronBox}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && project.details && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className={styles.intelGrid}
                            >
                                <div className={styles.intelSection}>
                                    <h4 className={styles.intelTitle}>The Challenge</h4>
                                    <p className={styles.intelText}>{project.details.challenge}</p>
                                </div>
                                <div className={styles.intelSection}>
                                    <h4 className={styles.intelTitle}>The Solution</h4>
                                    <p className={styles.intelText}>{project.details.solution}</p>
                                </div>
                                <div className={styles.intelSection}>
                                    <h4 className={styles.intelTitle}>Outcomes</h4>
                                    <ul className={styles.intelList}>
                                        {project.details.outcomes.map((o, i) => (
                                            <li key={i}>{o}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.intelActions}>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.launchBtn}>
                                            Launch Platform 🚀
                                        </a>
                                    )}
                                    {project.github && !project.prLink && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.sourceBtn}>
                                            Source Access ↗
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};
