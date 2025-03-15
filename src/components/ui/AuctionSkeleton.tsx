import { Skeleton } from "@/components/ui/skeleton";

const AuctionCardSkeleton = () => {
  return (
    <div className="w-full max-w-md overflow-hidden bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="md:items-center flex flex-col p-6">
        <div className="sm:flex-row sm:gap-8 flex flex-col">
          {/* Image Skeleton */}
          <div className="md:mx-0 mx-auto">
            <Skeleton className="min-w-16 w-32 h-32 mt-4 mb-6 sm:mb-0" />
          </div>

          <div className="sm:h-full flex flex-col justify-between">
            {/* Title Skeleton */}
            <div className="md:text-start md:mb-4 mb-2">
              <Skeleton className="h-7 w-48" />
            </div>

            {/* Prices Skeleton */}
            <div className="sm:flex-col sm:mb-4 flex justify-between mb-2">
              <div className="sm:flex-row sm:gap-4 flex flex-col">
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-7 w-28" />
              </div>
              <div className="sm:flex-row sm:gap-4 md:mt-2 sm:mt-0 flex flex-col">
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-7 w-28" />
              </div>
            </div>
          </div>
        </div>

        {/* Timer and Button Skeleton */}
        <div className="sm:flex-row-reverse sm:mt-4 sm:gap-12 flex flex-col items-center justify-between w-full">
          {/* Timer Skeleton */}
          <div className="sm:w-auto sm:mb-0 w-full mb-4">
            <Skeleton className="h-10 w-48" />
          </div>
          {/* Button Skeleton */}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default AuctionCardSkeleton;
