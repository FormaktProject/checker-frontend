import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'http://loacalhost:3000'
  
  return {
    rules: [
      {
        userAgent: '*', // All crawlers
        disallow: [
          '/api',
          '/admin',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },
      
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}