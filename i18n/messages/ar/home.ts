const home = {
  // برانڈ / ہیڈر
  brand: "نيكست بويلر",

  // مرکزی ہیرو سیکشن
  hero: {
    title: "بويلر جاهز قوي لتطوير تطبيقات الويب الحديثة",
    description:
      "آمن من حيث الأنواع، قابل للتوسّع، ومهيأ للإنتاج. يتضمن دعم Redux Toolkit، React Query، Zod، React Hook Form، next-themes، shadcn/ui، socket.io، i18n، المصادقة، ونظام تخطيط مرن.",
    subtitle: "حزمة كاملة لبدء SaaS، اللوحات، وتطبيقات الويب. سريع، أنيق، وصديق للمطورين.",
    waitlistBadge: "بويلر بليت جاهز للإنتاج",
    primaryButton: "عرض لوحة التحكم",
    primaryButtonLabel: "عرض لوحة التحكم",
    secondaryButton: "الوثائق",
    secondaryButtonLabel: "عرض الوثائق",
  },

  // خصوصیات کی نمائش
  features: {
    overlayImageAlt: "عرض المنصة",
    showcaseTitle: "تجربة تطوير حديثة",
    showcaseDescription: "كل ما تحتاجه لبناء، تشغيل، وتوسيع تطبيقات جاهزة للإنتاج.",
    title: "ما الذي يجعل هذا البويلر مميزاً؟",
    subtitle:
      "مجموعة أدوات كاملة لتطوير SaaS، اللوحات، وتطبيقات الويب. سريع، مرن، ومبني وفق أفضل الممارسات.",
    aiAutomation: {
      title: "سلامة الأنواع في كل مكان",
      description:
        "دعم TypeScript شامل عبر الواجهة الأمامية والخلفية وواجهات API لضمان الأمان وتجربة تطوير أفضل.",
    },
    lightningFast: {
      title: "واجهة مستخدم فائقة السرعة",
      description: "سرعة وجمال مع Next.js، shadcn/ui، و Tailwind CSS.",
    },
    enterpriseSecurity: {
      title: "المصادقة والأمان",
      description: "مصادقة مدمجة، مسارات محمية، وأفضل ممارسات الأمان.",
    },
    scalableInfrastructure: {
      title: "حالة وبيانات قابلة للتوسّع",
      description: "إدارة حالة قوية باستخدام Redux Toolkit و React Query مع Zod للتحقق.",
    },
    cloudNative: {
      title: "Socket.io والوقت الحقيقي",
      description: "تكامل كامل مع Socket.io للميزات التفاعلية والتعاون المباشر.",
    },
    developerFirst: {
      title: "دعم دولي (i18n)",
      description: "تطبيقات عالمية مع next-intl ودعم كامل للـ RTL/LTR.",
    },
  },

  showcase: {
    title: "مجموعة كاملة لبدء تطوير تطبيقات ويب حديثة",
    description:
      "مشروع جاهز للإنتاج يعتمد على Next.js مع نظام تخطيط ديناميكي، منشئ نماذج متقدم، لوحة تحكم لحظية، مصادقة مؤسسية، ومكونات UI حديثة.",
    imageAlt: "عرض للوحة التحكم والتطبيق",
    showcaseTitle: "تجربة تطوير قوية وحديثة",
    showcaseDescription: "أنشئ تطبيقات حديثة مع جميع الميزات الأساسية والتكاملات وأدوات التطوير.",
    features: {
      layoutSystem: "نظام تخطيط ديناميكي (متعدد الأنماط، متجاوب، مع حفظ الحالة)",
      formBuilder: "منشئ نماذج متقدم (آمن بأنواع TypeScript، أكثر من 20 حقل، تحقق ديناميكي)",
      realtimeDashboard: "لوحة تحكم لحظية (Socket.IO، WebSocket، تحديثات مباشرة)",
      enterpriseAuth: "مصادقة مؤسسية (صلاحيات حسب الأدوار، تدفق مصادقة كامل)",
      uiComponents: "مكونات UI حديثة (shadcn/ui، Radix UI، سمات مخصصة)",
      stateManagement: "إدارة الحالة (Redux Toolkit، React Query، حفظ الحالة)",
      testingSuite: "حزمة اختبارات (وحدات، تكامل، E2E، تغطية كاملة)",
      performance: "تحسين الأداء (مكوّنات الخادم، تحميل كسول، تحسين الحزم)",
      storybook: "تكامل Storybook (تطوير معزول للمكوّنات، تسجيل عميل)",
      socketTesting: "اختبارات Socket.IO محلية (خادم تجريبي باستخدام Express.js)",
      apiNetworking: "واجهات API والشبكات (Axios، طبقات وسيطة، نقاط نهاية آمنة، معالجة الأخطاء)",
      logging: "نظام تسجيل (Pino للعميل، مخرجات مهيكلة)",
      theming: "السمات وواجهة المستخدم (next-themes، ثلاث سمات، متغيرات CSS، مفتاح تبديل للسمات)",
      styling: "هيكلة الأسلوب (Tailwind CSS 4، نظام تصميم، استجابة، حركات)",
    },
  },

  cta: {
    title: "ابدأ تطبيقك مع Next.js Boilerplate",
    primaryButton: "ابدأ الآن",
    secondaryButton: "عرض النسخة التجريبية",
  },

  build: {
    title: "تم بناؤه باستخدام",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Storybook" },
    ],
  },

  // Add any missing keys from English file here to ensure full sync
  pricing: {
    title: "أسعار بسيطة وشفافة",
    subtitle: "خطط مرنة لـ SaaS ولوحات التحكم وتطبيقات الويب.",
    period: "/شهرياً",
    getStarted: "ابدأ الآن",
    contactSales: "تواصل مع المبيعات",
    mostPopular: "الأكثر شيوعاً",
    plans: {
      basic: {
        name: "المبتدئ",
        description: "جميع الميزات الأساسية للمطورين الفرديين",
        price: "50",
        features: ["1 مشروع", "جميع التكاملات", "مصادقة و i18n", "دعم أساسي"],
      },
      pro: {
        name: "المحترف",
        description: "ميزات متقدمة لفرق النمو",
        price: "100",
        features: [
          "5 مشاريع",
          "Socket.io ووقت حقيقي",
          "دعم أولوية",
          "تخطيطات مخصصة",
          "تحليلات متقدمة",
          "وصول إلى API",
        ],
      },
      team: {
        name: "المؤسسات",
        description: "قوة كاملة للمؤسسات والشركات",
        price: "200",
        features: [
          "مشاريع غير محدودة",
          "SSO وتكاملات مخصصة",
          "دعم 24/7",
          "هوية بيضاء",
          "إعداد مخصص",
          "وصول إلى API",
          "مصادقة SSO",
          "تكاملات مخصصة",
        ],
      },
    },
  },
} as const;

export default home;
export type HomeMessages = typeof home;
