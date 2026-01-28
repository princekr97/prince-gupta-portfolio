import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
    className?: string;
    onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className, onClick }) => {
    return (
        <div className={`${styles.logo} ${className}`} onClick={onClick} role="button" tabIndex={0}>
            <div className={styles.prompt}>
                <span>&gt;</span>
                <div className={styles.cursor}></div>
            </div>
            <div className={styles.name}>
                PRINCE<span className={styles.dot}>.</span>DEV
            </div>
        </div>
    );
};
