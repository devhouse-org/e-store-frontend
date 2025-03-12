const FilterSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Brand Section Skeleton */}
      <div className="flex items-center justify-between p-2 mb-3 text-white bg-orange-500 rounded-md font-tajawal-bold">
        <div className="w-16 h-5 rounded bg-white/20 animate-pulse"></div>
      </div>
      <div className="px-2 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border rounded border-orange-500/30 animate-pulse"></div>
              <div className="w-24 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSkeleton;
