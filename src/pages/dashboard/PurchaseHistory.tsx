import { Button } from '@/components/ui/button';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { LucideHistory } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type Props = {}

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

const usePartnerOrders = (partnerId: number) => {
    return useQuery<OrdersResponse, Error>({
      queryKey: ["partner-orders", partnerId],
      queryFn: async () => {
        const response = await axiosInstance.post<OrdersResponse>(
          "/products/partner-orders",
          { partner_id: partnerId }
        );
        return response.data;
      },
    });
  };

const PurchaseHistory = (props: Props) => {
    const navigate = useNavigate();
    const partnerId = localStorage.getItem("id")
    const { data, isLoading, error } = usePartnerOrders(Number(partnerId));

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-orange-500 animate-pulse">جاري التحميل...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-red-500">حدث خطأ: {error.message}</div>
            </div>
        );
    }

    if (!data?.orders?.length) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
                <div className="space-y-4 text-center">
                    <div className="p-4 mx-auto bg-orange-100 rounded-full w-fit animate-pulse">
                        <LucideHistory className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-3xl text-gray-800 font-tajawal-bold">
                        لا توجد طلبات شراء
                    </h2>
                    <p className="text-lg text-gray-600 font-tajawal-regular">
                        لم تقم بشراء أي منتج بعد
                    </p>
                </div>

                <Link to="/products">
                    <Button
                        label="إبدأ التسوق"
                        className="px-8 py-6 text-lg text-white transition-all duration-300 bg-orange-500 shadow-lg hover:bg-orange-600 rounded-xl hover:shadow-orange-200"
                    />
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="mb-4 text-lg font-tajawal-medium">
                سجل الشراء ({data.orders.length})
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 transition-shadow bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md"
                        onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-tajawal-medium">
                                    {order.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {order.date_order}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    order.state === 'sale'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-orange-100 text-orange-800'
                                }`}
                            >
                                {order.state === 'sale' ? 'تم الدفع' : 'غير مدفوع'}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">حالة التسليم:</span>
                                <span className="font-tajawal-medium">
                                    {order.state === 'sale' ? 'تم التسليم' : 'قيد الانتظار'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">عدد المنتجات:</span>
                                <span className="font-tajawal-medium">
                                    {order.order_line.length}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">المبلغ الإجمالي:</span>
                                <span className="text-orange-600 font-tajawal-medium">
                                    {new Intl.NumberFormat('ar-IQ', { style: 'currency', currency: 'IQD' }).format(order.amount_total)}
                                </span>
                            </div>
                        </div>

                        <div className="pt-3 mt-4 border-t">
                            <button className="w-full py-2 text-orange-600 transition-colors rounded-md bg-orange-50 hover:bg-orange-100">
                                عرض تفاصيل الطلب
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PurchaseHistory