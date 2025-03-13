export default function AuctionSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 overflow-hidden bg-white border rounded-md shadow-md shadow-light-600 border-light-200">
        <div className="flex">
          {/* Right - Image Section */}
          <div className="flex-1 p-4 max-w-[650px]">
            <div className="active_image">
              <div className="w-full h-[300px] rounded-md border-2 bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Left - Details Section */}
          <div className="flex-1 p-4">
            {/* Title and Description */}
            <div className="py-2 border-b">
              <div className="w-3/4 mb-3 bg-gray-200 rounded-lg h-7 animate-pulse" />
              <div className="w-1/2 h-4 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Current Price */}
            <div className="py-4 border-b">
              <div className="w-32 h-5 mb-2 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-40 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Countdown Timer */}
            <div className="py-4 border-b">
              <div className="w-48 h-5 mb-2 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-[380px]">
                <div className="flex items-center justify-between w-full px-4 pt-2 pb-1 border-2 rounded-md bg-light-500">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-6 bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bid Buttons */}
            <div className="py-4 border-b">
              <div className="w-24 h-5 mb-2 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Bid Price and Button */}
            <div className="py-4">
              <div className="w-32 h-5 mb-2 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-40 h-8 mb-4 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex justify-between">
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Icons */}
        <div className="flex flex-col items-center justify-between gap-6 px-4 pb-4 mt-8 lg:flex-row">
          <div className="grid w-full grid-cols-3 gap-4 lg:gap-12 lg:w-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-y-1">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-24 h-4 mt-2 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-20 h-5 bg-gray-200 rounded-lg animate-pulse" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Other Auctions Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="overflow-hidden bg-white border rounded-lg shadow-sm">
              {/* Product Image */}
              <div className="w-full bg-gray-200 aspect-video animate-pulse" />
              
              {/* Product Details */}
              <div className="p-4">
                <div className="w-3/4 h-6 mb-2 bg-gray-200 rounded-lg animate-pulse" />
                
                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-24 h-6 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="w-20 h-6 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                
                {/* Starting Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="w-16 h-4 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                
                {/* Timer and Button */}
                <div className="flex items-center justify-between">
                  <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 