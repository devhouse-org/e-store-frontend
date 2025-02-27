import {
  LucideBookHeart,
  LucidePackageCheck,
  LucideShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

// Define TypeScript interfaces for the data
interface OrderLine {
  id: number;
}

interface Order {
  id: number;
  name: string;
  date_order: string;
  state: string;
  amount_total: number;
  order_line: number[];
  create_date: string;
  write_date: string;
}

interface OrdersResponse {
  success: boolean;
  orders: Order[];
  total: number;
  offset: number;
  limit: number;
  partner: {
    id: number;
    name: string;
  };
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post<OrdersResponse>(
          "/products/partner-orders",
          { partner_id: 67 } // Add empty object as request body since it's a POST request
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setError(
            "Failed to fetch orders: Server returned unsuccessful response"
          );
          console.error("Server response indicated failure:", response.data);
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Unknown error occurred";
        setError(`Failed to load orders: ${errorMessage}`);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format date to local string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-IQ");
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

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-xl text-gray-500 font-tajawal-bold">لوحة التحكم</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucideShoppingCart className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">4 منتجات في السلة</h2>
            <p className="font-tajawal-regular">اضغط لإكمال عملية التسوق</p>
            <a href="#" className="text-orange-500 font-tajawal-regular">
              رؤية المزيد
            </a>
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucideBookHeart className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">
              5 منتجات في المفضلات
            </h2>
            <p className="font-tajawal-regular">
              تصفح المنتجات لإضافة المزيد...
            </p>
            <a href="#" className="text-orange-500 font-tajawal-regular">
              رؤية المزيد
            </a>
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucidePackageCheck className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">2 طلبات</h2>
            <p className="font-tajawal-regular">راجع طلباتك وتأكد من وصولها</p>
            <a href="#" className="text-orange-500 font-tajawal-regular">
              رؤية المزيد
            </a>
          </div>
        </div>
      </div>

      {/* Notifications and Orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Orders */}
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h2 className="text-lg font-tajawal-medium mb-4">
            الطلبات الحالية ({orders.length})
          </h2>
          {isLoading ? (
            <p className="text-center py-4">جاري التحميل...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-4">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-tajawal-medium">
                        {order.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {formatDate(order.date_order)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.state === "sale"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {translateOrderState(order.state)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">رقم الطلب:</span>
                      <span className="font-tajawal-medium">{order.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">عدد المنتجات:</span>
                      <span className="font-tajawal-medium">
                        {order.order_line.length}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">المبلغ الإجمالي:</span>
                      <span className="font-tajawal-medium text-orange-600">
                        {formatAmount(order.amount_total)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t">
                    <button className="w-full bg-orange-50 text-orange-600 py-2 rounded-md hover:bg-orange-100 transition-colors">
                      عرض تفاصيل الطلب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded shadow col-span-1">
          <h2 className="text-lg font-tajawal-medium">الإشعارات</h2>
          <ul className="space-y-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <li
                  key={index}
                  className="flex bg-white shadow p-2 rounded-md gap-x-4 items-center space-x-2"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1652018145149-b61a9566b245?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-tajawal-medium line-clamp-1">
                      فريق دعم إي ستور
                    </p>
                    <p className="text-sm text-gray-500 font-tajawal-regular line-clamp-1">
                      تم فتح تذكرة جديدة
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Shipping Addresses */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-tajawal-medium">عناوين الشحن</h2>
        <table className="w-full mt-2">
          <thead className="bg-black/5 text-black">
            <tr className="text-left h-10">
              <th className="text-right px-2">#</th>
              <th className="text-right">المدينة</th>
              <th className="text-right">رقم الهاتف</th>
              <th className="text-right">المحافظة</th>
              <th className="text-right">الدولة</th>
              <th className="text-right">الخيارات</th>
            </tr>
          </thead>
          <tbody>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="border-t h-10">
                  <td className="px-2">{index + 1}</td>
                  <td>الكاظمية</td>
                  <td>07701234567</td>
                  <td>بغداد</td>
                  <td>العراق</td>
                  <td>
                    <button className="text-green-500">تعديل</button>
                    <button className="text-red-500 ml-2">حذف</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
