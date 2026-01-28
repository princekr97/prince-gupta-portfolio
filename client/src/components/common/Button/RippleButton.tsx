import { useState, type ReactNode, type MouseEvent } from 'react';
import styles from './RippleButton.module.css';

interface RippleButtonProps {
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export const RippleButton = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false
}: RippleButtonProps) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.(e);
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${styles.rippleButton} ${styles[variant]} ${styles[size]} ${className}`}
            onClick={handleClick}
        >
            <span className={styles.content}>{children}</span>
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className={styles.ripple}
                    style={{ left: ripple.x, top: ripple.y }}
                />
            ))}
        </button>
    );
};
