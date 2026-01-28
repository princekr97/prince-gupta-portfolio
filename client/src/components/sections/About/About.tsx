import { motion } from 'framer-motion';
import styles from './About.module.css';
import { CyberCard } from '../../common/CyberCard';
import { CyberButton } from '../../common/CyberButton';
import usePortfolioData from '../../../hooks/usePortfolioData';
import profileImg from '../../../assets/profile.jpg';

export const About = () => {
    const data = usePortfolioData();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className={`${styles.about} section`} id="about">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>About Me</h2>
                    <p className={styles.subtitle}>Building digital experiences that matter</p>
                </motion.div>

                <div className={styles.grid}>
                    <motion.div
                        className={styles.imageContainer}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.imageWrapper}>
                            <motion.img
                                src={profileImg}
                                alt="Prince Kumar Gupta"
                                className={styles.image}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <motion.div
                            className={styles.stats}
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false }}
                        >
                            {stats.map((stat, i) => (
                                <motion.div key={i} className={styles.statItem} variants={item}>
                                    <span className={styles.statValue}>{stat.value}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className={styles.content}
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, margin: "-100px" }}
                    >
                        <motion.p variants={item} className={styles.text}>
                            {data.personal.summary}
                        </motion.p>
                        <motion.p variants={item} className={styles.text}>
                            I own features end-to-end — from UI/UX implementation to backend architecture,
                            API optimization, and database design. Focused on performance, reliability, and long-term maintainability.
                        </motion.p>

                        <motion.div variants={item} className={styles.actions}>
                            <CyberButton
                                variant="primary"
                                size="md"
                                href="/resume.pdf"
                                download="Prince_Kumar_Gupta_Resume.pdf"
                            >
                                Download Resume
                            </CyberButton>
                            <div className={styles.socialLinks}>
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        whileHover={{ scale: 1.2, y: -3 }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={item} className={styles.techStack}>
                            <h4 className={styles.techTitle}>Core Technologies</h4>
                            <div className={styles.techGrid}>
                                {techs.map((tech, i) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{
                                            opacity: 0,
                                            y: 50,
                                            scale: 0.5,
                                            rotateX: -90
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            rotateX: 0
                                        }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{
                                            duration: 0.6,
                                            delay: i * 0.1,
                                            ease: [0.34, 1.56, 0.64, 1],
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotateY: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        <CyberCard>
                                            <div className={styles.techCard}>
                                                <span className={styles.techIcon}>{tech.icon}</span>
                                                <span className={styles.techName}>{tech.name}</span>
                                            </div>
                                        </CyberCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const stats = [
    { value: '6+', label: 'Years Exp' },
    { value: '15+', label: 'Projects' },
    { value: '1M+', label: 'Users Served' },
    { value: '10+', label: 'Clients' }
];

const socials = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/prince-kumargupta-59796014b' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/' },
    { name: 'Email', icon: '📧', url: 'mailto:princekrgupta756@gmail.com' }
];

const techs = [
    { name: 'React', icon: '⚛️' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'REST APIs', icon: '🔌' }
];
