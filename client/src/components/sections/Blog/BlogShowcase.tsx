import { motion } from 'framer-motion';
import styles from './BlogShowcase.module.css';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Mastering React Server Components",
        excerpt: "A deep dive into how RSCs are changing the way we build modern web applications with better performance.",
        date: "Feb 5, 2026",
        readTime: "8 min",
        category: "Full Stack",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*7e_K_S2-3z3z_K_S2-3z3w.png",
        url: "https://medium.com/@princekrgupta756"
    },
    {
        id: 2,
        title: "Designing Scalable Node.js Architectures",
        excerpt: "Best practices for building robust backend systems that can handle millions of requests while remaining maintainable.",
        date: "Jan 28, 2026",
        readTime: "12 min",
        category: "Backend",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*f-N-X-X-X-X-X-X-X-X-X.png",
        url: "https://medium.com/@princekrgupta756"
    },
    {
        id: 3,
        title: "The Future of TypeScript in 2026",
        excerpt: "Exploring upcoming features and how types are becoming even more powerful for large-scale development.",
        date: "Jan 15, 2026",
        readTime: "6 min",
        category: "Web Dev",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*X-X-X-X-X-X-X-X-X-X-X.png",
        url: "https://medium.com/@princekrgupta756"
    }
];

export const BlogShowcase = () => {
    return (
        <section className={styles.blog} id="blog">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>Blog & Insights</h2>
                    <p className={styles.subtitle}>Sharing knowledge on building high-performance systems</p>
                </motion.div>

                <div className={styles.blogGrid}>
                    {BLOG_POSTS.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className={styles.blogCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => window.open(post.url, '_blank')}
                        >
                            <div className={styles.cardImage}>
                                <img src={post.image} alt={post.title} />
                                <div className={styles.categoryBadge}>{post.category}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.meta}>
                                    <span>{post.date}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{post.readTime} read</span>
                                </div>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <div className={styles.readMore}>
                                    Read Article <span>→</span>
                                </div>
                            </div>
                            <div className={styles.cardGlow} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
