import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';
import { Magnetic } from '../Magnetic/Magnetic';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    loading?: boolean;
}

/**
 * Interactive button component with magnetic hover effect
 * 
 * Features:
 * - Three variants: primary, secondary, ghost
 * - Smooth animations with Framer Motion
 * - Loading state with spinner
 * - Accessible with proper ARIA attributes
 */
export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    loading = false,
    disabled,
    ...props
}) => {
    const classNames = [
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Magnetic>
            <motion.button
                className={classNames}
                disabled={disabled || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 17
                }}
                {...props}
            >
                {loading ? (
                    <span className={styles.spinner} aria-hidden="true" />
                ) : null}
                <span className={loading ? styles.hiddenText : undefined}>
                    {children}
                </span>
            </motion.button>
        </Magnetic>
    );
};
