import data from "@/app/static-data";

export function slugify(text: string): string {
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

// Utility to get original name from slug
export function getOriginalName(slug: string, type: 'country' | 'city', countrySlug?: string): string | null {
  if (type === 'country') {
    return Object.keys(data).find(c => slugify(c) === slug) || null;
  } else if (type === 'city' && countrySlug) {
    const countryOriginal = Object.keys(data).find(c => slugify(c) === countrySlug);
    if (countryOriginal && data[countryOriginal]) {
      return data[countryOriginal].find(c => slugify(c) === slug) || null;
    }
  }
  return null;
}