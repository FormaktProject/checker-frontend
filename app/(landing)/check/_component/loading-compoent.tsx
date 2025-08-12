"use client"

const LoadingComponent = () => {
  return (
    <div className="space-y-6">
      {/* Loading Header */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="animate-pulse flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Loading Cards */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="animate-pulse">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Image Skeleton */}
                <div className="lg:w-32 flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-18"></div>
                  </div>
                </div>

                {/* Price Section Skeleton */}
                <div className="lg:w-48 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loading Animation with Text */}
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">Searching for the best checkers...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            <span className="animate-pulse">Analyzing accommodation options</span>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
