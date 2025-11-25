import { Metadata } from 'next';
import { notFound } from 'next/navigation';
//import FindCheckerClient from '../_component/find-checker-cleint';
import { getOriginalName } from '@/hook/correct-rul';
import FindCheckerClient from '../_component/find-checker-client-new';

interface PageProps {
  params: Promise<{
    params?: string[];
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const sulg  = await params;
  const urlParams = sulg.params || [];
   const countrySlug = urlParams[0] ? decodeURIComponent(urlParams[0]) : '';
  const citySlug = urlParams[1] ? decodeURIComponent(urlParams[1]) : '';
  const accommodationSlug = urlParams[2] ? decodeURIComponent(urlParams[2]) : '';

  // Get original names with accents
  const countryOriginal = getOriginalName(countrySlug, 'country');
  const cityOriginal = countryOriginal && citySlug ? getOriginalName(citySlug, 'city', countrySlug) : null;

  // Fallback to slug with spaces if not found in data
  const countryDisplay = countryOriginal || (countrySlug ? countrySlug.replace(/-/g, ' ') : '');
  const cityDisplay = cityOriginal || (citySlug ? citySlug.replace(/-/g, ' ') : '');
  const accommodationDisplay = accommodationSlug ? accommodationSlug.replace(/-/g, ' ') : '';

  let title = 'Find Professional Accommodation Checkers | CheckerIst';
  let description = 'Connect with verified local experts to check accommodations worldwide.';
  let keywords = 'accommodation checker, hotel inspector, travel expert';

  if (countryDisplay && cityDisplay && accommodationDisplay) {
    const formattedCountry = countryDisplay.charAt(0).toUpperCase() + countryDisplay.slice(1);
    const formattedCity = cityDisplay.charAt(0).toUpperCase() + cityDisplay.slice(1);
    const formattedAccommodation = accommodationDisplay.charAt(0).toUpperCase() + accommodationDisplay.slice(1);
 

    title = `${formattedAccommodation} Checkers in ${formattedCity}, ${formattedCountry} | CheckerIst`;
    description = `Find professional ${accommodationDisplay.toLowerCase()} checkers in ${formattedCity}, ${formattedCountry}.`;
    keywords = `${accommodationDisplay.toLowerCase()} checker ${cityDisplay}, ${countryDisplay} accommodation inspector`;
  } else if (countryDisplay && cityDisplay) {
    const formattedCountry = countryDisplay.charAt(0).toUpperCase() + countryDisplay.slice(1);
    const formattedCity = cityDisplay.charAt(0).toUpperCase() + cityDisplay.slice(1);
    
    title = `Accommodation Checkers in ${formattedCity}, ${formattedCountry} | CheckerIst`;
    description = `Professional accommodation checkers in ${formattedCity}, ${formattedCountry}.`;
    keywords = `accommodation checker ${cityDisplay}, ${countryDisplay} property inspector`;
  } else if (countryDisplay) {
    const formattedCountry = countryDisplay.charAt(0).toUpperCase() + countryDisplay.slice(1);
    
    title = `Accommodation Checkers in ${formattedCountry} | CheckerIst`;
    description = `Find professional accommodation checkers across ${formattedCountry}.`;
    keywords = `accommodation checker ${countryDisplay}, ${countryDisplay} property inspector`;
  }

  const baseUrl = 'https://www.checkerist.com'; // Replace with production URL
  const currentUrl = urlParams.length > 0 
    ? `${baseUrl}/check/${urlParams.join('/')}`
    : `${baseUrl}/check`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      url: currentUrl,
      title,
      description,
      siteName: 'CheckerIst',
    },
    alternates: { canonical: currentUrl },
  };
}

// Helper function to get country codes for geo meta tags
function getCountryCode(country: string): string {
  const countryCodes: { [key: string]: string } = {
    'spain': 'ES',
    'france': 'FR',
    'italy': 'IT',
    'germany': 'DE',
    'united kingdom': 'GB',
    'united states': 'US',
    'japan': 'JP',
    'thailand': 'TH',
    'australia': 'AU',
    'canada': 'CA',
    'netherlands': 'NL',
    'austria': 'AT',
    'switzerland': 'CH',
    'belgium': 'BE',
    'portugal': 'PT',
    'greece': 'GR',
  };
  return countryCodes[country.toLowerCase()] || '';
}

// Generate static params for popular destinations (for better SEO)
export async function generateStaticParams() {
  const popularDestinations = [
    // Empty params for main page
    { params: [] },
    // Countries
    { params: ['spain'] },
    { params: ['france'] },
    { params: ['italy'] },
    { params: ['germany'] },
    { params: ['united-kingdom'] },
    { params: ['united-states'] },
    { params: ['japan'] },
    { params: ['thailand'] },
    // Cities
    { params: ['spain', 'barcelona'] },
    { params: ['spain', 'madrid'] },
    { params: ['france', 'paris'] },
    { params: ['france', 'lyon'] },
    { params: ['italy', 'rome'] },
    { params: ['italy', 'milan'] },
    { params: ['united-states', 'new-york'] },
    { params: ['japan', 'tokyo'] },
    // Accommodation types in popular cities
    { params: ['spain', 'barcelona', 'hotels'] },
    { params: ['france', 'paris', 'luxury-hotels'] },
    { params: ['italy', 'rome', 'restaurants'] },
  ];

  return popularDestinations;
}

export default async function FindCheckerPage({ params }: PageProps) {
  const sulg  = await params;
  const urlParams = sulg.params || [];
  const countrySlug = urlParams[0] ? decodeURIComponent(urlParams[0]) : '';
  const citySlug = urlParams[1] ? decodeURIComponent(urlParams[1]) : '';
  const accommodationSlug = urlParams[2] ? decodeURIComponent(urlParams[2]) : '';

  const countryOriginal = getOriginalName(countrySlug, 'country');
  const cityOriginal = countryOriginal && citySlug ? getOriginalName(citySlug, 'city', countrySlug) : null;

  const countryDisplay = countryOriginal || (countrySlug ? countrySlug.replace(/-/g, ' ') : '');
  const cityDisplay = cityOriginal || (citySlug ? citySlug.replace(/-/g, ' ') : '');
  const accommodationDisplay = accommodationSlug ? accommodationSlug.replace(/-/g, ' ') : '';

  if (urlParams.length > 3) {
    notFound();
  }
  return (
    <FindCheckerClient
      initialCountry={countryDisplay}
      initialCity={cityDisplay}
      initialAccommodation={accommodationDisplay}
    />
  );
}
