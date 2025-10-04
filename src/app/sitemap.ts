import { MetadataRoute } from 'next';
import siteData from '@/data/site-data';

// This is needed for static export
// This tells Next.js to treat this route as static
export const dynamic = 'force-static';

// This function generates the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteData.siteUrl;
    const currentDate = new Date();

    // Define all routes with their configurations
    const routes = [
        {
            path: '',
            priority: 1.0,
            changeFrequency: 'daily' as const,
            images: [siteData.personal.profileImage],
        },
        {
            path: 'about',
            priority: 0.8,
            changeFrequency: 'weekly' as const,
            images: [siteData.personal.profileImage],
        },
        {
            path: 'contact',
            priority: 0.8,
            changeFrequency: 'weekly' as const,
            images: [siteData.personal.profileImage],
        },
        {
            path: 'projects',
            priority: 0.7,
            changeFrequency: 'weekly' as const,
        },
        {
            path: 'services',
            priority: 0.7,
            changeFrequency: 'monthly' as const,
        },
        {
            path: 'team',
            priority: 0.6,
            changeFrequency: 'monthly' as const,
        },
    ];

    // Generate sitemap entries
    return routes.map(({ path, priority, changeFrequency }) => ({
        url: `${baseUrl}${path ? `/${path}` : ''}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
    }));
}
