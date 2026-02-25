import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCheckerProfile } from "./_components/server-actions";
import { ProfileHeader } from "./_components/profile-header";
import { StatsDashboard } from "./_components/states-dashboard";
import { AboutSection } from "./_components/Aboutsection";
import { PricingCoverage } from "./_components/pricing-covrage";
import { ReviewsSection } from "./_components/review-section";
import { MobileCTA } from "./_components/mobilecta";
import { CheckerProfile, slugify, unslugify } from "./_components/types-checker";
import { SpecialtiesSection } from "./_components/specialites-section";

interface PageProps {
  params: {
    location: string; // "paris-france"
    name: string;     // "john-doe"
  };
  searchParams: {
    id?: string;      // "clx1234abc"
  };
}
function generateCheckerSEO(checker: CheckerProfile, locationLabel: string) {
  const fullName = `${checker.user.firstName} ${checker.user.lastName}`;
    // Extract sub-categories from specialties
  const subCategories: string[] = [];
  if (checker.specialties && checker.specialties.length > 0) {
    checker.specialties.forEach((specialty: any) => {
      if (specialty.subcategory && specialty.subcategory.length > 0) {
        const subs = specialty.subcategory.split("||").map((s: string) => s.trim()).filter(Boolean);
        subCategories.push(...subs);
      }
    });
  }
  const defaultSubCategories = [
    "Accommodation & Rentals",
  ];
  const activeSubs = subCategories.length > 0 ? subCategories : defaultSubCategories;
  // Title: max ~60 chars — location + role + brand
  const title = `${fullName} – ${checker.professionalTitle} in ${locationLabel} | Checkerist`;

  // Description: ~155 chars — include location + sub-categories
  const subsText = activeSubs.join(", ");
  const description = `Hire ${fullName}, a ${checker.professionalTitle} in ${locationLabel}. Specializing in ${subsText}. Book a check before you pay — avoid scams & bad surprises on Checkerist.`;

  return { fullName, title, description, subCategories: activeSubs };
}
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await searchParams
  const { location, name } = await params;
  const checker = await getCheckerProfile(id as string);
  if (!checker) return { title: "Checker Not Found" };
  const locationSlug = slugify(decodeURIComponent(location));
  const nameSlug     = slugify(decodeURIComponent(name));
    // Human-readable version for display in content, breadcrumbs, SEO titles
  const locationLabel = unslugify(locationSlug);
  const { fullName, title, description, subCategories } = generateCheckerSEO(checker, locationLabel);
  const Location = `${locationLabel}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: checker.user.avatar ? [{ url: checker.user.avatar }] : [],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      // Canonical always points to the ?id= version for deduplication
      canonical: `/inspectors/${location}/${name}${id ? `?id=${id}` : ""}`,
    },
    // JSON-LD structured data will be added via <script> below
  };
}

export default async function CheckerProfilePage({ params, searchParams }: PageProps) {
  const { id } = await searchParams
  const { location,name } = await params
  const checker = await getCheckerProfile(id as string);
  
  if (!checker) {
    notFound();
  }
  const locationSlug = slugify(decodeURIComponent(location));
  const nameSlug     = slugify(decodeURIComponent(name));
    // Human-readable version for display in content, breadcrumbs, SEO titles
  const locationLabel = unslugify(locationSlug);
  const { fullName, title, description, subCategories } = generateCheckerSEO(checker, locationLabel);
  const Location = ` ${locationLabel}`;
  // JSON-LD Structured Data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: checker.professionalTitle,
    image: checker.user.avatar,
    address: {
      "@type": "PostalAddress",
      addressLocality: checker.user.city,
      addressCountry: checker.user.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: checker.averageRating,
      reviewCount: checker.totalReviews,
      bestRating: 5,
    },
    offers: {
      "@type": "Offer",
      price: checker.basePrice,
      priceCurrency: checker.currency,
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="min-h-screen flex flex-col mt-20"
        style={{ backgroundColor: "#f6f6f8", fontFamily: "'Public Sans', sans-serif" }}
      >
        {/* Breadcrumb */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/check" className="hover:text-primary">Checkers</Link>
            <span>/</span>
            <Link
              href={`/check`}
              className="hover:text-primary capitalize"
            >
              {locationLabel}
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium capitalize">
              {nameSlug}
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Profile Header (Sticky) */}
            <ProfileHeader checker={checker} />

            {/* Right: Main Content */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
              {/*<StatsDashboard checker={checker} />*/}
              <div className="flex flex-col gap-2">
                <h1 className=" text-2xl md:text-3xl text-gray-600 font-bold px-1 py-2"> {fullName} — {subCategories.join(' - ')}</h1>
                <AboutSection checker={checker} location={locationLabel}/>
              </div>
              <SpecialtiesSection specialties={checker.specialties} />
              <PricingCoverage checker={checker} />
              {/*<ReviewsSection
                reviews={checker.reviews}
                totalReviews={checker.totalReviews}
                averageRating={checker.averageRating}
              />*/}
              
            </div>
          </div>
        </main>

        {/* Mobile Sticky CTA */}
        <MobileCTA
          price={checker.basePrice}
          currency={checker.currency}
          checkerName={checker.user.firstName}
        />
      </div>
    </>
  );
}