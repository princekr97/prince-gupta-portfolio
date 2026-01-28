import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PWAInstallPrompt.module.css';

export const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);

            // Check if user has already dismissed it this session
            const dismissed = sessionStorage.getItem('pwa-dismissed');
            if (!dismissed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        // Show the prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the PWA install');
        } else {
            console.log('User dismissed the PWA install');
        }

        // We've used the prompt, and can't use it again
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('pwa-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.prompt}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                    <div className={styles.content}>
                        <div className={styles.icon}>📱</div>
                        <div className={styles.text}>
                            <h3>Install Portfolio App</h3>
                            <p>Add to home screen for a better experience</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.dismissBtn} onClick={handleDismiss}>
                            Not Now
                        </button>
                        <button className={styles.installBtn} onClick={handleInstall}>
                            Install
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
