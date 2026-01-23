const metadata = {
  // البيانات الوصفية الافتراضية
  default: {
    title: "ستارتر Next.js",
    description: "ستارتر حديث لـ Next.js مع TypeScript وTailwind CSS والمزيد",
    keywords: "nextjs, typescript, tailwindcss, starter, template",
  },

  // بيانات وصفية مخصصة لكل صفحة
  pages: {
    home: {
      title: "الرئيسية - ستارتر Next.js",
      description: "مرحبًا بكم في قالب ستارتر Next.js الحديث الخاص بنا",
    },
    dashboard: {
      title: "لوحة التحكم - ستارتر Next.js",
      description: "لوحة تحكم شاملة مع مؤشرات وتحليلات في الوقت الفعلي",
    },
    auth: {
      login: {
        title: "تسجيل الدخول - ستارتر Next.js",
        description: "قم بتسجيل الدخول إلى حسابك",
      },
      signup: {
        title: "إنشاء حساب - ستارتر Next.js",
        description: "أنشئ حسابًا جديدًا",
      },
      forgot: {
        title: "نسيت كلمة المرور - ستارتر Next.js",
        description: "أعد تعيين كلمة المرور الخاصة بك",
      },
    },
    error: {
      title: "خطأ - ستارتر Next.js",
      description: "حدث خطأ ما",
    },
    notFound: {
      title: "الصفحة غير موجودة - ستارتر Next.js",
      description: "الصفحة التي تبحث عنها غير موجودة",
    },
  },

  // بيانات Open Graph
  openGraph: {
    siteName: "ستارتر Next.js",
    type: "موقع إلكتروني",
    locale: "ar_AR",
  },

  // بيانات تويتر
  twitter: {
    card: "summary_large_image",
    site: "@nextjs",
    creator: "@nextjs",
  },
} as const;

export default metadata;
export type MetadataMessages = typeof metadata;
