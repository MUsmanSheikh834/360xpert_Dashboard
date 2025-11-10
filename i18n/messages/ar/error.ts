const error = {
  // 404 Not Found page
  notFound: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.",
    heading: "404",
    primaryButton: "الذهاب إلى الرئيسية",
    secondaryButton: "الرجوع",
    refreshButton: "تحديث",
    searchTitle: "الصفحات الشائعة",
    autoRedirectMessage: "سيتم إعادة التوجيه إلى الصفحة الرئيسية خلال {count} ثوانٍ...",
    cancelRedirect: "إلغاء",
    supportText: "إذا كنت تعتقد أن هذا خطأ، يرجى",
    contactSupport: "التواصل مع الدعم",
  },

  // Global Error page
  globalError: {
    title: "حدث خطأ ما!",
    description: "حدث خطأ غير متوقع",
    subtitle: "حدث خطأ غير متوقع. تم إخطار فريقنا وسيتم التحقيق في المشكلة.",
    tryAgainButton: "المحاولة مرة أخرى",
    goHomeButton: "الذهاب إلى الرئيسية",
    errorDetailsTitle: "تفاصيل الخطأ (للمطورين)",
    errorIdLabel: "معرّف الخطأ:",
    notifiedMessage: "تم إخطار فريقنا وسيقوم بالتحقيق.",
  },

  // Common error actions
  actions: {
    retry: "المحاولة مرة أخرى",
    goHome: "الذهاب إلى الرئيسية",
    goBack: "الرجوع",
    refresh: "تحديث",
    reload: "إعادة التحميل",
    contactSupport: "التواصل مع الدعم",
    reportIssue: "الإبلاغ عن المشكلة",
  },

  // Error status messages
  status: {
    loading: "جارٍ التحميل...",
    retrying: "جارٍ إعادة المحاولة...",
    redirecting: "جارٍ إعادة التوجيه...",
    notified: "تم إخطار الفريق",
    investigating: "جارٍ التحقيق",
  },
} as const;

export default error;
export type ErrorMessages = typeof error;
