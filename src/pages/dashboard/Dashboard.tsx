import {
  LucideBookHeart,
  LucidePackageCheck,
  LucideShoppingCart,
  LucideChevronLeft,
} from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Link } from "react-router-dom";
import LocationCard from "@/components/LocationCard";
import AddLocationDialog from "@/components/AddLocationDialog";
import Loader from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

interface Location {
  id: number;
  name: string;
  street: string;
  street2: string | false;
  city: string;
  state_id: boolean | [number, string];
  zip: boolean | string;
  country_id: boolean | [number, string];
  phone: string | false;
  type: string;
}

interface AddressesResponse {
  success: boolean;
  addresses: Location[];
}

interface Notification {
  id: number;
  subject: string;
  body: string;
  date: string;
  message_type: string;
  subtype_id: [number, string];
  res_id: number;
  author_id: [number, string];
  notification_ids: number[];
  starred: boolean;
  email_from: string;
  order?: {
    id: number;
    name: string;
    state: string;
    amount_total: number;
  };
}

interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  total: number;
  offset: number;
  limit: number;
  partner: {
    id: number;
    name: string;
  };
}

// Create the query hook within the same file
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

const useUserAddresses = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-addresses", userId],
    queryFn: async () => {
      const response = await axiosInstance.post<AddressesResponse>(
        "/user/addresses",
        {
          partner_id: Number(userId),
        }
      );
      console.log(response.data);
      return response.data.addresses;
    },

    enabled: !!userId,
  });
};

const useUserNotifications = (partnerId: number) => {
  return useQuery<NotificationsResponse, Error>({
    queryKey: ["user-notifications", partnerId],
    queryFn: async () => {
      const response = await axiosInstance.post<NotificationsResponse>(
        "/user/notifications",
        {
          partner_id: partnerId,
          limit: 10,
          currentOffset: 0,
        }
      );
      return response.data;
    },
  });
};

// Add these skeleton components at the top of the file, before the Dashboard component
const OrderSkeleton = () => (
  <div className="bg-white border rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>

    <div className="mt-4 pt-3 border-t">
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  </div>
);

const NotificationSkeleton = () => (
  <div className="flex bg-white shadow p-3 rounded-md gap-x-4 items-start">
    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
);

const LocationSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-[calc(50%-8px)]">
    <div className="space-y-3">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-end gap-2 mt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePartnerOrders(
    Number(localStorage.getItem("id"))
  );
  const orders = data?.orders || [];
  const cartCount = useCartStore((state) => state.cartCount);
  const wishlistCount = useWishlistStore((state) => state.wishlistCount);
  const userId = localStorage.getItem("id");

  const {
    data: locationsData,
    isLoading: isLoadingLocations,
    error: locationsError,
    refetch: refetchLocations,
  } = useUserAddresses(userId);

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useUserNotifications(Number(userId));

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

  const handleDeleteAddress = async (id: number) => {
    try {
      await axiosInstance.delete(`/user/address/${id}`);
      refetchLocations();
    } catch (err) {
      console.error("Error deleting location:", err);
    }
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
            {cartCount > 0 ? (
              <>
                <h2 className="text-lg font-tajawal-medium">
                  {cartCount} منتجات في السلة
                </h2>
                <p className="font-tajawal-regular">اضغط لإكمال عملية التسوق</p>
                <Link
                  to="/cart"
                  className="text-orange-500 font-tajawal-regular"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-lg font-tajawal-medium">السلة فارغة</h2>
                <p className="font-tajawal-regular">
                  لم تضف أي منتجات للسلة بعد
                </p>
                <Link
                  to="/products"
                  className="text-orange-500 font-tajawal-regular"
                >
                  تسوق الآن
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucideBookHeart className="text-white" size={40} />
          </div>
          <div>
            {wishlistCount > 0 ? (
              <>
                <h2 className="text-lg font-tajawal-medium">
                  {wishlistCount} منتجات في المفضلات
                </h2>
                <p className="font-tajawal-regular">
                  تصفح المنتجات لإضافة المزيد...
                </p>
                <Link
                  to="/wishlist"
                  className="text-orange-500 font-tajawal-regular"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-lg font-tajawal-medium">
                  لا توجد منتجات مفضلة
                </h2>
                <p className="font-tajawal-regular">
                  لم تضف أي منتجات للمفضلة بعد
                </p>
                <Link
                  to="/products"
                  className="text-orange-500 font-tajawal-regular"
                >
                  تصفح المنتجات
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucidePackageCheck className="text-white" size={40} />
          </div>
          <div>
            {orders.length > 0 ? (
              <>
                <h2 className="text-lg font-tajawal-medium">
                  {orders.length} طلبات
                </h2>
                <p className="font-tajawal-regular">
                  راجع طلباتك وتأكد من وصولها
                </p>
                <Link
                  to="/dashboard/orders"
                  className="text-orange-500 font-tajawal-regular"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-lg font-tajawal-medium">لا توجد طلبات</h2>
                <p className="font-tajawal-regular">
                  لم تقم بأي طلبات شراء بعد
                </p>
                <Link
                  to="/products"
                  className="text-orange-500 font-tajawal-regular"
                >
                  تسوق الآن
                </Link>
              </>
            )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-4">{error.message}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/dashboard/orders/${order.id}`)}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-tajawal-medium">الإشعارات</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 flex items-center gap-x-1"
              onClick={() => navigate("/dashboard/notifications")}
            >
              <span className="text-sm">عرض الكل</span>
              <LucideChevronLeft size={16} />
            </Button>
          </div>
          <div className="h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
            {isLoadingNotifications ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <NotificationSkeleton key={i} />
                ))}
              </div>
            ) : notificationsError ? (
              <div className="flex items-center justify-center h-full text-red-500">
                {notificationsError.message}
              </div>
            ) : notificationsData?.notifications &&
              notificationsData.notifications.length > 0 ? (
              notificationsData.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex bg-white shadow p-3 rounded-md gap-x-4 items-start hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    notification.order &&
                    navigate(`/dashboard/orders/${notification.order.id}`)
                  }
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <img
                      src={`data:image/png;base64,${
                        notification.author_id?.[1] || ""
                      }`}
                      alt={notification.author_id?.[1] || "User"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://ui-avatars.com/api/?name=E+Store&background=fb923c&color=fff";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-tajawal-medium text-sm line-clamp-1">
                      {notification.subject || "إشعار جديد"}
                    </p>
                    <p className="text-sm text-gray-500 font-tajawal-regular line-clamp-2">
                      {notification.body}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.date).toLocaleDateString("ar-IQ")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                لا توجد إشعارات
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Addresses */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between pb-1 mb-4 border-b border-light-200">
          <h2 className="text-lg font-tajawal-medium">عناوين الشحن</h2>
          <AddLocationDialog onSuccess={refetchLocations} />
        </div>

        {isLoadingLocations ? (
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((i) => (
              <LocationSkeleton key={i} />
            ))}
          </div>
        ) : locationsError ? (
          <div className="py-4 text-center text-red-500">
            {locationsError.message}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {locationsData && locationsData.length > 0 ? (
              locationsData.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location.street}
                  province={
                    typeof location.state_id === "object"
                      ? location.state_id[1]
                      : ""
                  }
                  city={location.city}
                  country={
                    typeof location.country_id === "object"
                      ? location.country_id[1]
                      : ""
                  }
                  country_id={
                    typeof location.country_id === "object"
                      ? location.country_id
                      : undefined
                  }
                  state_id={
                    typeof location.state_id === "object"
                      ? location.state_id
                      : undefined
                  }
                  id={location.id}
                  onUpdate={refetchLocations}
                  deletable
                  handleDelete={() => handleDeleteAddress(location.id)}
                />
              ))
            ) : (
              <div className="w-full py-4 text-center">
                <p className="text-gray-500 font-tajawal-medium">
                  لا توجد عناوين
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
