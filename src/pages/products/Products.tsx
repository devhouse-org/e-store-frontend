import { useEffect, useState } from "react";
import { products, getBrands } from "@/utils/data/products";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { LucideCircleDashed, LucideCreditCard, LucideShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import axiosInstance from "@/utils/axiosInstance";

const Products = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const brands = getBrands();
  const { addToCart, products: cartProducts, updateQuantity, removeFromCart } = useCartStore();
  const { addToComparison, removeFromComparison, isCompared } = useComparisonStore();
  const [prods, setProds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (currentUid: number, currentOffset: number, domain: any[] = []) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/products", {
        currentUid,
        currentOffset,
        domain,
      });

      const data = response.data;
      setProds(data);
      console.log("Fetched Products:", data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const currentUid = localStorage.getItem("session_id");
    fetchProducts(0, 0, []);
    // if (currentUid) {
    // } else {
    //   // navigate("/login");
    // }
  }, []);

  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter((product) => product.brand === selectedBrand);

  const handleAddToCart = (product: any) => {
    const cartItem = cartProducts.find(item => item.id === product.id);
    if (!cartItem) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        storage: product.storage
      });
    }
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    navigate("/cart");
  };

  const handleComparisonClick = (product: any) => {
    const isInComparison = isCompared(product.id);
    if (isInComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleUpdateQuantity = (product: any, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 font-tajawal-medium">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  if (prods.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-tajawal-medium text-lg">لا توجد منتجات متوفرة</p>
          <Button
            onClick={() => fetchProducts(Number(localStorage.getItem("session_id")), 0, [])}
            className="mt-4"
            variant="outline"
            label="إعادة المحاولة"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start flex-row mt-8 px-12">
      <div className="flex-[.2] flex-col">
        <div className="title pb-4">
          <h1 className="font-tajawal-bold text-[18px] md:text-[22px] lg:text-[32px]">
            فلتر
          </h1>
        </div>
        <Filter />
      </div>
      <div className="mx-auto flex-[.8]">
        {/* title and filter */}
        <div className="title_and_filter pb-4 flex justify-between items-center">
          {/* Title */}
          <div className="title">
            <h1 className="font-tajawal-bold text-[18px] md:text-[22px] lg:text-[32px]">
              المنتجات
            </h1>
          </div>

          {/* Filter */}
          <div className="filter flex items-center gap-x-4">
            <div className="brand ">
              <div className="relative flex items-center gap-x-2">
                <p className="font-tajawal-regular">العلامة التجارية</p>
                <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                  <a
                    href="#"
                    className="px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                  >
                    الكل
                  </a>

                  <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className="hidden absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      View on Storefront
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      View Warehouse Info
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Duplicate Product
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Unpublish Product
                    </a>

                    <form method="POST" action="#">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="date">
              <div className="relative flex items-center gap-x-2">
                <p className="font-tajawal-regular">فرز حسب</p>
                <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                  <a
                    href="#"
                    className="px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                  >
                    الاحدث
                  </a>

                  <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className="hidden absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      View on Storefront
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      View Warehouse Info
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Duplicate Product
                    </a>

                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Unpublish Product
                    </a>

                    <form method="POST" action="#">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="auction_cards gap-4 flex justify-between flex-row flex-wrap">
            {/* products cards */}
            {prods.map((product) => {
              const cartItem = cartProducts.find(item => item.id === product.id);

              return (
                <div key={product.id} className="relative flex flex-col w-full sm:w-80 rounded-xl bg-white bg-clip-border shadow-md">
                  <div className="relative mx-4 p-1 mt-4 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border ">
                    <img
                      src={`data:image/png;base64,${product.image_1920}`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 py-4 flex-grow">
                    <h5 className="mb-2 block text-xl font-tajawal-medium leading-snug tracking-normal antialiased">
                      {product.name}
                    </h5>
                    {/* <p className="line-clamp-2 text-base font-tajawal-regular leading-relaxed text-inherit antialiased">
                      {product.description}
                    </p> */}
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 mt-auto">
                    <p className="mb-2 font-tajawal-bold text-orange-500 text-xl">
                      د.ع {product.list_price.toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center">
                      {/* Cart Button or Quantity Controls */}
                      {cartItem ? (
                        <div
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-2 px-2 bg-orange-100/25 rounded-md py-1"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-black"
                            onClick={() => handleUpdateQuantity(product, cartItem.quantity + 1)}
                            Icon={Plus as IconType}
                          />
                          <span className="w-6 text-center font-tajawal-medium">
                            {cartItem.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-orange-500"
                            onClick={() => handleUpdateQuantity(product, cartItem.quantity - 1)}
                            Icon={Minus as IconType}
                          />
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <LucideShoppingCart />
                        </button>
                      )}

                      {/* Right side buttons */}
                      <div className="flex gap-2">
                        {/* Buy Now button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleBuyNow(product);
                          }}
                          className="select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <LucideCreditCard />
                        </button>

                        {/* Compare button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleComparisonClick(product);
                          }}
                          className={`select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                            ${isCompared(product.id)
                              ? "bg-orange-500 shadow-blue-500/20 hover:shadow-blue-500/40"
                              : "bg-orange-200 shadow-orange-200/20 hover:shadow-orange-200/40"
                            }`}
                        >
                          <LucideCircleDashed />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination mt-20 mb-14">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
