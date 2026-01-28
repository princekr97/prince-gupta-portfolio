import { motion } from 'framer-motion';

export const LiquidBlob = () => {
    return (
        <>
            <motion.div
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '15%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))',
                    opacity: 0.25,
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
                animate={{
                    borderRadius: [
                        '60% 40% 30% 70% / 60% 30% 70% 40%',
                        '30% 60% 70% 40% / 50% 60% 30% 60%',
                        '60% 40% 30% 70% / 60% 30% 70% 40%'
                    ],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '20%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
                    background: 'linear-gradient(225deg, var(--color-accent-magenta), var(--color-accent-cyan))',
                    opacity: 0.2,
                    filter: 'blur(70px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
                animate={{
                    borderRadius: [
                        '40% 60% 60% 40% / 60% 30% 70% 40%',
                        '60% 40% 30% 70% / 40% 60% 50% 60%',
                        '40% 60% 60% 40% / 60% 30% 70% 40%'
                    ],
                    rotate: [360, 180, 0],
                    scale: [1, 1.15, 1],
                    x: [0, -20, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </>
    );
};
