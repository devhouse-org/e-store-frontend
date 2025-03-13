export default function ProductSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left - Heart and Image */}
        <div className="relative flex-1">
          {/* Heart Icon */}
          <div className="absolute w-8 h-8 bg-gray-200 rounded-full top-4 left-4 animate-pulse" />
          
          {/* Main Image */}
          <div className="w-full h-[500px] bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Right - Product Details */}
        <div className="flex-1 space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="w-3/4 h-8 mb-3 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
                ))}
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Key Features */}
          <div>
            <div className="w-32 h-6 mb-3 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-2 h-2 mb-2 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Color Options */}
          <div>
            <div className="w-24 h-6 mb-3 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {[1, 2].map((i) => (
                <div key={i} className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-12 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <div className="w-40 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-40 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-40 h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
} 