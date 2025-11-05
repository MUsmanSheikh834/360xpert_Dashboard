import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SimpleFooter } from "./variants/simple-footer";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const footerT = useTranslations("layout.footer");
  const params = useParams();
  const isUrdu = params.locale === "ur";

  const footerClasses = cn("border-t bg-background", className);
  // Simplified: Use container max-width for consistency
  const containerClasses = "px-4 lg:px-6 max-w-7xl mx-auto";

  return (
    <footer className={footerClasses}>
      <div className={containerClasses}>
        <SimpleFooter footerT={footerT} isUrdu={isUrdu} />
      </div>
    </footer>
  );
}
