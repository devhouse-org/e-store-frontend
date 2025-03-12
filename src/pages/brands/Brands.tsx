import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, PackageSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import estoreLogo from "@/assets/images/Logo.png";
import Loader from "@/components/ui/LoadingState";

interface BrandValue {
  id: number;
  name: string;
  sequence: number;
  html_color?: string;
  display_name: string;
  image: string | null;
}

interface BrandResponse {
  id: number;
  name: string;
  display_type: string;
  create_variant: boolean;
  values: BrandValue[];
}

// Fetch function for React Query
const fetchBrands = async (): Promise<BrandResponse> => {
  const response = await axiosInstance.post<BrandResponse>("/products/brands");
  return response.data;
};

function EmptyState({ 
  message, 
  buttonText, 
  onButtonClick 
}: { 
  message: string; 
  buttonText: string;
  onButtonClick: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <div className="p-4 mx-auto mb-6 bg-orange-100 rounded-full w-fit">
        <PackageSearch className="w-10 h-10 text-orange-500" />
      </div>
      <p className="mb-6 text-xl text-gray-600 font-tajawal-medium">
        {message}
      </p>
      <button
        onClick={onButtonClick}
        className="px-6 py-3 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600 font-tajawal-medium"
      >
        {buttonText}
      </button>
    </div>
  );
}

const Brands = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const {
    data: brandsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  }, [searchQuery]);

  // Update search when URL changes
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl || "");
    }
  }, [searchParams]);

  // Filter brands based on search query
  const filteredBrands = brandsData?.values?.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Show loader while fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <EmptyState
            message="حدث خطأ في تحميل العلامات التجارية"
            buttonText="إعادة المحاولة"
            onButtonClick={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-tajawal-bold">العلامات التجارية</h1>
          <p className="text-gray-600 font-tajawal-regular">
            اكتشف مجموعتنا الواسعة من العلامات التجارية العالمية
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="ابحث عن علامة تجارية..."
            className="w-full px-4 py-2 pr-12 text-right border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-tajawal-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?variants=${brandsData?.id}-${brand.id}`}
                className="group"
              >
                <div className="flex items-center justify-center p-4 transition-shadow bg-white rounded-lg shadow-sm aspect-square hover:shadow-md">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 font-tajawal-medium">
                      <img
                        src={estoreLogo}
                        alt={brand.name}
                        className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-center text-gray-700 font-tajawal-medium">
                  {brand.name}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            message={searchQuery 
              ? `لم يتم العثور على نتائج للبحث: ${searchQuery}`
              : "لا توجد علامات تجارية متاحة حالياً"
            }
            buttonText={searchQuery ? "مسح البحث" : "إعادة المحاولة"}
            onButtonClick={() => {
              setSearchQuery("");
              if (!searchQuery) {
                refetch();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Brands;
