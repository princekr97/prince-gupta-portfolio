import { motion } from 'framer-motion';
import styles from './BackgroundGrid.module.css';

export const BackgroundGrid = () => {
  return (
    <motion.div
      aria-hidden
      animate={{ backgroundPosition: ['0px 0px', '120px 120px'] }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={styles.grid}
    />
  );
};
