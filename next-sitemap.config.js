/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://wkdkavishka.vercel.app',
    generateRobotsTxt: true, // (optional)
    // ...other options
    sitemapSizeLimit: 1000,
    sitemapFilename: 'sitemap.xml',
};
