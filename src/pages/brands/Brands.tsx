import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// Import all brand images
const brandImages = import.meta.glob('/src/assets/images/brands/all/*.{png,jpg,jpeg,webp}', {
    eager: true,
    as: 'url'
});

const Brands = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Convert the imported images object to an array
    const brands = Object.entries(brandImages).map(([path, url]) => ({
        name: path.split('/').pop()?.split('.')[0] || '',
        image: url
    }));

    // Filter brands based on search query
    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().replace(/-/g, ' ').includes(searchQuery.toLowerCase())
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

                {/* Brands Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {filteredBrands.map((brand) => (
                        <Link
                            key={brand.name}
                            to={`/products?brand=${brand.name}`}
                            className="group"
                        >
                            <div className="aspect-square bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-center">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {filteredBrands.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 font-tajawal-medium">
                            لم يتم العثور على نتائج للبحث: {searchQuery}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands; 