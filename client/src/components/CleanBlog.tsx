import { motion } from 'framer-motion';
import styles from './CleanBlog.module.css';
import { useHaptics } from '../hooks/useHaptics';

import frontendImg from '../assets/blog/frontend_journey.png';
import dbImg from '../assets/blog/system_design_db.png';
import solveImg from '../assets/blog/solve_framework.png';
import securityImg from '../assets/blog/security_vulnerability.png';
import githubActionsImg from '../assets/blog/github_actions.jpg';

export const CleanBlog = () => {
    const { triggerHaptic } = useHaptics();

    // Blog Data
    const blogPosts = [
        {
            id: 1,
            title: "From Afraid to Confident: A Beginner’s Journey into React, Angular, and Vue.js",
            excerpt: "Overcoming the fear of modern frontend frameworks and navigating the journey to mastery.",
            date: "Feb 2026",
            tag: "Frontend",
            image: frontendImg,
            link: "https://medium.com/@princekrgupta756/from-afraid-to-confident-a-beginners-journey-into-react-angular-and-vue-js-c86198f1981a"
        },
        {
            id: 2,
            title: "Database Selection in System Design",
            excerpt: "How to choose the right database for your system based on data characteristics and usage patterns.",
            date: "Jan 2026",
            tag: "System Design",
            image: dbImg,
            link: "https://medium.com/@princekrgupta756/database-selection-in-system-design-849203c3506f"
        },
        {
            id: 3,
            title: "The SOLVE Framework: A Simple Way Teams Think Clearly Before Building",
            excerpt: "A structured approach to problem-solving that helps teams align and build effective solutions.",
            date: "Jan 2026",
            tag: "Leadership",
            image: solveImg,
            link: "https://medium.com/@princekrgupta756/the-solve-framework-a-simple-way-teams-think-clearly-before-building-91b15020c448"
        },
        {
            id: 4,
            title: "Step-by-Step Guide to Securing and Fixing Vulnerabilities in Projects Using Snyk",
            excerpt: "A practical guide to identifying and remediating security vulnerabilities in your codebase.",
            date: "Jan 2026",
            tag: "Security",
            image: securityImg,
            link: "https://medium.com/@princekrgupta756/step-by-step-guide-to-securing-and-fixing-vulnerabilities-in-projects-using-snyk-c91aadeea307"
        },
        {
            id: 5,
            title: "Beginner’s Guide to Setting Up GitHub Actions for Building and Deploying Node.js & Angular Projects",
            excerpt: "Automate your CI/CD pipeline with GitHub Actions, Docker Hub, and Azure deployment.",
            date: "Jan 2026",
            tag: "DevOps",
            image: githubActionsImg,
            link: "https://medium.com/@princekrgupta756/beginners-guide-to-setting-up-github-actions-for-building-and-deploying-node-js-a44caef5acb7"
        }
    ];

    return (
        <section className={styles.blog} id="blog">
            <div className={styles.blogContent}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>Latest Insights</h2>
                    <p className={styles.subtitle}>Thoughts on technology, coding, and digital experiences.</p>
                </motion.div>

                <div className={styles.blogGrid}>
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className={styles.blogCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            onClick={() => {
                                triggerHaptic('light');
                                window.open(post.link, '_blank');
                            }}
                        >
                            <div className={styles.cardImageWrapper}>
                                <img src={post.image} alt={post.title} className={styles.cardImage} loading="lazy" />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardDate}>{post.date}</span>
                                    <span className={styles.cardTag}>{post.tag}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <span className={styles.readMore}>
                                    Read Article <span>→</span>
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
