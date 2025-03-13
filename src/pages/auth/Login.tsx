import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: typeof formData) => {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.session_id) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phone);
        navigate("/dashboard");
        console.log(data);
      } else {
        console.error("Login failed:", data.error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Handle network or other errors
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="p6 pt-14 md:mx-0 h-screen mx-4">
      {/* <Button onClick={login}>Login</Button> */}
      <Card className="bgblack h-[80vh] container mx-auto">
        <CardContent className="h-full p-0">
          <div className="flex flex-col h-full">
            <div className="md:grid-cols-2 md:grid-flow-col-reverse grid flex-1 gap-8">
              {/* Decorative Image with iPhone Frame */}
              <div className="md:block hidden h-full">
                <div className="relative flex items-center justify-center w-full h-full">
                  <img
                    src="/login_phone.png"
                    alt="Decorative"
                    className="absolute inset-0 object-cover w-full h-full rounded-r-lg"
                  />
                </div>
              </div>

              {/* Login Form Section */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <img
                  src="/Logo.png"
                  alt="E-store Logo"
                  className="h-8 mb-8"
                />
                <h2 className="font-tajawal-bold text-3xl">أهلاً بعودتك!</h2>
                <p className="text-muted-foreground text-center max-w-[400px] font-tajawal-regular">
                  يُرجى تسجيل الدخول للمتابعة
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-[400px] space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="font-tajawal-medium block mb-1 text-sm text-gray-700">
                        {/* الهاتف */}
                        البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        required
                        className="font-tajawal-regular w-full text-right"
                        placeholder="أدخل البريد الإلكتروني"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="font-tajawal-medium block mb-1 text-sm text-gray-700">
                        كلمة المرور
                      </label>
                      <Input
                        type="password"
                        required
                        className="font-tajawal-regular w-full"
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
                        className="text-primary w-4 h-4 border-gray-300 rounded"
                      />
                      <label className="font-tajawal-regular text-gray-600">
                        تذكرني
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-[#D35A3B] hover:text-[#bf4f33] font-tajawal-medium"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    label="تسجيل الدخول"
                    disabled={loginMutation.isPending}
                    className="w-full bg-[#D35A3B] hover:bg-[#bf4f33] h-11 mt-6 font-tajawal-medium"
                  >
                    {loginMutation.isPending
                      ? "جاري التحميل..."
                      : "تسجيل الدخول"}
                  </Button>

                  <p className="font-tajawal-regular mt-4 text-sm text-center text-gray-600">
                    ليس لديك حساب؟{" "}
                    <Link
                      to="/signup"
                      className="text-[#D35A3B] hover:text-[#bf4f33] font-tajawal-medium"
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
