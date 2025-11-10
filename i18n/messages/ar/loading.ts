const loading = {
  // برانڈ ٹیکسٹ جو تمام لوڈرز میں ظاہر ہوتا ہے
  BRAND_TEXT: "نيكست بويلر",

  // مختلف کانٹیکسٹ کے حساب سے ڈیفالٹ لوڈنگ پیغامات
  MESSAGES: {
    DEFAULT: "نيكست بويلر",
    DASHBOARD: "جارٍ تحميل لوحة التحكم...",
    CHARTS: "جارٍ تحميل الرسوم البيانية...",
    DATA: "جارٍ تحميل البيانات...",
    PROFILE: "جارٍ تحميل الملف الشخصي...",
    SETTINGS: "جارٍ تحميل الإعدادات...",
    AUTH: "جارٍ التحقق...",
    UPLOAD: "جارٍ رفع الملفات...",
    SAVE: "جارٍ حفظ التغييرات...",
    DELETE: "جارٍ حذف العنصر...",
    EXPORT: "جارٍ تصدير البيانات...",
    SYNC: "جارٍ المزامنة...",
    PROCESSING: "جارٍ معالجة الطلب...",
    CONNECTING: "جارٍ إنشاء الاتصال...",
    REFRESHING: "جارٍ تحديث البيانات...",
    SEARCHING: "جارٍ البحث...",
    ANALYZING: "جارٍ تحليل البيانات...",
    GENERATING: "جارٍ إنشاء التقرير...",
    VALIDATING: "جارٍ التحقق من المدخلات...",
    INITIALIZING: "نيكست بويلر...",
  },

  // عام لوڈنگ ٹیکسٹ
  TEXT: {
    LOADING_CHARTS: "جارٍ تحميل الرسوم البيانية...",
    LOADING_METRICS: "جارٍ تحميل مقاييس نيكست بويلر...",
    FROM_LAST_MONTH: "% منذ الشهر الماضي",
  },

  // مختلف آپریشنز کے لیے لوڈنگ کا دورانیہ (ملی سیکنڈ میں)
  DURATIONS: {
    QUICK: 500, // بٹن اسٹیٹس، سادہ آپریشنز
    NORMAL: 1500, // فارم جمع کرنا، API کالز
    SLOW: 3000, // رفع الملفات، المعالجة الثقيلة
    VERY_SLOW: 5000, // استيراد بيانات كبيرة، عمليات معقدة
  },

  // استعمال کے کیس کے حساب سے لوڈر ویریئنٹس
  VARIANTS: {
    OVERLAY: "default", // فل اسکرین اوورلے
    INLINE: "minimal", // لوڈنگ داخل العنصر
    BUTTON: "dots", // حالة تحميل الأزرار
    CARD: "default", // حالة تحميل البطاقات
    TABLE: "minimal", // تحميل الجداول / القوائم
    CHART: "default", // تحميل الرسوم البيانية
    FORM: "minimal", // تحميل النماذج
    MODAL: "default", // تحميل المودال
  },

  // کانٹیکسٹ کے حساب سے سائز
  SIZES: {
    SMALL: "sm", // تحميل الأزرار والعناصر الصغيرة
    MEDIUM: "md", // البطاقات والمودال
    LARGE: "lg", // صفحات كاملة
  },

  // تھیم کے حساب سے لوڈنگ رنگ (CSS کسٹم پراپرٹیز)
  THEME_COLORS: {
    PRIMARY: "hsl(var(--primary))",
    SECONDARY: "hsl(var(--secondary))",
    ACCENT: "hsl(var(--accent))",
    MUTED: "hsl(var(--muted))",
  },
} as const;

export default loading;
export type LoadingMessages = typeof loading;
