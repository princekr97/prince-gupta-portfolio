import { useState, type InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingLabelInput.module.css';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    textarea?: boolean;
    rows?: number;
}

export const FloatingLabelInput = ({ label, textarea, rows = 5, ...props }: FloatingLabelInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!props.value;

    const { onFocus, onBlur, ...rest } = props;

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <div className={styles.floatingInputWrapper}>
            {textarea ? (
                <motion.textarea
                    {...(rest as any)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    rows={rows}
                    className={styles.textarea}
                    animate={{
                        borderColor: isFocused ? 'var(--color-accent-cyan)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                />
            ) : (
                <motion.input
                    {...(rest as any)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={styles.input}
                    animate={{
                        borderColor: isFocused ? 'var(--color-accent-cyan)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                />
            )}
            <motion.label
                className={styles.label}
                initial={false}
                animate={{
                    y: isFocused || hasValue ? -28 : 0,
                    scale: isFocused || hasValue ? 0.85 : 1,
                    color: isFocused ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)'
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                {label}
            </motion.label>
            <motion.div
                className={styles.focusLine}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};
