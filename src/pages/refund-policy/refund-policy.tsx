import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function RefundPolicy() {
  document.title = "سياسة الاسترجاع";
    
  return (
    <div className="p-10 bg-gray-50 font-tajawal-medium">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">سياسة الاسترجاع</h1>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "سياسة الاسترجاع" },
          ]}
        />
      </div>
      <div className="container mx-auto sm:p-8">
        <div className="text-sm bg-white rounded-lg shadow-sm sm:p-6">
          <div className="space-y-4 text-right">
            <p className="text-gray-600">نحن نقدر رضا عملائنا ونسعى لتقديم أفضل تجربة تسوق ممكنة. فيما يلي سياسة الاسترجاع الخاصة بنا:</p>

            <div className="space-y-4">
              <div className="sm:flex">
                <p className="text-gray-600"><span className="font-bold">فترة الاسترجاع:</span> يُطبق سياسة الإسترجاع لمدة 14 يومًا من تاريخ الاستلام.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">إجراءات الاسترجاع:</span> يجب تقديم إثبات صالح لعملية الشراء (مثل الفاتورة أو رقم الطلب).</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">حالة المنتجات المُرتجعة:</span> يجب أن تعود جميع المنتجات المُرتجعة في حالتها الأصلية ومغلقة في عبوتها الأصلية مع جميع الملحقات.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">المنتجات غير القابلة للاسترجاع:</span> لا يُسترجع المنتج إذا تم استخدامه أو إذا كان غير كامل.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">إسترجاع المنتجات التالفة:</span> في حالة إسترجاع منتج تالف، يجب ذكر العيب في ورقة منفصلة وإرفاقها مع الفاتورة، ويرجى عدم كتابة أو وضع أي علامات على غلاف المنتج أو المنتج نفسه.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">تكاليف التوصيل:</span> يتحمل العميل تكاليف توصيل المنتج المُرتجع.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">إعادة المبلغ:</span> يتم اضافة مبلغ المنتجات المدفوع إلى حسابك لدى موقع ي ستور أو عبر بطاقة الائتمان بعد استلام المنتج والتحقق من مطابقته لشروط الإسترجاع.</p>
              </div>
            </div>
            <p className="pt-6 mt-6 text-gray-600 border-t">تهدف هذه السياسة إلى ضمان رضا العملاء وتوفير تجربة تسوق آمنة وموثوقة.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
