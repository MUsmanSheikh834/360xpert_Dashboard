"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { signupUser, googleSignup as googleSignupThunk } from "@/redux/slices/auth-slice";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { createSignupSchema, type SignupFormValues } from "@/validations/authValidation";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/components/form/types/form";
import { useAppDispatch } from "@/redux/store";
import { useCurrentLocale } from "@/hooks/use-current-locale";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useCurrentLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Memoize schema to prevent re-creation on every render
  const signupSchema = useMemo(() => createSignupSchema(vt), [vt]);

  // Handle Google Signup success - receives JWT ID token from Google Identity Services
  async function handleGoogleSuccess(credentialResponse: any) {
    setIsGoogleLoading(true);
    try {
      // credentialResponse.credential is a JWT ID token (3 segments separated by dots)
      await dispatch(googleSignupThunk({ idToken: credentialResponse.credential })).unwrap();

      toast.success(t("success") || "Account created with Google");
      router.push(`/${locale}/login`);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Google signup failed";
      toast.error("Google Signup Failed", { description: message });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  function handleGoogleError() {
    setIsGoogleLoading(false);
    toast.error("Google Signup Failed", {
      description: "Failed to authenticate with Google",
    });
  }

  const formFields: FormField[] = [
    {
      id: "name",
      name: "name",
      label: t("nameLabel"),
      type: "text",
      placeholder: t("nameLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
    {
      id: "email",
      name: "email",
      label: t("emailLabel"),
      type: "email",
      placeholder: t("emailLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
    {
      id: "password",
      name: "password",
      label: t("passwordLabel"),
      type: "password",
      placeholder: t("passwordLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
  ];

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);

    try {
      // use redux thunk that handles axios + cookie internally
      await dispatch(
        signupUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      toast.success(t("success") || "Account Created!", {
        description: t("successDescription") || "Your account has been created successfully.",
      });

      // redirect to login page after successful signup
      router.push(`/${locale}/login`);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Signup failed";
      toast.error(t("error") || "Signup Failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm md:text-base">{t("subtitle")}</p>
      </div>
      {/* Google Signup Button - Uses Google Identity Services */}
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          size="large"
          width="384"
        />
      </div>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="space-y-4">
        <BaseForm
          fields={formFields}
          onSubmit={onSubmit}
          defaultValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          submitText={t("submitButton")}
          renderSubmitButton={({ isSubmitting }) => (
            <button
              type="submit"
              className="w-full cursor-pointer text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  {t("submittingButton")}
                </div>
              ) : (
                t("submitButton")
              )}
            </button>
          )}
        />
      </div>

      <div className="text-center text-sm md:text-base text-muted-foreground">
        <p>
          {t("hasAccountText")}{" "}
          <Link
            href={`/${locale}/login`}
            className="underline hover:text-primary cursor-pointer transition-colors font-medium"
          >
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
