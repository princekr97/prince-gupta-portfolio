import { useEffect } from 'react';
import usePortfolioData from '../../../hooks/usePortfolioData';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SEO = (props: SEOProps) => {
    const data = usePortfolioData();
    const {
        title = data.ui.seo.title,
        description = data.ui.seo.description,
        keywords = data.ui.seo.keywords,
        image = data.ui.seo.ogImage,
        url = 'https://princegupta.dev'
    } = props;
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
