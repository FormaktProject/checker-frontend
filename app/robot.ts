import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.checkerist.com'
  
  return {
    rules: [
      {
        userAgent: '*', // All crawlers
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
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