import { products } from "@/utils/data/products";
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    description: string;
};

const categories = [
    { id: 1, name: "لابتوب", link: "/products?category=electronics" },
    { id: 2, name: "موبايل", link: "/products?category=clothing" },
    { id: 3, name: "تابلت", link: "/products?category=furniture" },
    { id: 4, name: "كاميرا", link: "/products?category=cosmetics" },
    { id: 5, name: "العاب", link: "/products?category=books" },
];

const SearchModal = ({ isOpen, onClose }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
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

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            const filteredResults = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.brand.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
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

                <div className="relative mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="اكتب ما تريد البحث عنه..."
                        className="w-full p-3 border rounded-lg pl-10 font-tajawal-regular"
                        autoFocus
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {searchQuery.trim() ? (
                        <div className="space-y-2">
                            <h3 className="font-bold mb-3 font-tajawal-regular">نتائج البحث</h3>
                            {searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="block p-2 hover:bg-orange-100/25 rounded-md font-tajawal-regular"
                                        onClick={onClose}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{product.name}</h4>
                                                <p className="text-sm text-gray-600">{product.price.toLocaleString()} د.ع</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">لا توجد نتائج للبحث</p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <h3 className="font-bold mb-3 font-tajawal-regular">التصنيفات</h3>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    to={category.link}
                                    className="block p-2 hover:bg-orange-100/25 rounded-md font-tajawal-regular"
                                    onClick={onClose}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal; 