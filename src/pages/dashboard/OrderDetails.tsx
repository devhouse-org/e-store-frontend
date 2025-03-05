import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Define TypeScript interfaces
interface OrderLine {
  id: number;
  product_id: [number, string];
  product_uom_qty: number;
  price_unit: number;
  price_subtotal: number;
  price_tax: number;
  price_total: number;
  name: string;
  state: string;
}

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country_id: [number, string];
}

interface Order {
  id: number;
  name: string;
  date_order: string;
  state: string;
  amount_total: number;
  amount_untaxed: number;
  amount_tax: number;
  partner_id: [number, string];
  order_line: number[];
  create_date: string;
  write_date: string;
  order_lines: OrderLine[];
  partner: Partner;
}

interface OrderDetailsResponse {
  success: boolean;
  order: Order;
}

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery<OrderDetailsResponse, Error>({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const response = await axiosInstance.post<OrderDetailsResponse>(
        "/products/order-details",
        { order_id: Number(id) }
      );
      return response.data;
    },
  });

  // Format date to local string
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  // Format amount with Iraqi Dinar
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString("ar-IQ")} د.ع`;
  };

  // Helper function to translate order state
  const translateOrderState = (state: string) => {
    const states: { [key: string]: string } = {
      draft: "مسودة",
      sale: "مباع",
      // Add more states as needed
    };
    return states[state] || state;
  };

  if (isLoading) {
    return <div className="p-4 text-center">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error.message}</div>;
  }

  if (!data?.order) {
    return <div className="p-4 text-center">لم يتم العثور على الطلب</div>;
  }

  const order = data.order;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-tajawal-bold">تفاصيل الطلب</h1>
        <span
          className={`px-4 py-2 rounded-full text-sm ${
            order.state === "sale"
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {translateOrderState(order.state)}
        </span>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-tajawal-medium mb-2">معلومات الطلب</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">رقم الطلب:</span>
                <span className="font-tajawal-medium">{order.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الطلب:</span>
                <span className="font-tajawal-medium">
                  {formatDate(order.date_order)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span className="font-tajawal-medium">
                  {formatDate(order.create_date)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-tajawal-medium mb-2">معلومات العميل</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">الاسم:</span>
                <span className="font-tajawal-medium">{order.partner.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">البريد الإلكتروني:</span>
                <span className="font-tajawal-medium">{order.partner.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رقم الهاتف:</span>
                <span className="font-tajawal-medium">{order.partner.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Lines */}
        <div className="mt-6">
          <h2 className="text-lg font-tajawal-medium mb-4">المنتجات</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right">المنتج</th>
                  <th className="px-4 py-2 text-right">الكمية</th>
                  <th className="px-4 py-2 text-right">سعر الوحدة</th>
                  <th className="px-4 py-2 text-right">المجموع</th>
                  <th className="px-4 py-2 text-right">الضريبة</th>
                  <th className="px-4 py-2 text-right">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {order.order_lines.map((line) => (
                  <tr key={line.id} className="border-t">
                    <td className="px-4 py-2">{line.name}</td>
                    <td className="px-4 py-2">{line.product_uom_qty}</td>
                    <td className="px-4 py-2">{formatAmount(line.price_unit)}</td>
                    <td className="px-4 py-2">{formatAmount(line.price_subtotal)}</td>
                    <td className="px-4 py-2">{formatAmount(line.price_tax)}</td>
                    <td className="px-4 py-2">{formatAmount(line.price_total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-left font-tajawal-medium">
                    المجموع قبل الضريبة
                  </td>
                  <td className="px-4 py-2 font-tajawal-medium">
                    {formatAmount(order.amount_untaxed)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-left font-tajawal-medium">
                    الضريبة
                  </td>
                  <td className="px-4 py-2 font-tajawal-medium">
                    {formatAmount(order.amount_tax)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-left font-tajawal-bold">
                    الإجمالي
                  </td>
                  <td className="px-4 py-2 font-tajawal-bold text-orange-600">
                    {formatAmount(order.amount_total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 