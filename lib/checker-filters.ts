export interface CheckerFilterOptions {
  country?: string
  city?: string
  accommodation?: string
  minRating?: number
  priceMin?: number
  priceMax?: number
  languages?: string[]
  specialties?: string[]
  sortBy?: "rating" | "price" | "experience"
}

export const filterCheckers = (options: CheckerFilterOptions) => {
  const where: any = {
    status: "APPROVED",
    verificationStatus: "VERIFIED",
  }

  if (options.country) {
    where.businessCountry = {
      contains: options.country,
      mode: "insensitive",
    }
  }

  if (options.city) {
    where.businessCity = {
      contains: options.city,
      mode: "insensitive",
    }
  }

  if (options.minRating) {
    where.averageRating = {
      gte: options.minRating,
    }
  }

  if (options.priceMin || options.priceMax) {
    where.basePrice = {}
    if (options.priceMin) where.basePrice.gte = options.priceMin
    if (options.priceMax) where.basePrice.lte = options.priceMax
  }

  if (options.accommodation) {
    where.specialties = {
      some: {
        category: {
          contains: options.accommodation,
          mode: "insensitive",
        },
      },
    }
  }

  if (options.languages && options.languages.length > 0) {
    where.languages = {
      hasSome: options.languages,
    }
  }

  return where
}
