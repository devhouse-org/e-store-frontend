import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="h-screen p-6">
      <Card className="h-full">
        <CardContent className="p-8 h-full">
          <div className="flex flex-col h-full">
            <div className="grid gap-8 md:grid-cols-2 md:grid-flow-col-reverse flex-1">
              {/* Decorative Image with iPhone Frame */}
              <div className="hidden md:block h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="src/assets/images/login_phone.png"
                    alt="Decorative"
                    className="absolute inset-0 object-cover w-full h-full rounded-r-lg"
                  />
                </div>
              </div>

              {/* Login Form Section */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <img
                  src="src/assets/images/Logo.png"
                  alt="E-store Logo"
                  className="h-8 mb-8"
                />
                <h2 className="text-3xl font-bold">أهلاً بعودتك!</h2>
                <p className="text-muted-foreground text-center max-w-[400px]">
                  يُرجى تسجيل الدخول للمتابعة
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-[400px] space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الهاتف
                      </label>
                      <Input
                        type="tel"
                        required
                        className="w-full text-right"
                        placeholder="أدخل رقم الهاتف"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        كلمة المرور
                      </label>
                      <Input
                        type="password"
                        required
                        className="w-full"
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                      />
                      <label className="text-gray-600">تذكرني</label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-[#D35A3B] hover:text-[#bf4f33]"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    label="تسجيل الدخول"
                    className="w-full bg-[#D35A3B] hover:bg-[#bf4f33] h-11 mt-6"
                  />

                  <p className="text-center text-sm text-gray-600 mt-4">
                    ليس لديك حساب؟{" "}
                    <Link
                      to="/signup"
                      className="text-[#D35A3B] hover:text-[#bf4f33] font-medium"
                    >
                      إنشاء حساب جديد
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

export default Login;
