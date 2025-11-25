const navigation = {
  // العناصر الرئيسية للتنقل
  main: {
    home: "الصفحة الرئيسية",
    dashboard: "لوحة التحكم",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    help: "مساعدة",
    about: "من نحن",
    contact: "اتصل بنا",
    documentation: "التوثيق",
    site: "الموقع",
    layout: "التخطيط",
    layoutSettings: "إعدادات التخطيط",
  },

  // تنقل لوحة التحكم
  dashboard: {
    overview: "نظرة عامة",
    analytics: "التحليلات",
    reports: "التقارير",
    users: "المستخدمون",
    settings: "الإعدادات",
    activity: "النشاط",
    notifications: "الإشعارات",
    content: "المحتوى",
  },

  // تنقل المصادقة (Auth)
  auth: {
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    forgotPassword: "نسيت كلمة المرور؟",
    resetPassword: "إعادة تعيين كلمة المرور",
    profile: "الملف الشخصي",
    account: "الحساب",
  },

  // تنقل التذييل
  footer: {
    privacy: "الخصوصية",
    privacyPolicy: "سياسة الخصوصية",
    terms: "الشروط",
    termsOfService: "شروط الخدمة",
    contact: "اتصل بنا",
    about: "من نحن",
    github: "GitHub",
    twitter: "تويتر",
    linkedin: "لينكدإن",
    support: "الدعم",
    documentation: "التوثيق",
    changelog: "سجل التغييرات",
  },

  // تسميات الخبز (Breadcrumbs)
  breadcrumbs: {
    home: "الصفحة الرئيسية",
    dashboard: "لوحة التحكم",
    current: "الصفحة الحالية",
  },

  // تسميات وأفعال القائمة
  labels: {
    menu: "القائمة",
    close: "إغلاق",
    expand: "توسيع",
    collapse: "طي",
    toggle: "تبديل",
    open: "فتح",
    moreOptions: "المزيد من الخيارات",
    navigation: "التنقل",
    navigationLabel: "لوحة التحكم",
    toggleMobileNav: "تبديل التنقل على الجوال",
    toggleSidebar: "تبديل الشريط الجانبي",
    collapseSidebar: "طي الشريط الجانبي",
    expandSidebar: "توسيع الشريط الجانبي",
    goToHome: "الانتقال إلى الصفحة الرئيسية",
  },

  // مراجع تخطيط التنقل
  layout: {
    variant: "النمط",
    width: "العرض",
    logoText: "Next Starter",
  },

  // عناوين ووصف المسارات (Routes)
  routes: {
    "/dashboard": {
      title: "لوحة التحكم",
      description: "نظرة عامة على لوحة التحكم",
    },
    "/": {
      title: "الموقع",
      description: "عرض الموقع الرئيسي",
    },
    "/dashboard/layout-settings": {
      title: "التخطيط",
      description: "إعداد التخطيط",
    },
    "/dashboard/settings": {
      title: "الإعدادات",
      description: "إعدادات التطبيق",
    },
    "/dashboard/analytics": {
      title: "التحليلات",
      description: "عرض التحليلات والمؤشرات",
    },
    "/dashboard/users": {
      title: "المستخدمون",
      description: "إدارة المستخدمين والصلاحيات",
    },
    "/dashboard/content": {
      title: "المحتوى",
      description: "إدارة المحتوى والموارد",
    },
    "/help": {
      title: "مساعدة",
      description: "الحصول على المساعدة والدعم",
    },
    "/privacy": {
      title: "الخصوصية",
      description: "سياسة الخصوصية",
    },
    "/terms": {
      title: "الشروط",
      description: "شروط الخدمة",
    },
    "/contact": {
      title: "اتصل بنا",
      description: "تواصل معنا",
    },
    "/about": {
      title: "من نحن",
      description: "مزيد من المعلومات عننا",
    },
    "/docs": {
      title: "التوثيق",
      description: "عرض التوثيق",
    },
    "/support": {
      title: "الدعم",
      description: "الحصول على الدعم",
    },
    "/changelog": {
      title: "سجل التغييرات",
      description: "عرض آخر التحديثات",
    },
  },

  // تسميات الشارات (Badges)
  badges: {
    new: "جديد",
    demo: "تجريبي",
    live: "مباشر",
    updated: "محدث",
  },
} as const;

export default navigation;
export type NavigationMessages = typeof navigation;
