"use client";

import { MatchForm } from "@/components/react-components";
import { StitchSection } from "@/components/stitch-loop";
import { Badge } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function MatchingPage() {
  const router = useRouter();
  
  return (
    <StitchSection>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <Badge className="mb-4">AI Matching</Badge>
        <h2 className="text-4xl font-black mb-4">المطابقة الذكية</h2>
        <p className="text-white/40">أدخل بياناتك الأكاديمية وسنقوم بترشيح أفضل المصانع التي تتوافق مع تخصصك وموقعك الجغرافي.</p>
      </div>
      <MatchForm onSubmit={() => router.push('/match-results')} />
    </StitchSection>
  );
}
