import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { LucideKeyRound, LucideMail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {
      email?: string;
    } = {};

    if (!email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const response = await axiosInstance.post("/auth/forgot-password", {
        email: email,
      });

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        toast({
          title: "تم إرسال رابط إعادة تعيين كلمة المرور",
          description:
            "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور",
          variant: "success",
        });
      } else {
        toast({
          title: "خطأ",
          description:
            response.data.message ||
            "فشل في إرسال رابط إعادة تعيين كلمة المرور",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast({
          title: "خطأ",
          description: "البريد الإلكتروني غير مسجل في النظام",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطأ",
          description:
            error.response?.data?.message ||
            "فشل في إرسال رابط إعادة تعيين كلمة المرور",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 text-orange-500 bg-orange-100 rounded-full">
              <LucideMail size={24} />
            </div>
          </div>
          <h2 className="font-tajawal-bold text-3xl font-bold text-gray-900">
            نسيت كلمة المرور
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
            الخاصة بك
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 text-center text-green-700 bg-green-100 rounded-md">
            <p>
              تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى
              التحقق من بريدك الإلكتروني.
            </p>
            <Button
              className="hover:bg-orange-600 mt-4 text-white bg-orange-500"
              onClick={() => navigate("/login")}
            >
              العودة إلى صفحة تسجيل الدخول
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-right text-gray-700">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-right"
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <p className="text-sm text-right text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="hover:bg-orange-600 flex justify-center w-full px-4 py-2 text-white bg-orange-500 rounded-md"
                label={
                  isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"
                }
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hover:text-orange-600 text-sm text-orange-500 transition duration-300"
              >
                العودة إلى صفحة تسجيل الدخول
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
