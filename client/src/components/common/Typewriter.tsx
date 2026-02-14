import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text: string;
    className?: string;
    typingSpeed?: number;
    pauseDuration?: number;
}

export const Typewriter = ({
    text,
    className = '',
    typingSpeed = 100,
    pauseDuration = 2000
}: TypewriterProps) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
                setCurrentIndex(0);
                setCurrentText('');
            }, pauseDuration);
            return () => clearTimeout(pauseTimeout);
        }

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(text.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length) {
            setIsPaused(true);
        }
    }, [currentIndex, isPaused, text, typingSpeed, pauseDuration]);

    return (
        <span className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    backgroundColor: '#00ffff',
                    marginLeft: '2px',
                    verticalAlign: 'middle'
                }}
            />
        </span>
    );
};
