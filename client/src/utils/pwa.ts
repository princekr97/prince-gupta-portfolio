export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.log('SW registered:', reg);

                    // Update check every hour
                    setInterval(() => {
                        reg.update();
                    }, 1000 * 60 * 60);

                    reg.onupdatefound = () => {
                        const installingWorker = reg.installing;
                        if (installingWorker == null) return;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // New content is available; please refresh.
                                    console.log('New content available, refresh needed');
                                    // You could trigger a UI notification here
                                } else {
                                    // Content is cached for offline use.
                                    console.log('Content is cached for offline use.');
                                }
                            }
                        };
                    };
                })
                .catch(err => {
                    console.error('SW registration failed:', err);
                });
        });
    }
};

export const checkPWAStatus = () => {
    // Check if app is running in standalone mode (PWA)
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');

    return isPWA;
};
