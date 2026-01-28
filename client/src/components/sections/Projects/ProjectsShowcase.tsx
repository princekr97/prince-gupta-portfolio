import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const filteredProjects = activeFilter === 'All'
        ? data.projects
        : data.projects.filter(p => p.category === activeFilter);

    return (
        <section className={`${styles.showcase} section`} id="projects">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2 className={styles.title}>
                        Featured Projects
                    </motion.h2>
                    <motion.p className={styles.subtitle}>
                        Crafting digital experiences that make an impact
                    </motion.p>
                </motion.div>

                <motion.div
                    className={styles.filters}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((category, idx) => (
                        <motion.button
                            key={category}
                            className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
                            onClick={() => setActiveFilter(category)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                <motion.div
                    layout
                    className={styles.grid}
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
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
    onClick,
    isHovered,
    onHover,
    onLeave
}: {
    project: Project;
    index: number;
    onClick: () => void;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            className={`${styles.cardWrapper} ${project.featured ? styles.featured : ''}`}
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
            }}
        >
            <motion.div
                className={styles.card}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
            >
                <motion.div
                    className={styles.glowEffect}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                />

                <div className={styles.imageWrapper}>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className={styles.image}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className={styles.tags}
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, staggerChildren: 0.05 }}
                        >
                            {project.technologies.map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    className={styles.tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                        <motion.span
                            className={styles.viewLink}
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            View Details ↗
                        </motion.span>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.info}
                    style={{ transform: "translateZ(50px)" }}
                >
                    <motion.span
                        className={styles.projectCategory}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        {project.category}
                    </motion.span>
                    <motion.h3
                        className={styles.projectTitle}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        {project.title}
                    </motion.h3>
                    <motion.p
                        className={styles.projectDescription}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                    >
                        {project.description}
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
