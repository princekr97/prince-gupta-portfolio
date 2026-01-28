import { motion } from 'framer-motion';
import styles from './WordReveal.module.css';

interface WordRevealProps {
    text: string;
    delay?: number;
}

export const WordReveal = ({ text, delay = 0 }: WordRevealProps) => {
    const words = text.split(' ');

    return (
        <span className={styles.wrapper}>
            {words.map((word, idx) => (
                <span key={idx} className={styles.wordWrapper}>
                    <motion.span
                        className={styles.word}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: delay + (idx * 0.1),
                            ease: [0.33, 1, 0.68, 1]
                        }}
                    >
                        {word}
                    </motion.span>
                    {idx !== words.length - 1 && '\u00A0'}
                </span>
            ))}
        </span>
    );
};
