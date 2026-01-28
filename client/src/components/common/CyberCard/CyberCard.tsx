import type { ReactNode } from 'react';
import styles from './CyberCard.module.css';

interface CyberCardProps {
    children: ReactNode;
    className?: string;
}

export const CyberCard = ({
    children,
    className = ''
}: CyberCardProps) => {
    return (
        <div className={`${styles.card} ${className}`}>
            <div className={styles.cardBorder}></div>
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
};
