import { MetadataRoute } from 'next';
import data from './static-data';
import prisma from '@/lib/db';
// adjust path if needed
function slugify(text: string): string {
  return text
    .normalize("NFD")                     // Decompose accents
    .replace(/[\u0300-\u036f]/g, "")     // Remove accents
    .toLowerCase()
    .replace(/\s+/g, "-")                // Replace spaces with -
    .replace(/[^\w\-]+/g, "")            // Remove non-word characters
    .replace(/\-\-+/g, "-")              // Replace multiple - with single -
    .replace(/^-+/, "")                  // Trim - from start
    .replace(/-+$/, "");                 // Trim - from end
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.checkerist.com"; // Use real domain in production
  const urls: MetadataRoute.Sitemap = [];
  // Home page
  urls.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });
   urls.push({
    url:`${baseUrl}/become-checker`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  })
  urls.push({
    url:`${baseUrl}/safety`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  })
  urls.push({
    url:`${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  })
  // Static check page
  urls.push({
    url: `${baseUrl}/check`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  });

  // Generate dynamic check/[country]/[city] pages
  for (const [country, cities] of Object.entries(data)) {
    const countrySlug = slugify(country);
    urls.push({
        url: `${baseUrl}/check/${countrySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    for (const city of cities) {
      const citySlug = slugify(city);
      urls.push({
        url: `${baseUrl}/check/${countrySlug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }
  // Fetch all approved checkers from the database
  try {
    const checkers = await prisma.checkerProfile.findMany({
      where: {
        businessCountry:{
          not: null,
        },         // only approved checkers
        
      },
      select: {
        id: true,
        updatedAt: true,
        businessCountry:true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            country: true,
          },
        },
      },
    });

    for (const checker of checkers) {
      const country = checker.businessCountry;
      const name = `${checker.user.firstName} ${checker.user.lastName}`;

      // Skip if country or name are missing/empty
      if (!country || !name.trim()) continue;

      const countrySlug = slugify(country);
      const nameSlug = slugify(name);

      urls.push({
        url: `${baseUrl}/travel-agent/${countrySlug}/${nameSlug}?id=${checker.id}`,
        lastModified: checker.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("Failed to fetch checkers for sitemap:", error);
    // Fail gracefully — sitemap still returns static URLs
  } 

  return urls;
}