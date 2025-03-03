import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("name", formData.name);
      localStorage.setItem("email", formData.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      setError("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <div className="h-screen p6 pt-14 mx-4 md:mx-0">
      <Card className="bgblack h-[80vh] container mx-auto">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col h-full">
            <div className="grid gap-8 md:grid-cols-2 md:grid-flow-col-reverse flex-1">
              {/* Decorative Image with iPhone Frame */}
              <div className="hidden md:block h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="src/assets/images/signup_bg.webp"
                    alt="Decorative"
                    className="absolute inset-0 object-cover w-full h-full rounded-r-lg"
                  />
                </div>
              </div>

              {/* Signup Form Section */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <img
                  src="src/assets/images/Logo.png"
                  alt="E-store Logo"
                  className="h-8 mb-8"
                />
                <h2 className="text-3xl font-tajawal-bold">إنشاء حساب جديد</h2>
                <p className="text-muted-foreground text-center max-w-[400px] font-tajawal-regular">
                  قم بإنشاء حسابك للوصول إلى جميع المميزات
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-[400px] space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-tajawal-medium text-gray-700 mb-1">
                        الاسم
                      </label>
                      <Input
                        type="text"
                        required
                        className="w-full text-right font-tajawal-regular"
                        placeholder="أدخل اسمك الكامل"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-tajawal-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        required
                        className="w-full text-right font-tajawal-regular"
                        placeholder="أدخل البريد الإلكتروني"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setError(null); // Clear error when user changes email
                        }}
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          البريد الإلكتروني مستخدم من قبل
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-tajawal-medium text-gray-700 mb-1">
                        الهاتف
                      </label>
                      <Input
                        type="tel"
                        required
                        className="w-full text-right font-tajawal-regular"
                        placeholder="أدخل رقم الهاتف"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-tajawal-medium text-gray-700 mb-1">
                        كلمة المرور
                      </label>
                      <Input
                        type="password"
                        required
                        className="w-full font-tajawal-regular"
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-tajawal-medium text-gray-700 mb-1">
                        تأكيد كلمة المرور
                      </label>
                      <Input
                        type="password"
                        required
                        className="w-full font-tajawal-regular"
                        placeholder="تأكيد كلمة المرور"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    label="إنشاء حساب"
                    className="w-full bg-[#D35A3B] hover:bg-[#bf4f33] h-11 mt-6 font-tajawal-medium"
                  />

                  <p className="text-center text-sm text-gray-600 mt-4 font-tajawal-regular">
                    لديك حساب بالفعل؟{" "}
                    <Link
                      to="/login"
                      className="text-[#D35A3B] hover:text-[#bf4f33] font-tajawal-medium"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
