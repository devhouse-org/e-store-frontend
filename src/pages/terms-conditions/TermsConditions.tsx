import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function TermsConditions() {
  document.title = "الشروط والأحكام";
    
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الشروط والأحكام</h1>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "الشروط والأحكام" },
          ]}
        />
      </div>
      <div className="container mx-auto sm:p-6 font-tajawal-medium">
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

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">المسؤولية عن المعلومات:</span> يتحمل المستخدمون المسؤولية الكاملة عن صحة ودقة المعلومات التي يقدمونها خلال عمليات الشراء والدفع.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">الدفع والتسوية:</span> يجب على المستخدمين الالتزام بعمليات الدفع الآمنة والمعتمدة المتاحة على الموقع، وتسوية المبالغ المستحقة بموجب الشروط المحددة.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">الحماية والأمان:</span> يتم توفير بيئة آمنة لعمليات الشراء والدفع عبر تشفير البيانات واستخدام بروتوكولات الأمان المعتمدة.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">الإرجاع والاسترداد:</span> تحدد شروط ومهل الإرجاع والاسترداد للمنتجات بشكل واضح وفقًا للسياسة المعمول بها في الموقع.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">المسؤولية القانونية:</span> يلتزم المستخدمون بقوانين الاستخدام ويتحملون المسؤولية القانونية في حال حدوث أي تجاوزات أو مخالفات.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">تعديلات الشروط:</span> يحتفظ الموقع بحق تعديل شروط الاستخدام والأحكام دون إشعار مسبق، وينبغي على المستخدمين مراجعتها بشكل دوري.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">الإشعارات والاتصالات:</span> يمكن أن يتم التواصل مع المستخدمين عبر البريد الإلكتروني أو الرسائل النصية لإرسال إشعارات ومعلومات مهمة.</p>
              </div>

              <div className="flex">
                <p className="text-gray-600"><span className="font-bold">التسويق والعروض الترويجية:</span> يحق للموقع إجراء حملات تسويقية وعروض ترويجية، ويمكن للمستخدمين الاختيار في تلقي هذه العروض أو إلغائها.</p>
              </div>
            </div>

            <p className="pt-6 mt-6 text-gray-600 border-t">هذه الشروط تهدف إلى حماية حقوق المستخدمين وضمان تجربة شراء آمنة وموثوقة على الموقع.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
