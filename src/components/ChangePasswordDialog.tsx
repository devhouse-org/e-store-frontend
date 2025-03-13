import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { LucideKeyRound } from "lucide-react";
import React, { useState } from "react";

interface ChangePasswordDialogProps {}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = localStorage.getItem("email");
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {
      oldPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!oldPassword) newErrors.oldPassword = "كلمة المرور الحالية مطلوبة";
    if (!newPassword) newErrors.newPassword = "كلمة المرور الجديدة مطلوبة";
    if (newPassword.length < 8)
      newErrors.newPassword =
        "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل";
    if (!confirmPassword) newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Make sure we have an email
    if (!email) {
      toast({
        title: "خطأ",
        description:
          "لم يتم العثور على البريد الإلكتروني. يرجى تسجيل الدخول مرة أخرى.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // First try to login to verify credentials
      try {
        const loginResponse = await axiosInstance.post("/auth/login", {
          email: email,
          password: oldPassword,
        });

        if (!loginResponse.data) {
          toast({
            title: "خطأ",
            description: "كلمة المرور الحالية غير صحيحة",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      } catch (loginError: any) {
        toast({
          title: "خطأ",
          description: "كلمة المرور الحالية غير صحيحة",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // If login succeeded, proceed with password change
      const response = await axiosInstance.post("/auth/change-password", {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "تم تغيير كلمة المرور",
          description: "تم تغيير كلمة المرور بنجاح",
          variant: "success",
        });

        // Reset form and close dialog
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsOpen(false);
      } else {
        toast({
          title: "خطأ",
          description: response.data.message || "فشل تغيير كلمة المرور",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "خطأ",
          description: "كلمة المرور الحالية غير صحيحة",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطأ",
          description: error.response?.data?.message || "فشل تغيير كلمة المرور",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="gap-x-2 hover:bg-orange-600 flex items-center px-6 py-2 text-white transition duration-300 bg-orange-500 rounded-md shadow-md"
        >
          <span>تغيير كلمة المرور</span>
          <LucideKeyRound size={16} />
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-description="change password dialog"
        aria-labelledby="change password dialog"
        aria-modal="true"
      >
        <DialogHeader>
          <DialogTitle className="font-tajawal-bold text-right">
            تغيير كلمة المرور
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="font-tajawal-medium block text-sm text-right text-gray-700">
              كلمة المرور الحالية
            </label>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full text-right"
              placeholder="أدخل كلمة المرور الحالية"
            />
            {errors.oldPassword && (
              <p className="text-sm text-right text-red-500">
                {errors.oldPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-tajawal-medium block text-sm text-right text-gray-700">
              كلمة المرور الجديدة
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-right"
              placeholder="أدخل كلمة المرور الجديدة"
            />
            {errors.newPassword && (
              <p className="text-sm text-right text-red-500">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-tajawal-medium block text-sm text-right text-gray-700">
              تأكيد كلمة المرور الجديدة
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-right"
              placeholder="أدخل تأكيد كلمة المرور الجديدة"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-right text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-4"
              label="إلغاء"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-orange-600 px-4 text-white bg-orange-500"
              label={isSubmitting ? "جاري التحديث..." : "تغيير كلمة المرور"}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
