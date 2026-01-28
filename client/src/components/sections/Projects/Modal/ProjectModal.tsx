import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
    features?: string[];
    details?: {
        challenge: string;
        solution: string;
        outcomes: string[];
    };
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    return (
        <AnimatePresence>
            {project && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>×</button>

                        <div className={styles.imageContainer}>
                            <img src={project.image} alt={project.title} className={styles.image} />
                        </div>

                        <div className={styles.content}>
                            <div className={styles.mainInfo}>
                                <span className={styles.category}>{project.category}</span>
                                <h2 className={styles.title}>{project.title}</h2>
                                <p className={styles.description}>
                                    {project.description}
                                </p>

                                <div className={styles.tags}>
                                    {project.technologies.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {project.details && (
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailSection}>
                                        <h3>The Challenge</h3>
                                        <p>{project.details.challenge}</p>
                                    </div>
                                    <div className={styles.detailSection}>
                                        <h3>The Solution</h3>
                                        <p>{project.details.solution}</p>
                                    </div>
                                    <div className={styles.detailSection}>
                                        <h3>Key Outcomes</h3>
                                        <ul>
                                            {project.details.outcomes.map((outcome, i) => (
                                                <li key={i}>{outcome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className={styles.actions}>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                                        View Live Site ↗
                                    </a>
                                )}
                                <button onClick={onClose} className={styles.secondaryLink}>Close Details</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
