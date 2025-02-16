export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    category: string;
    readTime: number;
}

export const blogs: Blog[] = [
    {
        id: "1",
        title: "أفضل الهواتف الذكية لعام 2024",
        excerpt: "تعرف على أحدث وأفضل الهواتف الذكية المتوفرة في السوق لهذا العام",
        content: `
      في عام 2024، شهد سوق الهواتف الذكية تطورات كبيرة في التكنولوجيا والتصميم. 
      من أبرز الهواتف التي تصدرت المشهد هذا العام:

      1. iPhone 15 Pro Max
      يتميز بكاميرا متطورة وأداء استثنائي...

      2. Samsung Galaxy S24 Ultra
      يقدم تجربة مستخدم فريدة مع قلم S Pen...

      3. Google Pixel 8 Pro
      يتفوق في جودة الصور والذكاء الاصطناعي...
    `,
        image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "أحمد محمد",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        date: "2024-02-15",
        category: "هواتف ذكية",
        readTime: 5
    },
    {
        id: "2",
        title: "مقارنة بين أحدث المعالجات للهواتف الذكية",
        excerpt: "تحليل مفصل لأداء المعالجات الجديدة من كوالكوم وميدياتك",
        content: `
      تتنافس شركات تصنيع المعالجات على تقديم أفضل الأداء للهواتف الذكية.
      في هذا المقال نقارن بين:

      - Snapdragon 8 Gen 3
      - MediaTek Dimensity 9300
      - Apple A17 Pro
    `,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "علي حسين",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        date: "2024-02-10",
        category: "تقنية",
        readTime: 8
    },
    {
        id: "3",
        title: "كيف تختار الهاتف المناسب لاحتياجاتك؟",
        excerpt: "دليل شامل لاختيار الهاتف الذكي المناسب لك",
        content: `
      عند اختيار هاتف جديد، هناك عدة عوامل يجب مراعاتها:
      
      1. الميزانية
      2. حجم الشاشة
      3. عمر البطارية
      4. جودة الكاميرا
      5. المعالج والأداء
    `,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "سارة أحمد",
            avatar: "https://i.pravatar.cc/150?img=3"
        },
        date: "2024-02-05",
        category: "نصائح",
        readTime: 6
    },
    {
        id: "4",
        title: "مستقبل الهواتف القابلة للطي",
        excerpt: "نظرة على تطور الهواتف القابلة للطي وتوقعات المستقبل",
        content: `
      الهواتف القابلة للطي تمثل ثورة في عالم الهواتف الذكية.
      نستعرض أحدث التطورات والتوقعات المستقبلية لهذه التقنية.
    `,
        image: "https://images.unsplash.com/photo-1657731739861-b21d95062cbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author: {
            name: "محمد علي",
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        date: "2024-01-30",
        category: "تقنية",
        readTime: 7
    },
    {
        id: "5",
        title: "أفضل تطبيقات تعديل الصور للهواتف الذكية",
        excerpt: "استعراض لأفضل تطبيقات تحرير الصور المتوفرة حالياً",
        content: `
      مع تطور كاميرات الهواتف، أصبح تعديل الصور جزءاً أساسياً من التصوير.
      نستعرض أفضل التطبيقات المتوفرة لتعديل الصور على الهواتف الذكية.
    `,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "ليلى محمد",
            avatar: "https://i.pravatar.cc/150?img=5"
        },
        date: "2024-01-25",
        category: "تطبيقات",
        readTime: 5
    },
    {
        id: "6",
        title: "نصائح لإطالة عمر بطارية هاتفك",
        excerpt: "دليل شامل للحفاظ على بطارية هاتفك لأطول فترة ممكنة",
        content: `
      تعتبر البطارية من أهم مكونات الهاتف الذكي.
      إليك أفضل النصائح للحفاظ على عمر بطارية هاتفك وتحسين أدائها.
    `,
        image: "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "عمر خالد",
            avatar: "https://i.pravatar.cc/150?img=6"
        },
        date: "2024-01-20",
        category: "نصائح",
        readTime: 4
    }
];

export const getBlogById = (id: string): Blog | undefined => {
    return blogs.find((blog) => blog.id === id);
};

export const getBlogsByCategory = (category: string): Blog[] => {
    return blogs.filter((blog) => blog.category === category);
};

export const getCategories = (): string[] => {
    return [...new Set(blogs.map((blog) => blog.category))];
}; 