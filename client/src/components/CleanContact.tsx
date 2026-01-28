import { motion } from 'framer-motion';
import styles from './CleanContact.module.css';
import usePortfolioData from '../hooks/usePortfolioData';

export const CleanContact = () => {
  const data = usePortfolioData();

  const contactMethods = [
    { icon: '📧', label: 'Email', value: data.contact.email },
    { icon: '📍', label: 'Location', value: data.contact.location },
    { icon: '💼', label: 'LinkedIn', value: 'LinkedIn Profile', link: data.contact.linkedin },
    { icon: '📱', label: 'Phone', value: data.contact.phone }
  ];

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>Establishing connection to future possibilities</p>
        </motion.div>

        <div className={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.contactCard}
            >
              <div className={styles.icon}>{method.icon}</div>
              <h3 className={styles.label}>{method.label}</h3>
              <p className={styles.value}>{method.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/resume.pdf"
            className={`${styles.btnBase} ${styles.btnPrimary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>

          <motion.a
            href={`mailto:${data.contact.email}`}
            className={`${styles.btnBase} ${styles.btnSecondary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Briefing
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
