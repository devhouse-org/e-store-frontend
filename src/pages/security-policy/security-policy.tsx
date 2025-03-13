import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function SecurityPolicy() {
  document.title = "سياسة الخصوصية";
    
  return (
    <div className="p-10 bg-gray-50 font-tajawal-medium">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">سياسة الخصوصية</h1>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "سياسة الخصوصية" },
          ]}
        />
      </div>
      <div className="container mx-auto sm:p-8">
        <div className="text-sm bg-white rounded-lg shadow-sm sm:p-6">
          <div className="space-y-4 text-right">
            <p className="text-gray-600">بالطبع، ها هي مختصر لشروط استخدام الموقع المتعلقة ببيع الهواتف والالكترونيات:</p>

            <div className="space-y-4">
              <div className="sm:flex">
                <p className="text-gray-600"><span className="font-bold">العمر الأدنى للاستخدام:</span> يجب أن يكون المستخدمون الذين يرغبون في استخدام الموقع على الأقل في سن 15 عامًا، وفقًا للقوانين والتشريعات المعمول بها.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">التسجيل والحسابات:</span> يجب على المستخدمين تقديم معلومات دقيقة وصحيحة أثناء عملية التسجيل، وتكون الحسابات شخصية وغير قابلة للنقل.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">المحتوى والتصريحات:</span> يجب عدم نشر محتوى مسيء أو غير قانوني على الموقع، ويجب عدم تقديم تصريحات زائفة أو مضللة بشأن المنتجات المعروضة.</p>
              </div>
            </div>
            <p className="pt-6 mt-6 text-gray-600 border-t">هذه الشروط تهدف إلى حماية حقوق المستخدمين وضمان تجربة شراء آمنة وموثوقة على الموقع.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
