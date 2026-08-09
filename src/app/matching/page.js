"use client";

import { MatchForm } from "@/components/react-components";
import { StitchSection } from "@/components/stitch-loop";
import { Badge } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function MatchingPage() {
  const router = useRouter();

  return (
    <StitchSection>
      <div className="max-w-2xl mx-auto text-center mb-10">
        <Badge className="mb-3">AI Matching</Badge>
        <h2 className="text-3xl font-bold mb-3 text-[var(--foreground)]">المطابقة الذكية</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">أدخل بياناتك الأكاديمية وسنقوم بترشيح أفضل المصانع التي تتوافق مع تخصصك وموقعك.</p>
      </div>
      <MatchForm onSubmit={() => router.push('/match-results')} />
    </StitchSection>
  );
}
