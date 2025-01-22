import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, Lock } from "lucide-react";
import React from "react";

const CreditCardForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border-2 border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-semibold">تفاصيل البطاقة</h3>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم البطاقة
            </label>
            <Input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="text-lg tracking-wider"
              maxLength={19}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الانتهاء
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  className="pl-10"
                  maxLength={5}
                />
                <Calendar className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رمز الحماية
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="CVV"
                  className="pl-10"
                  maxLength={3}
                />
                <Lock className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            label="تأكيد الدفع"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
