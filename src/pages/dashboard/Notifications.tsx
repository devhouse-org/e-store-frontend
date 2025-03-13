import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/button";
import { LucideBell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

const useUserNotifications = (partnerId: number, currentOffset: number = 0) => {
  return useQuery<NotificationsResponse, Error>({
    queryKey: ["user-notifications", partnerId, currentOffset],
    queryFn: async () => {
      const response = await axiosInstance.post<NotificationsResponse>(
        "/user/notifications",
        {
          partner_id: partnerId,
          limit: 10,
          currentOffset,
        }
      );
      return response.data;
    },
  });
};

const NotificationSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const navigate = useNavigate();
  const [currentOffset, setCurrentOffset] = useState(0);
  const userId = localStorage.getItem("id");

  const {
    data: notificationsData,
    isLoading,
    error,
    isFetching,
  } = useUserNotifications(Number(userId), currentOffset);

  const handleLoadMore = () => {
    if (notificationsData && currentOffset + 10 < notificationsData.total) {
      setCurrentOffset((prev) => prev + 10);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-center">
          <p className="text-xl font-tajawal-bold">{error.message}</p>
          <p className="text-sm">حدث خطأ أثناء تحميل الإشعارات</p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  if (
    !notificationsData?.notifications ||
    notificationsData.notifications.length === 0
  ) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
            <LucideBell className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-tajawal-bold text-gray-800">
            لا توجد إشعارات
          </h2>
          <p className="text-gray-600 font-tajawal-regular text-lg">
            لم تتلق أي إشعارات بعد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl text-gray-500 font-tajawal-bold">الإشعارات</h1>

      <div className="space-y-4">
        {notificationsData.notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              notification.order &&
              navigate(`/dashboard/orders/${notification.order.id}`)
            }
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center flex-shrink-0">
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
                <div className="flex justify-between items-start">
                  <h3 className="font-tajawal-medium text-lg">
                    {notification.subject || "إشعار جديد"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.date).toLocaleDateString("ar-IQ")}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{notification.body}</p>
                {notification.order && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">رقم الطلب:</span>
                      <span className="font-tajawal-medium">
                        {notification.order.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {notificationsData.total > currentOffset + 10 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50"
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching ? "جاري التحميل..." : "تحميل المزيد"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
