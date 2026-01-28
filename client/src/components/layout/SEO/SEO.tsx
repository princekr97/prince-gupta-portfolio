import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SEO = ({
    title = 'Prince Kumar Gupta | Senior Software Engineer',
    description = 'Senior Software Engineer with 6.3+ years of experience specializing in React, Node.js, and TypeScript. Building scalable web applications for millions of users.',
    keywords = 'Senior Software Engineer, React Developer, Node.js Expert, TypeScript, Portfolio, Prince Kumar Gupta',
    image = '/og-image.png',
    url = 'https://princegupta.dev'
}: SEOProps) => {
    useEffect(() => {
        document.title = title;

        const updateMeta = (name: string, content: string, attr = 'name') => {
            let element = document.querySelector(`meta[${attr}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateMeta('keywords', keywords);

        // Open Graph
        updateMeta('og:title', title, 'property');
        updateMeta('og:description', description, 'property');
        updateMeta('og:image', image, 'property');
        updateMeta('og:url', url, 'property');
        updateMeta('og:type', 'website', 'property');

        // Twitter
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', image);
    }, [title, description, keywords, image, url]);

    return null;
};
