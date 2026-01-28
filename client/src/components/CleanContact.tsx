import { motion } from 'framer-motion';
import styles from './CleanContact.module.css';
import { CyberCard } from './common/CyberCard';
import { CyberButton } from './common/CyberButton';
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
    <section className={styles.contact}>
      <div className={styles.content}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Let's Connect
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ready to bring your ideas to life? Let's talk!
        </motion.p>

        <div className={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <CyberCard>
                <div className={styles.contactCard}>
                  <div className={styles.icon}>{method.icon}</div>
                  <h3 className={styles.label}>{method.label}</h3>
                  <p className={styles.value}>{method.value}</p>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CyberButton
            variant="primary"
            size="lg"
            href="/resume.pdf"
            download="Prince_Kumar_Gupta_Resume.pdf"
          >
            Download Resume
          </CyberButton>

          <CyberButton variant="secondary" size="lg">
            Schedule Call
          </CyberButton>
        </motion.div>
      </div>
    </section>
  );
};
