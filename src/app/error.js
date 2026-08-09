"use client";

import Link from "next/link";
import { Button } from "@/components/ui";

export default function Error() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center" dir="rtl">
      <div className="w-20 h-20 rounded-2xl bg-[var(--error)]/10 flex items-center justify-center mb-6">
        <span className="text-4xl font-black text-[var(--error)]">٥٠٠</span>
      </div>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">خطأ في الخادم</h1>
      <p className="text-[var(--text-secondary)] max-w-md mb-8 leading-relaxed">
        حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة للرئيسية.
      </p>
      <Link href="/">
        <Button size="lg">العودة للرئيسية</Button>
      </Link>
    </div>
  );
}
