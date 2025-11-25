const auth = {
  // Login page
  login: {
    title: "مرحباً بك",
    subtitle: "سجّل الدخول إلى حسابك",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    submitButton: "تسجيل الدخول",
    submittingButton: "جاري تسجيل الدخول...",
    noAccountText: "ليس لديك حساب؟",
    signupLink: "إنشاء حساب",
    forgotLink: "هل نسيت كلمة المرور؟",
    success: "تم تسجيل الدخول بنجاح",
    error: "فشل تسجيل الدخول",
  },

  // Signup page
  signup: {
    title: "إنشاء حساب",
    subtitle: "سجّل الآن للبدء",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    submitButton: "إنشاء حساب",
    submittingButton: "جاري إنشاء الحساب...",
    hasAccountText: "هل لديك حساب مسبقاً؟",
    loginLink: "تسجيل الدخول",
    success: "تم إنشاء الحساب بنجاح",
    successDescription: "تم إنشاء حسابك. يرجى تسجيل الدخول.",
    error: "فشل في إنشاء الحساب",
  },

  // Forgot password page
  forgot: {
    title: "هل نسيت كلمة المرور؟",
    subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور",
    emailLabel: "البريد الإلكتروني",
    submitButton: "إرسال رابط إعادة التعيين",
    submittingButton: "جاري الإرسال...",
    backToLogin: "العودة إلى تسجيل الدخول",
    successMessage: "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني",
  },

  // OTP page
  otp: {
    title: "أدخل رمز التحقق",
    subtitle: "لقد أرسلنا رمز تحقق إلى بريدك الإلكتروني",
    codeLabel: "رمز التحقق",
    submitButton: "تأكيد",
    submittingButton: "جاري التأكيد...",
    resendButton: "إعادة إرسال الرمز",
    resendingButton: "جاري الإرسال...",
    resendText: "لم تستلم الرمز؟",
    backToLogin: "العودة إلى تسجيل الدخول",
    verifiedMessage: "تم التحقق بنجاح",
    verifiedDescription: "تم التحقق من الرمز الخاص بك بنجاح.",
    verificationFailed: "فشل التحقق",
    resendSuccess: "تم إرسال الرمز مرة أخرى",
    resendSuccessDescription: "تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.",
    resendFailed: "فشل إعادة إرسال الرمز",
  },

  // Reset password page
  reset: {
    title: "إعادة تعيين كلمة المرور",
    subtitle: "أدخل كلمة المرور الجديدة",
    newPasswordLabel: "كلمة المرور الجديدة",
    confirmPasswordLabel: "تأكيد كلمة المرور",
    submitButton: "إعادة تعيين كلمة المرور",
    submittingButton: "جاري إعادة التعيين...",
    successMessage: "تمت إعادة تعيين كلمة المرور بنجاح",
    backToLogin: "العودة إلى تسجيل الدخول",
  },

  // Common validation messages
  validation: {
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordMinLength: "يجب أن تكون كلمة المرور مكوّنة من 6 أحرف على الأقل",
    passwordMismatch: "كلمتا المرور غير متطابقتين",
    codeRequired: "رمز التحقق مطلوب",
    nameMin: "يجب أن يكون الاسم مكوّناً من حرفين على الأقل",
  },

  // Common error messages
  errors: {
    loginFailed: "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
    signupFailed: "فشل إنشاء الحساب. حاول مرة أخرى.",
    resetFailed: "فشل إرسال رابط إعادة التعيين. حاول مرة أخرى.",
    verificationFailed: "فشل التحقق. حاول مرة أخرى.",
    passwordResetFailed: "فشل إعادة تعيين كلمة المرور. حاول مرة أخرى.",
    networkError: "خطأ في الشبكة. يرجى التحقق من الاتصال.",
    serverError: "خطأ في الخادم. يرجى المحاولة لاحقاً.",
  },

  // Auth buttons and navigation
  buttons: {
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    getStarted: "ابدأ الآن",
    signIn: "تسجيل الدخول",
    register: "تسجيل",
    joinNow: "انضم الآن",
  },

  // Auth labels and tooltips
  labels: {
    loginToAccount: "سجّل الدخول إلى حسابك",
    createNewAccount: "إنشاء حساب جديد",
    welcomeBack: "مرحباً بعودتك",
    joinUs: "انضم إلينا اليوم",
  },
} as const;

export default auth;
export type AuthMessages = typeof auth;
