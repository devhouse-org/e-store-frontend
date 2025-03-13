import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function SupportPolicy() {
  document.title = "سياسة الدعم";

  return (
    <div className="p-10 min-h-[25rem] bg-gray-50 font-tajawal-medium">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">سياسة الدعم</h1>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "سياسة الدعم" },
          ]}
        />
      </div>
      <div className="container mx-auto sm:p-8">
        <div className="text-sm bg-white rounded-lg shadow-sm sm:p-6">
          <div className="space-y-4 text-right">
            <p className="text-gray-600">
              حرص في ي ستور على توفير محتوى توضيحي عالي الجودة للموقع، سواء كان ذلك لشرح الميزات الجديدة أو توضيح أقسام الموقع الهامة. يمكنكم مشاهدة هذا المحتوى المفصل على قناتنا على اليوتيوب.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
