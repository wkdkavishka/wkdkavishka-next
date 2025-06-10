import { MetadataRoute } from 'next';

// This is needed for static export
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-static';

type SitemapEntry = {
                    url: string;
                    lastModified: Date;
                    changeFrequency: 'weekly' | 'monthly';
                    priority: number;
};

// Generate sitemap data
export default function sitemap(): MetadataRoute.Sitemap {
                    const baseUrl = 'https://wkdkavishka.github.io';
                    const currentDate = new Date();

                    // Navigation items from Navigation component
                    const navItems = [
                                        { id: 'home', label: 'Home' },
                                        { id: 'about', label: 'About' },
                                        { id: 'services', label: 'Services' },
                                        { id: 'projects', label: 'Projects' },
                                        { id: 'team', label: 'People' },
                                        { id: 'contact', label: 'Contact' },
                    ];

                    // Generate sitemap entries from nav items
                    const navEntries: SitemapEntry[] = navItems.map((item) => ({
                                        url: item.id === 'home' ? baseUrl : `${baseUrl}/${item.id}`,
                                        lastModified: currentDate,
                                        changeFrequency: item.id === 'home' ? 'weekly' : 'monthly',
                                        priority: item.id === 'home' ? 1.0 : 0.8,
                    }));

                    return [
                                        ...navEntries,

                                        // Example/Work pages
                                        // {
                                        //   url: `${baseUrl}/examples`,
                                        //   lastModified: currentDate,
                                        //   changeFrequency: 'monthly',
                                        //   priority: 0.8,
                                        // },

                                        // // Legal pages
                                        // {
                                        //   url: `${baseUrl}/privacy-policy`,
                                        //   lastModified: currentDate,
                                        //   changeFrequency: 'yearly',
                                        //   priority: 0.3,
                                        // },
                                        // {
                                        //   url: `${baseUrl}/terms-of-service`,
                                        //   lastModified: currentDate,
                                        //   changeFrequency: 'yearly',
                                        //   priority: 0.3,
                                        // },

                                        // Blog post example (you can generate these dynamically from your CMS)
                                        // {
                                        //   url: `${baseUrl}/blog/example-post`,
                                        //   lastModified: new Date('2025-01-01'),
                                        //   changeFrequency: 'yearly',
                                        //   priority: 0.7,
                                        // },

                                        // Portfolio project example (you can generate these dynamically)
                                        // {
                                        //   url: `${baseUrl}/portfolio/project-1`,
                                        //   lastModified: new Date('2024-06-01'),
                                        //   changeFrequency: 'yearly',
                                        //   priority: 0.8,
                                        // },
                    ];
}
