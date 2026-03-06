import prisma from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // ── Detect if this is a request for the specialties list ──────────────────
    if (searchParams.get("type") === "specialties") {
      const specialties = await prisma.checkerSpecialty.findMany({
        select: { category: true },
        where: {
          checker: {
            status: "APPROVED",
            isAvailable: true,
          },
        },
        distinct: ["category"],
        orderBy: { category: "asc" },
      })

      const unique = Array.from(
        new Set(specialties.map((s) => s.category.trim()).filter(Boolean))
      )

      return NextResponse.json({ data: unique })
    }

    // ── Main checker search ───────────────────────────────────────────────────
    const country       = searchParams.get("country")       || ""
    const city          = searchParams.get("city")          || ""
    const accommodation = searchParams.get("accommodation") || ""
    const page          = Number.parseInt(searchParams.get("page")  || "1")
    const limit         = Number.parseInt(searchParams.get("limit") || "20")
    const sortBy        = searchParams.get("sortBy")        || "rating"
    const minRating     = Number.parseFloat(searchParams.get("minRating") || "0")
    const priceMin      = Number.parseFloat(searchParams.get("priceMin")  || "0")
    const priceMax      = Number.parseFloat(searchParams.get("priceMax")  || "10000")

    // Comma-separated list of selected specialty categories e.g. "WiFi Test,Plumbing"
    const specialtiesParam = searchParams.get("specialties") || ""
    const selectedSpecialties = specialtiesParam
      ? specialtiesParam.split(",").map((s) => s.trim()).filter(Boolean)
      : []

    const skip = (page - 1) * limit

    // ── Build WHERE clause ────────────────────────────────────────────────────
    const where: any = {
      status: "APPROVED",          // only show approved checkers
      basePrice:     { gte: priceMin, lte: priceMax },
      averageRating: { gte: minRating },
    }

    // Country: match businessCountry OR user.country
    if (country) {
      where.OR = [
        { businessCountry: { contains: country, mode: "insensitive" } },
        { user: { country: { contains: country, mode: "insensitive" } } },
      ]
    }

    // Build AND array for additional must-all conditions
    const andConditions: any[] = []

    // City: match businessCity OR coverageAreas element
    if (city) {
      andConditions.push({
        OR: [
          { businessCity: { contains: city, mode: "insensitive" } },
          { coverageAreas: { has: city } },
        ],
      })
    }

    // Accommodation type from search box (single value)
    if (accommodation) {
      andConditions.push({
        specialties: {
          some: {
            category: { contains: accommodation, mode: "insensitive" },
          },
        },
      })
    }

    // Sidebar specialties (multi-select): checker must have AT LEAST ONE match
    if (selectedSpecialties.length > 0) {
      andConditions.push({
        specialties: {
          some: {
            category: {
              in: selectedSpecialties,
              // Prisma does not support mode on `in`, so we use a workaround:
              // fetch case-insensitively via OR across the selected values
            },
          },
        },
      })

      // ↑ Prisma `in` IS case-sensitive on PostgreSQL.
      // Replace the above with a proper case-insensitive OR:
      andConditions[andConditions.length - 1] = {
        specialties: {
          some: {
            OR: selectedSpecialties.map((s) => ({
              category: { contains: s, mode: "insensitive" },
            })),
          },
        },
      }
    }

    if (andConditions.length > 0) {
      where.AND = andConditions
    }

    // ── Sort ──────────────────────────────────────────────────────────────────
    const orderBy: any = (() => {
      switch (sortBy) {
        case "price":      return { basePrice: "asc" }
        case "price-desc": return { basePrice: "desc" }
        case "experience": return { yearsOfExperience: "desc" }
        default:           return { averageRating: "desc" }
      }
    })()

    // ── Query ─────────────────────────────────────────────────────────────────
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
              country: true,
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

    // ── Format ────────────────────────────────────────────────────────────────
    const formattedCheckers = checkers.map((checker) => {
      const resolvedCountry =
        checker.businessCountry || checker.user?.country || "Unknown"

      const resolvedCity =
        checker.businessCity || checker.coverageAreas?.[0] || null

      return {
        id: checker.id,
        name:
          [checker.user?.firstName, checker.user?.lastName]
            .filter(Boolean)
            .join(" ") ||
          checker.professionalTitle ||
          checker.businessName ||
          "Checker",
        professionalTitle: checker.professionalTitle,
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
        coverageArea: checker.coverageAreas?.length
          ? checker.coverageAreas.join(", ")
          : resolvedCity || "Multiple areas",
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