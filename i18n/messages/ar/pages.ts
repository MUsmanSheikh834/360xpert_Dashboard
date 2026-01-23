const pages = {
  home: {
    // القسم الرئيسي للصفحة
    hero: {
      title: "أنشئ بسرعة Starter قابل للتخصيص، مكتوب بالـ TypeScript وقابل للتوسع مع Next.js",
      description:
        "يتضمن Redux Toolkit + Persist، React Query، Zod + React Hook Form، أوضاع Light/Dark/Ocean مع next-themes، Axios Interceptors، ونظام تخطيط قوي وقابل للتخصيص يتكيف مع مواقع الويب، لوحات التحكم، والبورتالات.",
      primaryButton: "افتح لوحة التحكم",
      primaryButtonLabel: "افتح لوحة التحكم",
      secondaryButton: "جرب إعدادات التخطيط",
      secondaryButtonLabel: "جرب إعدادات التخطيط",
    },

    // عرض المزايا
    features: {
      layoutSystemTitle: "نظام تخطيط قابل للتخصيص",
      layoutSystemDescription:
        "قم بترتيب الرؤوس، الشريط الجانبي، التذييلات، ومحتوى التخطيط بشكل ديناميكي وفي الوقت الفعلي.",
      layoutSystemIcon: "🎨",
    },

    // التنقل
    navigation: {
      home: "الرئيسية",
      dashboard: "لوحة التحكم",
      settings: "الإعدادات",
      docs: "التوثيق",
      about: "من نحن",
    },
  },

  error: {
    // صفحة 404 - لم يتم العثور على الصفحة
    notFound: {
      title: "الصفحة غير موجودة",
      description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      heading: "404",
      primaryButton: "اذهب إلى الرئيسية",
      secondaryButton: "ارجع",
      refreshButton: "تحديث",
      searchTitle: "الصفحات الشائعة",
      autoRedirectMessage: "سيتم إعادة التوجيه إلى الصفحة الرئيسية خلال {count} ثوانٍ...",
      cancelRedirect: "إلغاء",
      supportText: "إذا كنت تعتقد أن هذا خطأ، يرجى",
      contactSupport: "الاتصال بالدعم",
    },

    // صفحة الخطأ العام
    globalError: {
      title: "حدث خطأ ما!",
      description: "حدث خطأ غير متوقع",
      subtitle: "لقد حدث خطأ غير متوقع. تم إعلام فريقنا وسيقوم بالتحقق منه.",
      tryAgainButton: "حاول مرة أخرى",
      goHomeButton: "اذهب إلى الرئيسية",
      errorDetailsTitle: "تفاصيل الخطأ (للتطوير)",
      errorIdLabel: "معرف الخطأ:",
      notifiedMessage: "تم إعلام فريقنا وسيقوم بالتحقق منه.",
    },

    // الإجراءات العامة للخطأ
    actions: {
      retry: "حاول مرة أخرى",
      goHome: "اذهب إلى الرئيسية",
      goBack: "ارجع",
      refresh: "تحديث",
      reload: "إعادة تحميل",
      contactSupport: "الاتصال بالدعم",
      reportIssue: "الإبلاغ عن مشكلة",
    },

    // رسائل حالة الخطأ
    status: {
      loading: "جارٍ التحميل...",
      retrying: "جارٍ إعادة المحاولة...",
      redirecting: "جارٍ إعادة التوجيه...",
      notified: "تم إعلام الفريق",
      investigating: "جارٍ التحقيق",
    },
  },
} as const;

export default pages;
export type PagesMessages = typeof pages;
