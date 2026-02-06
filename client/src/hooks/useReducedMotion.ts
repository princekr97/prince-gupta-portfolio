import { useState, useEffect } from 'react';

export const useReducedMotion = (): boolean => {
    const [reducedMotion, setReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const onChange = (event: MediaQueryListEvent) => {
            setReducedMotion(event.matches);
        };

        // Safari < 14 fallback
        if ('addEventListener' in mediaQuery) {
            mediaQuery.addEventListener('change', onChange);
            return () => mediaQuery.removeEventListener('change', onChange);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mediaQuery as any).addListener(onChange);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => (mediaQuery as any).removeListener(onChange);
    }, []);

    return reducedMotion;
};
