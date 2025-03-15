import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import {
  CircleDashed,
  Heart,
  LucideIcon,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";
import { IconType } from "react-icons";
import { Skeleton } from "@/components/ui/skeleton";

export interface CategoryProduct {
  id: number;
  name: string;
  list_price: number;
  image_1920: string;
  description_sale?: string;
  attribute_line_ids?: number[];
}

interface ProductCardProps {
  product: CategoryProduct;
  className?: string;
}

interface ProductDetails {
  id: number;
  name: string;
  list_price: number;
  description?: string;
  description_sale?: string;
  image_1920: string;
  product_variant_ids?: number[];
  attribute_line_ids?: number[];
  attributes?: {
    id: number;
    name: string;
    display_type: string;
    values: {
      id: number;
      name: string;
      price_extra: number;
    }[];
  }[];
}

const useProductDetails = (productId: number | null) => {
  return useQuery<ProductDetails, Error>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axiosInstance.post<ProductDetails>(
        "/products/product-details",
        { product_id: productId }
      );
      return response.data;
    },
    enabled: !!productId,
  });
};

const ProductAttributesSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Price Skeleton */}
      <div className="flex justify-between items-center border-b pb-4">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Attributes Skeleton */}
      <div className="space-y-6">
        {/* First Attribute Group */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 mr-auto" />
          <div className="flex flex-wrap justify-end gap-2">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-16 rounded-full" />
          </div>
        </div>

        {/* Second Attribute Group */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 mr-auto" />
          <div className="flex flex-wrap justify-end gap-2">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Quantity and Button Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { toast } = useToast();
  const { isWishlisted, addToWishlist, removeFromWishlist } =
    useWishlistStore();
  const { addToComparison, removeFromComparison, isCompared } =
    useComparisonStore();
  const {
    addToCart,
    updateQuantity,
    removeFromCart,
    products: cartProducts,
  } = useCartStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});
  const { data: productDetails, isLoading: isLoadingDetails } =
    useProductDetails(isDialogOpen ? product.id : null);

  const cartItem = cartProducts.find(
    (item) => item.id === product.id.toString()
  );

  const handleUpdateQuantity = (newQuantity: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQuantity < 1) {
      removeFromCart(product.id.toString());
    } else {
      updateQuantity(product.id.toString(), newQuantity);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.attribute_line_ids?.length > 0) {
      setIsDialogOpen(true);
      return;
    }

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.list_price,
      image: `data:image/jpeg;base64,${product.image_1920}`,
      quantity: 1,
    });
  };

  const handleQuantityChange = (increment: boolean) => {
    setSelectedQuantity((prev) =>
      increment ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAttributeChange = (attributeId: number, valueId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  };

  const handleAddToCartFromDialog = () => {
    if (!productDetails) return;

    const selectedAttributeValues = Object.entries(selectedAttributes).map(
      ([attributeId, valueId]) => {
        const attribute = productDetails.attributes?.find(
          (attr) => attr.id === parseInt(attributeId)
        );
        const value = attribute?.values.find((val) => val.id === valueId);
        return {
          attribute_id: parseInt(attributeId),
          value_id: valueId,
          attribute_name: attribute?.name,
          value_name: value?.name,
        };
      }
    );

    // Calculate total price including any price_extra from attributes
    let totalPrice = product.list_price;
    selectedAttributeValues.forEach((attr) => {
      const attribute = productDetails.attributes?.find(
        (a) => a.id === attr.attribute_id
      );
      const value = attribute?.values.find((v) => v.id === attr.value_id);
      if (value?.price_extra) {
        totalPrice += value.price_extra;
      }
    });

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: totalPrice, // Use the calculated total price
      image: `data:image/jpeg;base64,${product.image_1920}`,
      quantity: selectedQuantity, // This will now use the correct quantity
      selected_attributes: selectedAttributeValues,
    });

    // Reset dialog state
    setIsDialogOpen(false);
    setSelectedQuantity(1);
    setSelectedAttributes({});
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productId = product.id.toString();

    if (isCompared(productId)) {
      removeFromComparison(productId);
      return;
    }

    if (useComparisonStore.getState().comparisonItems.length >= 4) {
      toast({
        title: "تنبيه المقارنة",
        description: "يمكنك مقارنة 4 منتجات كحد أقصى",
        variant: "destructive",
      });
      return;
    }

    addToComparison({
      id: productId,
      name: product.name,
      price: product.list_price,
      image: product.image_1920,
      description: product.description_sale || "",
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlistItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.list_price,
      image: `data:image/jpeg;base64,${product.image_1920}`,
      description: product.description_sale || product.name,
    };

    isWishlisted(product.id.toString())
      ? removeFromWishlist(product.id.toString())
      : addToWishlist(wishlistItem);
  };

  const isInWishlist = isWishlisted(product.id.toString());
  const isInComparison = isCompared(product.id.toString());

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className={cn(
          "group rounded-xl hover:shadow-lg relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100",
          className
        )}
      >
        {/* Wishlist and Comparison Buttons Container */}
        <div className="top-2 right-2 absolute z-10 flex gap-2 p-2">
          <button
            onClick={handleWishlistClick}
            className={cn(
              "bg-white/90 hover:bg-white p-2 transition-all duration-200 rounded-full shadow-sm",
              isInWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            aria-label="إضافة للمفضلة"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isInWishlist
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400 group-hover:text-gray-600"
              )}
            />
          </button>

          <button
            onClick={handleComparisonClick}
            className={cn(
              "p-2 transition-all duration-200 rounded-full shadow-sm bg-white/90 hover:bg-white",
              isInComparison
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
            aria-label="إضافة للمقارنة"
          >
            <CircleDashed
              className={cn(
                "w-4 h-4 transition-colors",
                isInComparison
                  ? "text-orange-500"
                  : "text-gray-400 group-hover:text-gray-600"
              )}
            />
          </button>
        </div>

        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
          <img
            src={`data:image/jpeg;base64,${product.image_1920}`}
            alt={product.name}
            className="group-hover:scale-110 size-full object-cover transition-transform duration-300 rounded-md"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="line-clamp-2 group-hover:text-orange-600 mb-2 text-sm font-semibold text-gray-800 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between pt-2 mt-auto">
            <p className="text-sm font-bold text-orange-600">
              {product?.list_price?.toLocaleString()} د.ع
            </p>

            {cartItem ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) =>
                    handleUpdateQuantity(cartItem.quantity - 1, e)
                  }
                  className="hover:bg-orange-200 p-1 text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-tajawal-medium w-6 text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={(e) =>
                    handleUpdateQuantity(cartItem.quantity + 1, e)
                  }
                  className="hover:bg-orange-200 p-1 text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="hover:bg-orange-200 group-hover:shadow-sm relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                aria-label="إضافة للسلة"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="group-hover:scale-x-100 group-hover:opacity-10 absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0"></span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom shine effect on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Link>

      {/* Updated Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <div className="flex flex-col-reverse gap-6 sm:flex-row">
            {/* Left side - Product Details */}
            <div className="flex-1 space-y-4">
              <h1 className="text-xl font-bold text-right">{product.name}</h1>

              {product.description_sale && (
                <p className="text-sm text-gray-600 text-right border-b pb-4">
                  {product.description_sale}
                </p>
              )}

              {isLoadingDetails ? (
                <ProductAttributesSkeleton />
              ) : (
                <div className="space-y-6">
                  {/* Price */}
                  <div className="flex justify-between items-center border-b pb-4">
                    <p className="font-bold text-orange-600 text-xl">
                      {product?.list_price?.toLocaleString()} د.ع
                    </p>
                    <p className="text-gray-500 text-sm font-tajawal-medium">
                      السعر
                    </p>
                  </div>

                  {/* Attributes */}
                  <div className="space-y-4">
                    {productDetails?.attributes?.map((attribute) => (
                      <div key={attribute.id} className="space-y-2">
                        <h3 className="text-sm font-medium text-right text-gray-700">
                          {attribute.name}
                        </h3>
                        <div className="flex flex-wrap justify-end gap-2">
                          {attribute.values.map((value) => (
                            <button
                              key={value.id}
                              onClick={() =>
                                handleAttributeChange(attribute.id, value.id)
                              }
                              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                                selectedAttributes[attribute.id] === value.id
                                  ? "bg-orange-500 text-white"
                                  : "border border-gray-200 hover:border-orange-500"
                              }`}
                            >
                              {value.name}
                              {value.price_extra > 0 &&
                                ` (+${value.price_extra})`}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(true)}
                          Icon={Plus as IconType}
                          className="text-orange-500 hover:text-orange-600 bg-orange-50"
                        />
                        <span className="w-8 text-center font-medium">
                          {selectedQuantity}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(false)}
                          Icon={Minus as IconType}
                          className="text-orange-500 hover:text-orange-600 bg-orange-50"
                        />
                      </div>
                      <p className="text-sm text-gray-500 font-tajawal-medium">
                        الكمية
                      </p>
                    </div>

                    <Button
                      onClick={handleAddToCartFromDialog}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white h-10 font-tajawal-medium text-lg"
                      disabled={
                        productDetails?.attributes &&
                        productDetails.attributes.length > 0 &&
                        Object.keys(selectedAttributes).length !==
                          productDetails.attributes.length
                      }
                      label={
                        productDetails?.attributes &&
                        productDetails.attributes.length > 0 &&
                        Object.keys(selectedAttributes).length !==
                          productDetails.attributes.length
                          ? "إضافة للسلة"
                          : "إضافة للسلة"
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Product Image */}
            <div className="sm:w-[280px] w-full">
              <div className="aspect-square w-full bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${product.image_1920}`}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
