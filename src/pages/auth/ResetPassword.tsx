import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email");
  const tokenFromQuery = queryParams.get("token");

  const [formData, setFormData] = useState({
    email: emailFromQuery || "",
    token: tokenFromQuery || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Update password validation on password change
  useEffect(() => {
    const { newPassword } = formData;
    setPasswordValidation({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  }, [formData.newPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }

    // Check only the minimum length requirement
    if (!passwordValidation.minLength) {
      setError("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email: formData.email,
        token: formData.token,
        newPassword: formData.newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        toast({
          title: "تم إعادة تعيين كلمة المرور بنجاح",
          description: "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة",
          variant: "success",
        });

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      toast({
        title: "خطأ",
        description:
          err.response?.data?.message ||
          "حدث خطأ أثناء إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      setError(
        err.response?.data?.message ||
          "حدث خطأ أثناء إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  // Render password strength indicators
  const renderPasswordStrength = () => {
    return (
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-right text-gray-700">
          <span className="font-bold">متطلبات كلمة المرور:</span>
        </p>
        <div className="md:grid-cols-2 grid grid-cols-1 gap-2">
          <p
            className={`text-sm text-right font-bold ${
              passwordValidation.minLength ? "text-green-600" : "text-red-500"
            }`}
          >
            ✓ 8 أحرف على الأقل (مطلوب)
          </p>
          <p
            className={`text-sm text-right ${
              passwordValidation.hasUppercase
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            ✓ حرف كبير واحد على الأقل (اختياري)
          </p>
          <p
            className={`text-sm text-right ${
              passwordValidation.hasLowercase
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            ✓ حرف صغير واحد على الأقل (اختياري)
          </p>
          <p
            className={`text-sm text-right ${
              passwordValidation.hasNumber ? "text-green-600" : "text-gray-500"
            }`}
          >
            ✓ رقم واحد على الأقل (اختياري)
          </p>
          <p
            className={`text-sm text-right ${
              passwordValidation.hasSpecial ? "text-green-600" : "text-gray-500"
            }`}
          >
            ✓ رمز خاص واحد على الأقل (اختياري)
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 text-orange-500 bg-orange-100 rounded-full">
              <KeyRound size={24} />
            </div>
          </div>
          <h2 className="font-tajawal-bold text-3xl font-bold text-gray-900">
            إعادة تعيين كلمة المرور
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل كلمة المرور الجديدة لحسابك
          </p>
        </div>

        {success ? (
          <div className="p-4 text-center text-green-700 bg-green-100 rounded-md">
            <p>
              تم إعادة تعيين كلمة المرور بنجاح. سيتم توجيهك إلى صفحة تسجيل
              الدخول.
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-right"
                placeholder="أدخل بريدك الإلكتروني"
                disabled={!!emailFromQuery}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-right text-gray-700">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pr-10 text-right"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-right text-gray-700">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pr-10 text-right"
                  placeholder="أدخل كلمة المرور مرة أخرى"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {renderPasswordStrength()}

            {error && (
              <div className="p-3 text-sm text-right text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="hover:bg-orange-600 flex justify-center w-full px-4 py-2 text-white bg-orange-500 rounded-md"
                label={loading ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
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

export default ResetPassword;
