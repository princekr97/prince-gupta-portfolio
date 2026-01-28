import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook for detecting element visibility in viewport
 * 
 * Usage:
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
 * 
 * @param options - IntersectionObserver options
 * @returns ref to attach to element and isIntersecting boolean
 */
export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
    options: UseIntersectionObserverOptions = {}
) => {
    const { freezeOnceVisible = false, ...observerOptions } = options;

    const ref = useRef<T>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Don't observe if already intersected and frozen
        if (freezeOnceVisible && hasIntersected) return;

        const observer = new IntersectionObserver(([entry]) => {
            const isElementIntersecting = entry.isIntersecting;

            setIsIntersecting(isElementIntersecting);

            if (isElementIntersecting) {
                setHasIntersected(true);
            }
        }, observerOptions);

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [observerOptions, freezeOnceVisible, hasIntersected]);

    return { ref, isIntersecting, hasIntersected };
};
