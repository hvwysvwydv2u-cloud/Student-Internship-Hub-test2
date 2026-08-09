import { HeroSection } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { Card } from "@/components/ui";
import { Search, CheckCircle, Building2, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    { title: "ابحث عن تدريب", desc: "استكشف مئات الفرص المتاحة", icon: <Search className="w-6 h-6"/>, path: "/search" },
    { title: "المطابقة الذكية", desc: "دع الذكاء الاصطناعي يختار لك", icon: <CheckCircle className="w-6 h-6"/>, path: "/matching" },
    { title: "السكن الطلابي", desc: "أماكن إقامة قريبة من تدريبك", icon: <Building2 className="w-6 h-6"/>, path: "/housing" },
    { title: "دليل المصانع", desc: "تعرف على شركائنا في النجاح", icon: <Briefcase className="w-6 h-6"/>, path: "/factories" },
  ];

  const stats = [
    { label: "طلاب مسجلون", value: "12,000" },
    { label: "فرص متاحة", value: "1,200+" },
    { label: "مصانع شريكة", value: "450+" },
  ];

  return (
    <div>
      <HeroSection title="ابحث عن تدريبك المثالي" />

      <StitchSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <StitchLoop key={item.path} index={index}>
              <Link href={item.path}>
                <Card className="p-5 cursor-pointer hover:border-[var(--primary)]/30 transition-all duration-200 h-full group hover:shadow-[var(--card-shadow-hover)]">
                  <div className="w-10 h-10 bg-[var(--primary-subtle)] rounded-xl flex items-center justify-center text-[var(--primary)] mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold mb-1 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                </Card>
              </Link>
            </StitchLoop>
          ))}
        </div>
      </StitchSection>

      <div className="py-14 border-y border-[var(--border)] transition-colors" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((stat, index) => (
              <StitchLoop key={stat.label} index={index}>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-[var(--primary)] mb-2">{stat.value}</h2>
                  <p className="text-[var(--text-secondary)] font-medium">{stat.label}</p>
                </div>
              </StitchLoop>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
