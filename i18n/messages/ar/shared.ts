const shared = {
  // مكون خطأ الحدود
  errorBoundary: {
    title: "حدث خطأ ما",
    subtitle: "حدث خطأ أثناء تحميل هذه الصفحة",
    retryButton: "أعد المحاولة",
    homeButton: "اذهب إلى الرئيسية",
    reportButton: "الإبلاغ عن مشكلة",
  },

  // حالة التحميل
  loading: {
    default: "جارٍ التحميل...",
    saving: "جارٍ الحفظ...",
    deleting: "جارٍ الحذف...",
    uploading: "جارٍ التحميل...",
    processing: "جارٍ المعالجة...",
    searching: "جارٍ البحث...",
    validating: "جارٍ التحقق...",
    submitting: "جارٍ الإرسال...",
  },

  // مكونات النوافذ المنبثقة
  modal: {
    close: "إغلاق",
    cancel: "إلغاء",
    confirm: "تأكيد",
    save: "حفظ",
    delete: "حذف",
    yes: "نعم",
    no: "لا",
    ok: "حسنًا",
  },

  // الإجراءات العامة
  actions: {
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    create: "إنشاء",
    save: "حفظ",
    cancel: "إلغاء",
    submit: "إرسال",
    reset: "إعادة تعيين",
    clear: "مسح",
    copy: "نسخ",
    paste: "لصق",
    cut: "قص",
    undo: "تراجع",
    redo: "إعادة",
    refresh: "تحديث",
    reload: "إعادة تحميل",
    export: "تصدير",
    import: "استيراد",
    download: "تنزيل",
    upload: "تحميل",
    share: "مشاركة",
    print: "طباعة",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    back: "رجوع",
    forward: "تقديم",
    close: "إغلاق",
    open: "فتح",
    expand: "توسيع",
    collapse: "طي",
    minimize: "تصغير",
    maximize: "تكبير",
  },

  // نافذة تحذير
  alertModal: {
    warning: "تحذير",
    error: "خطأ",
    success: "نجاح",
    info: "معلومات",
    deleteTitle: "حذف العنصر",
    deleteMessage: "هل تريد حقًا حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.",
    unsavedChanges: "لديك تغييرات غير محفوظة. هل تريد المغادرة حقًا؟",
  },

  // مكون جدول البيانات
  dataTable: {
    noResults: "لا توجد نتائج",
    noData: "لا توجد بيانات متاحة",
    loading: "جارٍ تحميل البيانات...",
    error: "فشل تحميل البيانات",
    retry: "أعد المحاولة",
    search: "بحث...",
    filter: "تصفية",
    sort: "ترتيب",
    export: "تصدير",
    rowsPerPage: "عدد الصفوف لكل صفحة",
    showing: "عرض",
    of: "من",
    results: "نتائج",
    selectAll: "تحديد الكل",
    selected: "تم التحديد",
    actions: "إجراءات",
    edit: "تعديل",
    view: "عرض",
    delete: "حذف",
  },

  // مكون الترقيم
  pagination: {
    previous: "السابق",
    next: "التالي",
    first: "الأول",
    last: "الأخير",
    page: "صفحة",
    of: "من",
    goToPage: "اذهب إلى الصفحة",
    itemsPerPage: "عدد العناصر لكل صفحة",
  },

  // مكون رفع الملفات
  fileUpload: {
    dropzone: "أسقط الملفات هنا أو انقر للتصفح",
    dragActive: "قم بإسقاط الملفات هنا",
    browse: "تصفح الملفات",
    maxSize: "أقصى حجم للملف",
    allowedTypes: "أنواع الملفات المسموح بها",
    uploading: "جارٍ التحميل...",
    uploadSuccess: "تم التحميل بنجاح",
    uploadError: "فشل التحميل",
    removeFile: "إزالة الملف",
    previewFile: "معاينة الملف",
  },

  // مكون البحث
  search: {
    placeholder: "بحث...",
    clear: "مسح البحث",
    noResults: "لا توجد نتائج",
    searching: "جارٍ البحث...",
    suggestions: "اقتراحات",
    recentSearches: "البحث الأخير",
    clearHistory: "مسح السجل",
  },

  // مكون الفلتر
  filter: {
    apply: "تطبيق الفلاتر",
    clear: "مسح الفلاتر",
    reset: "إعادة تعيين",
    showMore: "عرض المزيد",
    showLess: "عرض أقل",
    selectAll: "تحديد الكل",
    deselectAll: "إلغاء تحديد الكل",
    activeFilters: "الفلاتر النشطة",
    noFilters: "لا توجد فلاتر مطبقة",
  },

  // مكون شريط التنقل
  breadcrumbs: {
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    separator: "/",
    current: "الصفحة الحالية",
  },

  // مكون خطأ الشبكة
  networkError: {
    title: "خطأ في الاتصال",
    subtitle: "يرجى التحقق من اتصال الإنترنت الخاص بك وحاول مرة أخرى",
    retryButton: "أعد المحاولة",
    offlineMessage: "أنت غير متصل حاليًا",
    reconnecting: "جارٍ إعادة الاتصال...",
    connected: "تم استعادة الاتصال",
  },

  // رسائل التحقق من النموذج
  validation: {
    required: "هذا الحقل مطلوب",
    email: "يرجى إدخال بريد إلكتروني صحيح",
    minLength: "الحد الأدنى للطول هو {min} أحرف",
    maxLength: "الحد الأقصى للطول هو {max} أحرف",
    pattern: "يرجى إدخال صيغة صحيحة",
    numeric: "يرجى إدخال رقم صحيح",
    phoneNumber: "يرجى إدخال رقم هاتف صحيح",
    url: "يرجى إدخال رابط صحيح",
    date: "يرجى إدخال تاريخ صحيح",
    time: "يرجى إدخال وقت صحيح",
    file: "يرجى اختيار ملف صالح",
    fileSize: "يجب أن يكون حجم الملف أقل من {size}",
    fileType: "يرجى اختيار نوع ملف صالح",
  },
} as const;

export default shared;
export type SharedMessages = typeof shared;
