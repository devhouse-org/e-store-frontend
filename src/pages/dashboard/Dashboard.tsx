import AddLocationDialog from "@/components/AddLocationDialog";
import LocationCard from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import {
  LucideBookHeart,
  LucideChevronLeft,
  LucidePackageCheck,
  LucideShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  <div className="p-4 bg-white border rounded-lg shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <div className="space-y-2">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-24 h-4" />
      </div>
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>

    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>

    <div className="pt-3 mt-4 border-t">
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  </div>
);

const NotificationSkeleton = () => (
  <div className="gap-x-4 flex items-start p-3 bg-white rounded-md shadow">
    <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-20 h-3" />
    </div>
  </div>
);

const LocationSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-[calc(50%-8px)]">
    <div className="space-y-3">
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <div className="flex justify-end gap-2 mt-4">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
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

  const cartCount = useCartStore((state) => state.products.length);
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
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
      <h1 className="font-tajawal-bold text-xl text-gray-500">لوحة التحكم</h1>

      {/* Summary Cards */}
      <div className="md:grid-cols-3 grid grid-cols-1 gap-4">
        <div className="gap-x-4 flex items-start p-4 bg-white rounded shadow">
          <div className="flex items-center justify-center p-4 bg-orange-500 rounded-full shadow-lg">
            <LucideShoppingCart className="text-white" size={40} />
          </div>
          <div>
            {cartCount > 0 ? (
              <>
                <h2 className="font-tajawal-medium text-lg">
                  {cartCount} منتجات في السلة
                </h2>
                <p className="font-tajawal-regular">اضغط لإكمال عملية التسوق</p>
                <Link
                  to="/cart"
                  className="font-tajawal-regular text-orange-500"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="font-tajawal-medium text-lg">السلة فارغة</h2>
                <p className="font-tajawal-regular">
                  لم تضف أي منتجات للسلة بعد
                </p>
                <Link
                  to="/products"
                  className="font-tajawal-regular text-orange-500"
                >
                  تسوق الآن
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="gap-x-4 flex items-start p-4 bg-white rounded shadow">
          <div className="flex items-center justify-center p-4 bg-orange-500 rounded-full shadow-lg">
            <LucideBookHeart className="text-white" size={40} />
          </div>
          <div>
            {wishlistCount > 0 ? (
              <>
                <h2 className="font-tajawal-medium text-lg">
                  {wishlistCount} منتجات في المفضلات
                </h2>
                <p className="font-tajawal-regular">
                  تصفح المنتجات لإضافة المزيد...
                </p>
                <Link
                  to="/wishlist"
                  className="font-tajawal-regular text-orange-500"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="font-tajawal-medium text-lg">
                  لا توجد منتجات مفضلة
                </h2>
                <p className="font-tajawal-regular">
                  لم تضف أي منتجات للمفضلة بعد
                </p>
                <Link
                  to="/products"
                  className="font-tajawal-regular text-orange-500"
                >
                  تصفح المنتجات
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="gap-x-4 flex items-start p-4 bg-white rounded shadow">
          <div className="flex items-center justify-center p-4 bg-orange-500 rounded-full shadow-lg">
            <LucidePackageCheck className="text-white" size={40} />
          </div>
          <div>
            {orders.length > 0 ? (
              <>
                <h2 className="font-tajawal-medium text-lg">
                  {orders.length} طلبات
                </h2>
                <p className="font-tajawal-regular">
                  راجع طلباتك وتأكد من وصولها
                </p>
                <Link
                  to="/dashboard/orders"
                  className="font-tajawal-regular text-orange-500"
                >
                  رؤية المزيد
                </Link>
              </>
            ) : (
              <>
                <h2 className="font-tajawal-medium text-lg">لا توجد طلبات</h2>
                <p className="font-tajawal-regular">
                  لم تقم بأي طلبات شراء بعد
                </p>
                <Link
                  to="/products"
                  className="font-tajawal-regular text-orange-500"
                >
                  تسوق الآن
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notifications and Orders */}
      <div className="md:grid-cols-3 grid grid-cols-1 gap-4">
        {/* Orders */}
        <div className="col-span-2 p-4 bg-white rounded shadow">
          <h2 className="font-tajawal-medium mb-4 text-lg">
            الطلبات الحالية ({orders.length})
          </h2>
          {isLoading ? (
            <div className="md:grid-cols-2 grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="py-4 text-center text-red-500">{error.message}</p>
          ) : (
            <div className="md:grid-cols-2 grid grid-cols-1 gap-4">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="hover:shadow-md p-4 transition-shadow bg-white border rounded-lg shadow-sm cursor-pointer"
                  onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-tajawal-medium text-lg">
                        {order.name}
                      </h3>
                      <p className="text-sm text-gray-600">
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
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">رقم الطلب:</span>
                      <span className="font-tajawal-medium">{order.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">عدد المنتجات:</span>
                      <span className="font-tajawal-medium">
                        {order.order_line.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">المبلغ الإجمالي:</span>
                      <span className="font-tajawal-medium text-orange-600">
                        {formatAmount(order.amount_total)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t">
                    <button className="bg-orange-50 hover:bg-orange-100 w-full py-2 text-orange-600 transition-colors rounded-md">
                      عرض تفاصيل الطلب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="col-span-1 p-4 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tajawal-medium text-lg">الإشعارات</h2>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-orange-600 hover:bg-orange-50 gap-x-1 flex items-center text-orange-500"
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
                  className="gap-x-4 hover:bg-gray-50 flex items-start p-3 transition-colors bg-white rounded-md shadow cursor-pointer"
                  onClick={() =>
                    notification.order &&
                    navigate(`/dashboard/orders/${notification.order.id}`)
                  }
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden bg-orange-100 rounded-full">
                    <img
                      src={`data:image/png;base64,${
                        notification.author_id?.[1] || ""
                      }`}
                      alt={notification.author_id?.[1] || "User"}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://ui-avatars.com/api/?name=E+Store&background=fb923c&color=fff";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-tajawal-medium line-clamp-1 text-sm">
                      {notification.subject || "إشعار جديد"}
                    </p>
                    <p className="font-tajawal-regular line-clamp-2 text-sm text-gray-500">
                      {notification.body}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
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
      <div className="p-4 bg-white rounded shadow">
        <div className="border-light-200 flex items-center justify-between pb-1 mb-4 border-b">
          <h2 className="font-tajawal-medium text-lg">عناوين الشحن</h2>
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
                <p className="font-tajawal-medium text-gray-500">
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
