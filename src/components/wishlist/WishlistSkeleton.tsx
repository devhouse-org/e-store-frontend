import { Skeleton } from "@/components/ui/skeleton";

const WishlistSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-24 h-8 rounded-full" />
          </div>
        </div>

        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 grid grid-cols-1 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <div className="top-2 right-2 absolute z-10">
                <Skeleton className="w-5 h-5 rounded" />
              </div>
              <Skeleton className="w-full h-48 rounded-md" />
              <div className="mt-4 space-y-3">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/3 h-6" />
              </div>
              <Skeleton className="w-full h-10 mt-4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistSkeleton;
