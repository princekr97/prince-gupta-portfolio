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
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <Logo />
                        <p className={styles.tagline}>Engineering logic into digital reality.</p>
                    </div>

                    <nav className={styles.nav}>
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className={styles.navLink}>
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className={styles.divider} />

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Prince Kumar Gupta. All Systems Operational.
                    </p>

                    <div className={styles.social}>
                        <motion.a
                            href="https://github.com/princegupta"
                            target="_blank"
                            className={styles.socialBtn}
                            whileHover={{ y: -3, color: 'var(--color-accent-cyan)' }}
                        >
                            Github
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/princegupta"
                            target="_blank"
                            className={styles.socialBtn}
                            whileHover={{ y: -3, color: 'var(--color-accent-cyan)' }}
                        >
                            LinkedIn
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
