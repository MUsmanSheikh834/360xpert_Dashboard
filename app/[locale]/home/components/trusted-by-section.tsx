"use client";
import { useTranslations } from "next-intl";
import { TrustedByCard } from "./trusted-card";
import { TrustedByItem } from "../types";
import { BaseGrid } from "@/components/shared/base-grid";

export function TrustedBySection() {
  const t = useTranslations("home");

  const trustedByItems: TrustedByItem[] = [
    {
      id: "nextjs",
      name: "Next.js",
      icon: "⚡",
      description: t("trusted.nextjs") || "React Framework",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: "🎨",
      description: t("trusted.tailwind") || "Utility-first CSS",
    },
    {
      id: "shadcn",
      name: "shadcn/ui",
      icon: "🧩",
      description: t("trusted.shadcn") || "Component Library",
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: "▲",
      description: t("trusted.vercel") || "Deployment Platform",
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm mb-8">{t("trusted.title")}</p>
        </div>

        <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={6}>
          {trustedByItems.map((item) => (
            <TrustedByCard key={item.id} item={item} />
          ))}
        </BaseGrid>
      </div>
    </section>
  );
}
