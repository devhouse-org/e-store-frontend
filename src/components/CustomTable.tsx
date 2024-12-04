import React from "react";
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
import { Trash2 } from "lucide-react";
import { IconType } from "react-icons";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import useProductStore from "@/stores/productStore";

const ProductsTable: React.FC<{ total: string }> = ({ total }) => {
  const { products, updateQuantity, removeProduct } = useProductStore();

  return (
    <div className="">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المنتجات</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">ازالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <div>{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 border w-fit p-.5 rounded">
                    <Button
                      variant="arrows"
                      size="sm"
                      className="text-green-600"
                      Icon={RxTriangleRight as IconType}
                      onClick={() => updateQuantity(product.id, 1)}
                    />
                    <span className="">{product.quantity}</span>
                    <Button
                      variant="arrows"
                      size="sm"
                      className="text-red-600"
                      Icon={RxTriangleLeft as IconType}
                      onClick={() => updateQuantity(product.id, -1)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="arrows"
                    size="sm"
                    className="bg-orange-50 hover:bg-orange-200 rounded-full p-2.5 border-orange-600 border text-orange-600"
                    Icon={Trash2 as IconType}
                    onClick={() => removeProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 " dir="rtl">
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
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="font-medium mt-2">{product.price}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="arrows"
                        size="sm"
                        className="text-green-600"
                        Icon={RxTriangleRight as IconType}
                        onClick={() => updateQuantity(product.id, 1)}
                      />
                      <span className="">{product.quantity}</span>
                      <Button
                        variant="arrows"
                        size="sm"
                        className="text-red-600"
                        Icon={RxTriangleLeft as IconType}
                        onClick={() => updateQuantity(product.id, -1)}
                      />
                    </div>
                    <Button
                      variant="arrows"
                      size="sm"
                      className="bg-orange-50 hover:bg-orange-200 rounded-full p-2.5 border-orange-600 border text-orange-600"
                      Icon={Trash2 as IconType}
                      onClick={() => removeProduct(product.id)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-right" dir="rtl">
        <div className="text-lg text-orange-500 font-medium">
          المجموع الكلي: {total}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
