import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Link
            to="/"
            className="block mb-4 text-primary hover:text-primary/80"
          >
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h2>
          <p className="text-gray-600">قم بتسجيل الدخول للوصول إلى حسابك</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                required
                className="w-full"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label className="mr-2 block text-sm text-gray-900">تذكرني</label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          <Button label="تسجيل الدخول" type="submit" className="w-full" />

          <p className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
