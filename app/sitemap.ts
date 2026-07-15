import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.pickitup.com';

    const staticPages = [
        '',
        '/about',
        '/ship',
        '/find-shipments',
        '/blog',
        '/contact',
        '/login',
        '/register',
        '/how-it-works',
        '/pricing',
        '/faq',
        '/terms',
        '/privacy',
        '/carrier/login'
    ];

    const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Services
    const services = [
        'reliable-freight-service',
        'logistics-company',
        'pickup-and-delivery-services',
        'local-pickup-and-delivery-service',
        'fastest-shipping-company',
        'courier-company'
    ];

    const locations = [
        'brooklyn',
        'delaware',
        'boston',
        'new-jersey',
        'new-york'
    ];

    services.forEach((service) => {
        locations.forEach((location) => {
            const isReliable = service === 'reliable-freight-service';
            const path = isReliable
                ? `/${service}-in-${location}`
                : `/services/${service}-in-${location}`;

            sitemapEntries.push({
                url: `${baseUrl}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });
    });

    // Blogs 
    const blogSlugs = [
        '/blog/door-to-door-pickup-service-in-new-jersey-the-best-shipping-solution-for-ecommerce-businesses',
        '/blog/best-shipping-solutions-for-businesses-',
        '/blog/the-future-of-logistics-realtime-shipment-tracking-and-smart-delivery-solutions-'
    ];

    blogSlugs.forEach((slug) => {
        sitemapEntries.push({
            url: `${baseUrl}${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.64,
        });
    });

    // Role/Type specific registers that were in original XML
    const specialRegisters = [
        '/register?role=carrier',
        '/register?type=business',
        '/register?type=carrier'
    ];

    specialRegisters.forEach((slug) => {
        sitemapEntries.push({
            url: `${baseUrl}${slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        });
    });

    return sitemapEntries;
}
