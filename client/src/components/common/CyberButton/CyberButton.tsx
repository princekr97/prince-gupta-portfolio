import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './CyberButton.module.css';

import { useHaptics } from '../../../hooks/useHaptics';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    download?: string;
}

export const CyberButton = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    download,
    className = '',
    onClick,
    ...props
}: CyberButtonProps) => {
    const { triggerHaptic } = useHaptics();
    const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    const handleClick = (e: any) => {
        triggerHaptic(variant === 'primary' ? 'medium' : 'light');
        if (onClick) onClick(e);
    };

    if (href) {
        return (
            <a
                href={href}
                download={download}
                className={buttonClasses}
                onClick={handleClick}
            >
                <span className={styles.buttonContent}>
                    {children}
                </span>
                <span className={styles.buttonBorder}></span>
                <span className={styles.buttonGlow}></span>
            </a>
        );
    }

    return (
        <button className={buttonClasses} onClick={handleClick} {...props}>
            <span className={styles.buttonContent}>
                {children}
            </span>
            <span className={styles.buttonBorder}></span>
            <span className={styles.buttonGlow}></span>
        </button>
    );
};
