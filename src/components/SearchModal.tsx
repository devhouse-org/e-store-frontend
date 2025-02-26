import axiosInstance from "@/utils/axiosInstance";
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type Product = {
    id: number;
    name: string;
    list_price: number;
    image_1920: string;
    description_sale: string;
    public_categ_ids: number[];
};

type SearchResponse = {
    products: Product[];
    total: number;
    offset: number;
    limit: number;
};

const SearchModal = ({ isOpen, onClose }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.body.style.overflow = "unset";
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    const handleSearch = async (query: string, offset = 0) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post<SearchResponse>("/products/search-products", {
                searchTerm: query,
                currentOffset: offset,
                limit: 10
            });

            setSearchResults(response.data.products);
            setTotalResults(response.data.total);
            setCurrentOffset(response.data.offset);
            setHasSearched(true);
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 mx-4"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-tajawal-regular">البحث</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-orange-100/25 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="relative mb-6 flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="اكتب ما تريد البحث عنه..."
                        className="w-full p-3 border rounded-lg pl-10 font-tajawal-regular"
                        autoFocus
                    />
                    <button
                        onClick={() => handleSearch(searchQuery)}
                        className="rounded-md overflow-hidden px-4 bg-orange-400 hover:bg-orange-500 transition-colors"
                    >
                        <Search className="text-white" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {hasSearched && (
                        <div className="space-y-2">
                            <h3 className="font-bold mb-3 font-tajawal-regular">
                                نتائج البحث {totalResults > 0 && `(${totalResults})`}
                            </h3>
                            {isLoading ? (
                                <p className="text-center py-4">جاري البحث...</p>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="block p-2 hover:bg-orange-100/25 rounded-md font-tajawal-regular"
                                        onClick={onClose}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`data:image/png;base64,${product.image_1920}`}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{product.name}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {product.list_price.toLocaleString()} د.ع
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">لا توجد نتائج للبحث</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal; 