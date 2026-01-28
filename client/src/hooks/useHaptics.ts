export const useHaptics = () => {
    const triggerHaptic = (style: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') => {
        if (!window.navigator || !window.navigator.vibrate) return;

        switch (style) {
            case 'light':
                window.navigator.vibrate(10);
                break;
            case 'medium':
                window.navigator.vibrate(20);
                break;
            case 'heavy':
                window.navigator.vibrate(30);
                break;
            case 'success':
                window.navigator.vibrate([10, 30, 10]);
                break;
            case 'warning':
                window.navigator.vibrate([20, 50, 20]);
                break;
            case 'error':
                window.navigator.vibrate([50, 100, 50, 100, 50]);
                break;
            default:
                window.navigator.vibrate(10);
        }
    };

    return { triggerHaptic };
};
