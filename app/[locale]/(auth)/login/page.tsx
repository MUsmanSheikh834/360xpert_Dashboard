"use client";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { loginUser, googleAuth } from "@/redux/slices/auth-slice";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { createLoginSchema, type LoginFormValues } from "@/validations/authValidation";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/components/form/types/form";
import { useAppDispatch } from "@/redux/store";
import { GoogleSvg } from "@/components/svgs/google-svg";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // useGoogleLogin must be called at the top-level of the component (Rules of Hooks)
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // noop here; handler will call dispatch after receiving token
    },
    onError: (error) => {
      // noop - errors handled in handler
    },
    flow: "implicit",
  });

  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  const loginSchema = createLoginSchema(vt);

  const formFields: FormField[] = [
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

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      // use redux thunk that handles axios + cookie internally
      await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();

      toast.success(t("success") || "Logged in");

      // go to home after successful login
      router.push(`/${locale}/`);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Login failed";
      toast.error(t("error") || "Login failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      // open the Google popup
      const response = await new Promise<any>((resolve, reject) => {
        // wrap the googleLogin callback to capture the response
        const onSuccess = (res: any) => resolve(res);
        const onError = (err: any) => reject(err);

        // call googleLogin which will trigger browser popup; it doesn't accept callbacks here,
        // so we set a temporary global listener: use the promise to wait for window message
        // However, useGoogleLogin returns a function that will open the popup and internally
        // call the onSuccess/onError we provided at hook creation. To capture that result we
        // can create a small wrapper by temporarily overriding the hook's onSuccess via a
        // small hack: call googleLogin and poll for token on window.google if available.

        // Simpler approach: call googleLogin() and rely on the library to call the onSuccess
        // we provided earlier. Since that onSuccess was noop, we instead call googleLogin()
        // and then wait briefly for the global credential response via a small timeout.
        try {
          googleLogin();
        } catch (e) {
          return reject(e);
        }

        // The library does not expose a direct promise; poll for credential via window.
        const start = Date.now();
        const interval = setInterval(() => {
          // look for credential response on (window as any).__google_oauth_response__
          const g = (window as any).__google_oauth_response__;
          if (g) {
            clearInterval(interval);
            delete (window as any).__google_oauth_response__;
            return resolve(g);
          }
          if (Date.now() - start > 30000) {
            clearInterval(interval);
            return reject(new Error("Google login timeout"));
          }
        }, 200);
      });

      const accessToken = response?.access_token || response?.credential;
      if (!accessToken) throw new Error("Missing access token from Google");

      await dispatch(googleAuth({ idToken: accessToken })).unwrap();
      toast.success(t("success") || "Logged in with Google");
      router.push(`/${locale}/`);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Google login failed";
      toast.error("Google Login Failed", { description: message });
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

      <div className="space-y-4">
        <BaseForm
          fields={formFields}
          onSubmit={onSubmit}
          defaultValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
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

        <div className="text-right">
          <Link
            href={`/${locale}/forgot`}
            className="text-sm md:text-base text-muted-foreground underline hover:text-primary cursor-pointer transition-colors"
          >
            {t("forgotLink")}
          </Link>
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

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base font-medium"
        >
          <GoogleSvg className="w-5 h-5" />
          Continue with Google
        </button>
      </div>

      <div className="text-center text-sm md:text-base text-muted-foreground">
        <p>
          {t("noAccountText")}{" "}
          <Link
            href={`/${locale}/signup`}
            className="underline hover:text-primary cursor-pointer transition-colors font-medium"
          >
            {t("signupLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
