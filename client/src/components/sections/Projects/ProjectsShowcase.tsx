import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './ProjectsShowcase.module.css';
import { ProjectModal } from './Modal/ProjectModal';
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
    featured?: boolean;
    features?: string[];
    impact?: string;
    details?: {
        challenge: string;
        solution: string;
        outcomes: string[];
    };
}

const categories = ['All', 'E-Commerce PWA', 'Education Technology', 'Healthcare Training', 'Enterprise System'] as const;
type Category = typeof categories[number];

export const ProjectsShowcase = () => {
    const data = usePortfolioData();
    const [activeFilter, setActiveFilter] = useState<Category>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = activeFilter === 'All'
        ? data.projects
        : data.projects.filter(p => p.category === activeFilter);

    return (
        <section className={styles.showcase} id="projects">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>Featured Projects</h2>
                    <p className={styles.subtitle}>Forging digital masterpieces with precision</p>
                </motion.div>

                <div className={styles.filters}>
                    {categories.map((category, idx) => (
                        <motion.button
                            key={category}
                            className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
                            onClick={() => setActiveFilter(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <motion.div layout className={styles.grid}>
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </section>
    );
};

const ProjectCard = ({
    project,
    index,
    onClick
}: {
    project: Project;
    index: number;
    onClick: () => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 100, damping: 30 });

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
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            className={styles.cardWrapper}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            <div className={styles.glowEffect} />
            <div ref={cardRef} className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img src={project.image} alt={project.title} className={styles.image} />
                    <div className={styles.overlay}>
                        <div className={styles.tags}>
                            {project.technologies.slice(0, 3).map((tag) => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        <span className={styles.viewLink}>View Data ↗</span>
                    </div>
                </div>

                <div className={styles.info} style={{ transform: "translateZ(50px)" }}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                </div>
            </div>
        </motion.div>
    );
};
