import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const onChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Safari < 14 fallback
        if ('addEventListener' in media) {
            media.addEventListener('change', onChange);
            return () => media.removeEventListener('change', onChange);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (media as any).addListener(onChange);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => (media as any).removeListener(onChange);
    }, [query]);

    return matches;
};
