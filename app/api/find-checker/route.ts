import prisma from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Extract query parameters
    const country = searchParams.get("country") || ""
    const city = searchParams.get("city") || ""
    const accommodation = searchParams.get("accommodation") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const sortBy = searchParams.get("sortBy") || "rating"
    const minRating = Number.parseFloat(searchParams.get("minRating") || "0")
    const priceMin = Number.parseFloat(searchParams.get("priceMin") || "0")
    const priceMax = Number.parseFloat(searchParams.get("priceMax") || "10000")

    // Calculate skip for pagination
    const skip = (page - 1) * limit

    // Build Prisma where clause
    const where: any = {
      //status: "APPROVED",
      //verificationStatus: "VERIFIED",
      user: {
        country: (country && country !=="") ? { contains: country, mode: "insensitive" } : undefined,
      },
      businessCity: (city && city !=="") ? { contains: city, mode: "insensitive" } : undefined,
      basePrice: { gte: priceMin, lte: priceMax },
      averageRating: { gte: minRating },
    }

    // Clean up undefined values
    if (!country) delete where.user
    if (!city) delete where.businessCity

    // Add accommodation specialty filter
    if (accommodation && accommodation !=="") {
      where.specialties = {
        some: {
          category: { contains: accommodation, mode: "insensitive" },
        },
      }
    }

    // Determine sort order
    const orderBy: any = {
      [sortBy === "price" ? "basePrice" : sortBy === "experience" ? "yearsOfExperience" : "averageRating"]: "desc",
    }

    // Fetch total count for pagination
    const total = await prisma.checkerProfile.count({ where })

    // Fetch paginated results
    const checkers = await prisma.checkerProfile.findMany({
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
            languages:true,
          },
        },
        specialties: {
          select: {
            category: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    })

    // Transform data to match frontend interface
    const formattedCheckers = checkers.map((checker) => ({
      id: checker.id,
      name: checker.businessName || checker.professionalTitle,
      profileImage: checker.user?.avatar || "/placeholder.svg",
      rating: Number(checker.averageRating) || 0,
      reviews: checker.totalReviews,
      experience: `${checker.yearsOfExperience} years`,
      specialties: checker.specialties.map((s) => s.category),
      location: {
        country: checker.businessCountry || "Unknown",
        city: checker.businessCity || "Unknown",
        region: checker.businessAddress || "",
      },
      coverageArea: checker.coverageAreas?.join(", ") || "Multiple areas",
      languages: checker.user.languages || ["English"],
      price: Number(checker.basePrice),
      responseTime: checker.responseTime || "Within 24 hours",
      description: checker.description,
      verified: true,
      completedChecks: checker.completedBookings,
    }))

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
