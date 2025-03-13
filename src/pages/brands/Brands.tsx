import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
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

const Brands = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Replace useState and useEffect with useQuery
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center gap-20 mt-20">
            <Loader/>
          </div>
        )}

        {/* Brands Grid */}
        {!isLoading && !error && (
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
        )}

        {/* No Results */}
        {(!isLoading && error) && (
          <div className="py-12 text-center">
            <p className="text-gray-500 font-tajawal-medium">
              {searchQuery
                ? `لم يتم العثور على نتائج للبحث: ${searchQuery}`
                : "لا توجد علامات تجارية متاحة حالياً"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                refetch();
              }}
              className="px-4 py-2 mt-4 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
