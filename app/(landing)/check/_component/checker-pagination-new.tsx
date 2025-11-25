"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CheckerPaginationProps {
  totalResults?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

const CheckerPagination = ({ totalResults = 0, currentPage = 1, onPageChange }: CheckerPaginationProps) => {
  const resultsPerPage = 20
  const totalPages = Math.ceil(totalResults / resultsPerPage) || 1

  const handlePageClick = (pageNumber: number) => {
    if (onPageChange) {
      onPageChange(pageNumber)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
            i === currentPage ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

  const startResult = (currentPage - 1) * resultsPerPage + 1
  const endResult = Math.min(currentPage * resultsPerPage, totalResults)

  // Don't show pagination if there are no results
  if (totalResults === 0) {
    return null
  }

  return (
    <div className="border-t border-gray-200 mt-8 pt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {renderPageNumbers()}

            {currentPage < totalPages - 3 && totalPages > 5 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <button
                  onClick={() => handlePageClick(totalPages)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Results Info */}
      <div className="text-center mt-6">
        <div className="text-sm text-gray-600">
          {totalResults > 0 ? (
            <>
              {startResult} – {endResult} of {totalResults.toLocaleString()} checkers found
            </>
          ) : (
            "No checkers found"
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckerPagination
