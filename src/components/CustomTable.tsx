import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { IconType } from "react-icons";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import useProductStore from "@/stores/productStore";
import { useCartStore } from "@/store/useCartStore";

const ProductsTable: React.FC = () => {
  const { products, updateQuantity, removeFromCart } = useCartStore();
  const cartCount = useCartStore((state) => state.cartCount);

  console.log(products)

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Calculate total using useMemo to avoid unnecessary recalculations
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  return (
    <div className="">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="hover:bg-none">
              <TableHead className="text-right">المنتجات</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">ازالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow className="hover:bg-orange-50/15" key={product.id}>
                <TableCell className="font-medium ">
                  <div className="flex items-center gap-4">
                    {
                      product.image && (
                        <img
                          // src={`data:image/png;base64,${product.image}`}
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                    <div>
                      <div>{product.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.price.toLocaleString()} د.ع</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 border w-fit p-.5 rounded">
                    <Button
                      variant="arrows"
                      size="sm"
                      className="text-green-600"
                      Icon={Plus as IconType}
                      onClick={() =>
                        handleUpdateQuantity(product.id, product.quantity + 1)
                      }
                    />
                    <span className="">{product.quantity}</span>
                    <Button
                      variant="arrows"
                      size="sm"
                      className="text-red-600"
                      Icon={Minus as IconType}
                      onClick={() =>
                        handleUpdateQuantity(product.id, product.quantity - 1)
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="arrows"
                    size="sm"
                    className="bg-orange-50 hover:bg-orange-100 rounded-full p-2.5 border-orange-600 border text-orange-600"
                    Icon={Trash2 as IconType}
                    onClick={() => removeFromCart(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4" dir="rtl">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="font-medium mt-2">
                    {product.price.toLocaleString()} د.ع
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="arrows"
                        size="sm"
                        className="text-green-600"
                        Icon={RxTriangleRight as IconType}
                        onClick={() =>
                          handleUpdateQuantity(product.id, product.quantity + 1)
                        }
                      />
                      <span className="">{product.quantity}</span>
                      <Button
                        variant="arrows"
                        size="sm"
                        className="text-red-600"
                        Icon={RxTriangleLeft as IconType}
                        onClick={() =>
                          handleUpdateQuantity(product.id, product.quantity - 1)
                        }
                      />
                    </div>
                    <Button
                      variant="arrows"
                      size="sm"
                      className="bg-orange-50 hover:bg-orange-100 rounded-full p-2.5 border-orange-600 border text-orange-600"
                      Icon={Trash2 as IconType}
                      onClick={() => removeFromCart(product.id)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total */}
      <div className="flex flex-col gap-y-2 mt-6 text-right" dir="rtl">
        <span className="text-lg font-medium">
          عدد المنتجات: <strong className="text-orange-500">{cartCount}</strong>
        </span>
        <span className="text-lg font-medium">
          المجموع الكلي: <strong className="text-orange-500">{total.toLocaleString()} د.ع</strong>
        </span>
      </div>
    </div>
  );
};

export default ProductsTable;
