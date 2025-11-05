"use client";
import Image from "next/image";
import { type PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image (hidden on mobile) */}
      <div className="relative hidden md:block w-full md:w-[70%] h-screen">
        <Image
          src="https://res.cloudinary.com/dzr3drmyk/image/upload/v1762353672/Gemini_Generated_Image_o7dttoo7dttoo7dt_o5qcky.png"
          alt="Next.js Enterprise Boilerplate"
          fill
          priority
          className="object-cover"
          sizes="70vw"
        />
      </div>
      {/* Right side - Auth form */}
      <div className="flex items-center justify-center p-6 w-full md:w-[30%] min-h-screen">
        <div className="w-full max-w-sm space-y-6">{children}</div>
      </div>
    </div>
  );
}
