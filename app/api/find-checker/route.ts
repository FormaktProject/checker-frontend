import prisma from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const country       = searchParams.get("country")       || ""
    const city          = searchParams.get("city")          || ""
    const accommodation = searchParams.get("accommodation") || ""
    const page          = Number.parseInt(searchParams.get("page")  || "1")
    const limit         = Number.parseInt(searchParams.get("limit") || "20")
    const sortBy        = searchParams.get("sortBy")        || "rating"
    const minRating     = Number.parseFloat(searchParams.get("minRating") || "0")
    const priceMin      = Number.parseFloat(searchParams.get("priceMin")  || "0")
    const priceMax      = Number.parseFloat(searchParams.get("priceMax")  || "10000")

    const skip = (page - 1) * limit

    // ─────────────────────────────────────────────────────────────────────
    // BUG FIX: The original code only filtered on `user.country`.
    // But checkers typically fill in `businessCountry` on their profile,
    // NOT the `user.country` account field.  We now use OR logic so the
    // filter matches whichever field is populated.
    // ─────────────────────────────────────────────────────────────────────
    const where: any = {
      basePrice:     { gte: priceMin, lte: priceMax },
      averageRating: { gte: minRating },
    }

    if (country) {
      // Match against EITHER the profile businessCountry OR the user-level country
      where.OR = [
        { businessCountry: { contains: country, mode: "insensitive" } },
        { user: { country: { contains: country, mode: "insensitive" } } },
      ]
    }

    if (city) {
      where.businessCity = { contains: city, mode: "insensitive" }
    }

    if (accommodation) {
      where.specialties = {
        some: {
          category: { contains: accommodation, mode: "insensitive" },
        },
      }
    }

    // Sort mapping
    const orderBy: any = (() => {
      switch (sortBy) {
        case "price":      return { basePrice: "asc" }
        case "experience": return { yearsOfExperience: "desc" }
        default:           return { averageRating: "desc" }
      }
    })()

    const [total, checkers] = await Promise.all([
      prisma.checkerProfile.count({ where }),
      prisma.checkerProfile.findMany({
        where,
        select: {
          id: true,
          businessName: true,
          professionalTitle: true,
          description: true,
          yearsOfExperience: true,
          basePrice: true,
          averageRating: true,
          totalReviews: true,
          completedBookings: true,
          responseTime: true,
          businessCity: true,
          businessCountry: true,
          businessAddress: true,
          coverageAreas: true,
          user: {
            select: {
              avatar: true,
              languages: true,
              firstName: true,
              lastName: true,
              country: true,   // kept so we can fall back to it below
            },
          },
          specialties: {
            select: { category: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
    ])

    const formattedCheckers = checkers.map((checker) => {
      // ── Resolve the display country ──────────────────────────────────
      // Prefer the checker profile's businessCountry; fall back to the
      // user-level country so the card never shows "Unknown".
      const resolvedCountry =
        checker.businessCountry ||
        checker.user?.country ||
        "Unknown"

      const resolvedCity = checker.businessCity || "Unknown"

      return {
        id: checker.id,
        name:
          [checker.user?.firstName, checker.user?.lastName]
            .filter(Boolean)
            .join(" ") ||
          checker.professionalTitle ||
          checker.businessName ||
          "Checker",
        profileImage: checker.user?.avatar || "/placeholder.svg",
        rating: Number(checker.averageRating) || 0,
        reviews: checker.totalReviews ?? 0,
        experience: `${checker.yearsOfExperience ?? 0} years`,
        specialties: checker.specialties.map((s) => s.category),
        location: {
          country: resolvedCountry,
          city: resolvedCity,
          region: checker.businessAddress || "",
        },
        coverageArea: checker.coverageAreas?.join(", ") || "Multiple areas",
        languages: checker.user?.languages?.length
          ? checker.user.languages
          : ["English"],
        price: Number(checker.basePrice) || 0,
        responseTime: checker.responseTime || "Within 24 hours",
        description: checker.description || "",
        verified: true,
        completedChecks: checker.completedBookings ?? 0,
      }
    })

    return NextResponse.json({
      data: formattedCheckers,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[API] Error fetching checkers:", error)
    return NextResponse.json({ error: "Failed to fetch checkers" }, { status: 500 })
  }
}