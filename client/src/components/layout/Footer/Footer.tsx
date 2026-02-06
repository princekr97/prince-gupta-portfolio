import { motion } from 'framer-motion';
import { Logo } from '../../common/Logo/Logo';
import styles from './Footer.module.css';

export const Footer = () => {
    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Work', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.bg} aria-hidden="true" />
            <div className={`container ${styles.content}`}>
                <div className={styles.topGrid}>
                    <div className={styles.brand}>
                        <Logo />
                        <p className={styles.tagline}>Engineering logic into digital reality.</p>
                        <div className={styles.statusPill}>
                            <span className={styles.statusDot} />
                            Available for collaboration
                        </div>
                    </div>

                    <div className={styles.group}>
                        <span className={styles.groupTitle}>Navigate</span>
                        <nav className={styles.nav}>
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className={styles.navLink}>
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className={styles.group}>
                        <span className={styles.groupTitle}>Connect</span>
                        <div className={styles.social}>
                            <motion.a
                                href="https://github.com/princegupta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialButton}
                                aria-label="GitHub"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span
                                    className={styles.socialFloater}
                                    style={{ backgroundColor: '#0f0f12' }}
                                />
                                <span
                                    className={styles.socialIcon}
                                    style={{ borderColor: '#0f0f12' }}
                                >
                                    <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className={styles.socialPath}
                                            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z"
                                        />
                                    </svg>
                                </span>
                            </motion.a>

                            <motion.a
                                href="https://linkedin.com/in/princegupta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialButton}
                                aria-label="LinkedIn"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span
                                    className={styles.socialFloater}
                                    style={{ backgroundColor: '#3b82f6' }}
                                />
                                <span
                                    className={styles.socialIcon}
                                    style={{ borderColor: '#3b82f6' }}
                                >
                                    <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className={styles.socialPath}
                                            d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,19H6V10h2.5V19z M7.3,9 h-0.1C6.4,9,6,8.6,6,8.1V7.9c0-0.5,0.4-0.9,0.9-0.9h0.1C7.6,7,8,7.4,8,7.9v0.1C8,8.6,7.6,9,7.3,9z M19,19h-2.5v-4.9 c0-1.2-0.4-2-1.4-2c-0.8,0-1.3,0.6-1.5,1.2h-0.1V19H10V10h2.3v1.3h0C12.7,10.7,14,9.9,15.5,9.9c2.1,0,3.5,1.4,3.5,3.8V19z"
                                        />
                                    </svg>
                                </span>
                            </motion.a>

                            <motion.a
                                href="https://medium.com/@princekrgupta756"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialButton}
                                aria-label="Medium"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span
                                    className={styles.socialFloater}
                                    style={{ backgroundColor: '#00ab6c' }}
                                />
                                <span
                                    className={styles.socialIcon}
                                    style={{ borderColor: '#00ab6c' }}
                                >
                                    <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className={styles.socialPath}
                                            d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
                                        />
                                    </svg>
                                </span>
                            </motion.a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Prince Kumar Gupta. All Systems Operational.
                    </p>
                    <a href="#hero" className={styles.backToTop}>
                        Back to top
                    </a>
                </div>
            </div>
        </footer>
    );
};
