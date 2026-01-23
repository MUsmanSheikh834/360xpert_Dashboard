const common = {
  // Common actions
  actions: {
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    create: "إنشاء",
    update: "تحديث",
    submit: "إرسال",
    reset: "إعادة تعيين",
    clear: "مسح",
    copy: "نسخ",
    paste: "لصق",
    cut: "قص",
    undo: "تراجع",
    redo: "إعادة",
    print: "طباعة",
    download: "تنزيل",
    upload: "رفع",
    share: "مشاركة",
    export: "تصدير",
    import: "استيراد",
    refresh: "تحديث",
    reload: "إعادة تحميل",
    back: "رجوع",
    forward: "التالي",
    close: "إغلاق",
    open: "فتح",
    expand: "توسيع",
    collapse: "طي",
    minimize: "تصغير",
    maximize: "تكبير",
    chooseOption: "ماذا ترغب أن تفعل؟",
    continueMessage: "للمتابعة، يرجى اختيار أحد الخيارات أدناه",
  },

  // Status messages
  status: {
    success: "نجاح",
    error: "خطأ",
    warning: "تحذير",
    info: "معلومات",
    loading: "جارٍ التحميل",
    saving: "جارٍ الحفظ",
    saved: "تم الحفظ",
    deleted: "تم الحذف",
    updated: "تم التحديث",
    created: "تم الإنشاء",
    uploaded: "تم الرفع",
    downloaded: "تم التنزيل",
    copied: "تم النسخ",
    failed: "فشل",
    completed: "اكتمل",
    pending: "قيد الانتظار",
    processing: "جارٍ المعالجة",
    cancelled: "تم الإلغاء",
    redirecting: "جارٍ إعادة التوجيه...",
  },

  // Common phrases
  phrases: {
    welcome: "مرحباً",
    hello: "مرحباً",
    goodbye: "وداعاً",
    yes: "نعم",
    no: "لا",
    ok: "حسناً",
    please: "رجاءً",
    thankYou: "شكراً لك",
    youreWelcome: "على الرحب والسعة",
    sorry: "عذراً",
    excuseMe: "المعذرة",
    goodLuck: "حظاً موفقاً",
    congratulations: "تهانينا",
  },

  // Time references
  time: {
    now: "الآن",
    today: "اليوم",
    yesterday: "أمس",
    tomorrow: "غداً",
    thisWeek: "هذا الأسبوع",
    lastWeek: "الأسبوع الماضي",
    nextWeek: "الأسبوع القادم",
    thisMonth: "هذا الشهر",
    lastMonth: "الشهر الماضي",
    nextMonth: "الشهر القادم",
    thisYear: "هذا العام",
    lastYear: "العام الماضي",
    nextYear: "العام القادم",
  },

  // Navigation
  navigation: {
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    about: "من نحن",
    contact: "اتصل بنا",
    help: "مساعدة",
    docs: "الوثائق",
  },

  // Troubleshooting
  troubleshooting: {
    clearCache: "إذا استمرّت المشكلة، يرجى مسح ذاكرة التخزين المؤقت للمتصفح",
    refreshPage: "حاول تحديث الصفحة",
    contactSupport: "إذا استمرت المشكلة، يرجى التواصل مع الدعم",
  },

  // Language switcher
  languageSwitcher: {
    selectLanguage: "اختر اللغة",
    changeLanguage: "تغيير اللغة",
    currentLanguage: "اللغة الحالية",
    english: "English",
    urdu: "اردو",
    switchTo: "التبديل إلى",
    tooltip: "اختيار اللغة",
    ariaLabel: "محوّل اللغة",
  },
} as const;

export default common;
export type CommonMessages = typeof common;
