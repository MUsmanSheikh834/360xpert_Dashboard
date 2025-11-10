const time = {
  // الوقت النسبي
  relative: {
    justNow: "الآن",
    minuteAgo: "منذ دقيقة واحدة",
    minutesAgo: "منذ {minutes} دقائق",
    hourAgo: "منذ ساعة واحدة",
    hoursAgo: "منذ {hours} ساعات",
    dayAgo: "منذ يوم واحد",
    daysAgo: "منذ {days} أيام",
    weekAgo: "منذ أسبوع واحد",
    weeksAgo: "منذ {weeks} أسابيع",
    monthAgo: "منذ شهر واحد",
    monthsAgo: "منذ {months} أشهر",
    yearAgo: "منذ سنة واحدة",
    yearsAgo: "منذ {years} سنوات",
  },

  // الفترات الزمنية المطلقة
  periods: {
    today: "اليوم",
    yesterday: "أمس",
    tomorrow: "غدًا",
    thisWeek: "هذا الأسبوع",
    lastWeek: "الأسبوع الماضي",
    nextWeek: "الأسبوع القادم",
    thisMonth: "هذا الشهر",
    lastMonth: "الشهر الماضي",
    nextMonth: "الشهر القادم",
    thisYear: "هذا العام",
    lastYear: "العام الماضي",
    nextYear: "العام القادم",
    last7Days: "آخر 7 أيام",
    last30Days: "آخر 30 يومًا",
    last90Days: "آخر 90 يومًا",
    customRange: "نطاق مخصص",
  },

  // أيام الأسبوع
  days: {
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
  },

  // أسماء الأيام المختصرة
  daysShort: {
    mon: "اثن",
    tue: "ثلث",
    wed: "أرب",
    thu: "خمي",
    fri: "جمع",
    sat: "سبت",
    sun: "أحد",
  },

  // الأشهر
  months: {
    january: "يناير",
    february: "فبراير",
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    july: "يوليو",
    august: "أغسطس",
    september: "سبتمبر",
    october: "أكتوبر",
    november: "نوفمبر",
    december: "ديسمبر",
  },

  // أسماء الأشهر المختصرة
  monthsShort: {
    jan: "يناير",
    feb: "فبراير",
    mar: "مارس",
    apr: "أبريل",
    may: "مايو",
    jun: "يونيو",
    jul: "يوليو",
    aug: "أغسطس",
    sep: "سبتمبر",
    oct: "أكتوبر",
    nov: "نوفمبر",
    dec: "ديسمبر",
  },

  // صيغ الوقت
  formats: {
    date: "DD/MM/YYYY",
    time: "HH:mm",
    datetime: "DD/MM/YYYY HH:mm",
    dateTimeLong: "D MMMM، YYYY في h:mm A",
  },
} as const;

export default time;
export type TimeMessages = typeof time;
