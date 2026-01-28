import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { GlassCard } from '../../common/Cards/GlassCard';
import { RippleButton } from '../../common/Button/RippleButton';
import { FloatingLabelInput } from '../../common/Inputs/FloatingLabelInput';

export const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <section className={`${styles.contact} section`} id="contact">
                <div className="container" style={{ textAlign: 'center' }}>
                    <GlassCard className={styles.successCard}>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <h2 className={styles.title}>Message Sent!</h2>
                            <p className={styles.description}>Thank you for reaching out. I'll get back to you soon.</p>
                            <RippleButton onClick={() => setStatus('idle')}>Send Another</RippleButton>
                        </motion.div>
                    </GlassCard>
                </div>
            </section>
        );
    }

    return (
        <section className={`${styles.contact} section`} id="contact">
            <div className="container">
                <div className={styles.grid}>
                    <motion.div
                        className={styles.infoWrapper}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className={styles.infoCard} depth={2}>
                            <h2 className={styles.title}>Let's Build Something <span className="gradient-text">Exceptional</span></h2>
                            <p className={styles.description}>
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                            </p>

                            <div className={styles.contactMethods}>
                                <div className={styles.method}>
                                    <span className={styles.label}>Email</span>
                                    <a href="mailto:prince@example.com" className={styles.value}>prince@example.com</a>
                                </div>
                                <div className={styles.method}>
                                    <span className={styles.label}>Location</span>
                                    <span className={styles.value}>Bengaluru, India</span>
                                </div>
                                <div className={styles.method}>
                                    <span className={styles.label}>Social</span>
                                    <div className={styles.socials}>
                                        <a href="#" className={styles.socialLink}>LinkedIn</a>
                                        <a href="#" className={styles.socialLink}>GitHub</a>
                                        <a href="#" className={styles.socialLink}>Twitter</a>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        className={styles.formWrapper}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className={styles.formCard} depth={1}>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <FloatingLabelInput
                                    label="Name"
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                                <FloatingLabelInput
                                    label="Email"
                                    type="email"
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                                <FloatingLabelInput
                                    label="Message"
                                    textarea
                                    id="message"
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                />
                                <RippleButton
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={status === 'sending'}
                                    size="lg"
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </RippleButton>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
