import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import estoreLogo from "@/assets/images/Logo.png";

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
const fetchBrands = async (): Promise<BrandValue[]> => {
  const response = await axiosInstance.post<BrandResponse>("/products/brands");
  // Return empty array if no values are present
  return response.data.values || [];
};

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Replace useState and useEffect with useQuery
  const {
    data: brands = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  // Filter brands based on search query
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-tajawal-bold mb-4">العلامات التجارية</h1>
          <p className="text-gray-600 font-tajawal-regular">
            اكتشف مجموعتنا الواسعة من العلامات التجارية العالمية
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="ابحث عن علامة تجارية..."
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-tajawal-medium text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-tajawal-medium">
              فشل في تحميل العلامات التجارية
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Brands Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.name}`}
                className="group"
              >
                <div className="aspect-square bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-center">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-tajawal-medium">
                      <img
                        src={estoreLogo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-center text-sm font-tajawal-medium text-gray-700">
                  {brand.name}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-tajawal-medium">
              {searchQuery
                ? `لم يتم العثور على نتائج للبحث: ${searchQuery}`
                : "لا توجد علامات تجارية متاحة حالياً"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
