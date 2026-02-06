import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './OnePage.module.css';
import usePortfolioData from '../hooks/usePortfolioData';

export const OnePage = () => {
    const data = usePortfolioData();
    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProject((prev) => (prev + 1) % data.projects.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [data.projects.length]);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-section');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    };

    // Transform skills data structure
    const skillsData = [
        { category: 'Frontend', items: data.skills.frontend.map((s: any) => s.name) },
        { category: 'Backend', items: data.skills.backend.map((s: any) => s.name) },
        { category: 'Database', items: data.skills.database.map((s: any) => s.name) },
        { category: 'Tools', items: data.skills.tools.map((s: any) => s.name) }
    ];

    return (
        <div className={styles.onePage}>
            {/* Main Grid Container */}
            <div className={styles.gridContainer}>

                {/* Header Section - Full Width */}
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.headerContent}>
                        <div className={styles.nameBlock}>
                            <h1 className={styles.name}>PRINCE KUMAR GUPTA</h1>
                            <p className={styles.title}>{data.personal.title}</p>
                        </div>
                        <div className={styles.headerActions}>
                            <a href={`mailto:${data.contact.email}`} className={styles.iconBtn} aria-label="Email">
                                📧
                            </a>
                            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label="GitHub">
                                💻
                            </a>
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label="LinkedIn">
                                💼
                            </a>
                        </div>
                    </div>
                </motion.header>

                {/* Stats Bar - Full Width */}
                <motion.div
                    className={styles.statsBar}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>{data.stats.experience}</div>
                        <div className={styles.statLabel}>Years Experience</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>{data.stats.projects}</div>
                        <div className={styles.statLabel}>Projects Delivered</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>{data.stats.clients}</div>
                        <div className={styles.statLabel}>Happy Clients</div>
                    </div>
                </motion.div>

                {/* About Section - Left Column */}
                <motion.section
                    className={styles.aboutSection}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2>About</h2>
                    </div>
                    <div className={styles.aboutContent}>
                        <p className={styles.bio}>{data.personal.summary}</p>
                        <div className={styles.techStack}>
                            <h3>Tech Stack</h3>
                            <div className={styles.techTags}>
                                {data.personal.subtitle.split('|').map((tech: string, i: number) => (
                                    <span key={i} className={styles.techTag}>{tech.trim()}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Experience Section - Middle Column */}
                <motion.section
                    className={styles.experienceSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2>Experience</h2>
                    </div>
                    <div className={styles.experienceList}>
                        {data.experience.slice(0, 3).map((exp: any, i: number) => (
                            <div key={i} className={styles.expCard}>
                                <div className={styles.expHeader}>
                                    <h3>{exp.role}</h3>
                                    <span className={styles.expPeriod}>{exp.period}</span>
                                </div>
                                <p className={styles.expCompany}>{exp.company}</p>
                                <ul className={styles.expHighlights}>
                                    {exp.achievements.slice(0, 2).map((achievement: string, j: number) => (
                                        <li key={j}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills Section - Right Column */}
                <motion.section
                    className={styles.skillsSection}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2>Skills</h2>
                    </div>
                    <div className={styles.skillsGrid}>
                        {skillsData.map((category, i) => (
                            <div key={i} className={styles.skillCategory}>
                                <h3>{category.category}</h3>
                                <div className={styles.skillTags}>
                                    {category.items.map((skill, j) => (
                                        <span key={j} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Projects Showcase - Full Width */}
                <motion.section
                    className={styles.projectsSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2>Featured Projects</h2>
                    </div>
                    <div className={styles.projectShowcase}>
                        {data.projects.slice(0, 3).map((project: any, i: number) => (
                            <motion.div
                                key={i}
                                className={`${styles.projectCard} ${i === activeProject ? styles.active : ''}`}
                                whileHover={{ y: -5 }}
                            >
                                <div className={styles.projectHeader}>
                                    <h3>{project.title}</h3>
                                    <div className={styles.projectMeta}>
                                        <span className={styles.projectType}>{project.category}</span>
                                    </div>
                                </div>
                                <p className={styles.projectDesc}>{project.description}</p>
                                <div className={styles.projectTech}>
                                    {project.technologies.slice(0, 4).map((tech: string, j: number) => (
                                        <span key={j} className={styles.projectTechTag}>{tech}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Certifications - Bottom Left */}
                <motion.section
                    className={styles.certificationsSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <div className={styles.sectionHeader}>
                        <h2>Certifications</h2>
                    </div>
                    <div className={styles.certList}>
                        {data.certifications.slice(0, 3).map((cert: any, i: number) => (
                            <div key={i} className={styles.certCard}>
                                <h4>{cert.title}</h4>
                                <p className={styles.certIssuer}>{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA Section - Bottom Right */}
                <motion.section
                    className={styles.ctaSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className={styles.ctaContent}>
                        <h2>Let's Build Something Amazing</h2>
                        <p>Ready to bring your ideas to life with cutting-edge technology</p>
                        <button onClick={scrollToContact} className={styles.ctaButton}>
                            Get In Touch
                        </button>
                    </div>
                </motion.section>
            </div>

            {/* Hidden Contact Section for Scroll */}
            <div id="contact-section" className={styles.contactSection}>
                <div className={styles.contactContent}>
                    <h2>Contact Me</h2>
                    <div className={styles.contactInfo}>
                        <a href={`mailto:${data.contact.email}`} className={styles.contactLink}>
                            📧 {data.contact.email}
                        </a>
                        <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                            💻 GitHub
                        </a>
                        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                            💼 LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
