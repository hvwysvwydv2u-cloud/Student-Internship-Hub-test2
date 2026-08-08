import { HeroSection, FactoryCard } from "@/components/react-components";
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
    { label: "طلاب مسجلون", value: "12000" },
    { label: "فرص متاحة", value: "1,200+" },
    { label: "مصانع شريكة", value: "450+" },
  ];

  return (
    <div>
      <HeroSection title="ابحث عن تدريبك المثالي" />
      
      <StitchSection>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <StitchLoop key={item.path} index={index}>
              <Link href={item.path}>
                <Card className="p-6 cursor-pointer hover:border-green-500 transition-all h-full">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </Card>
              </Link>
            </StitchLoop>
          ))}
        </div>
      </StitchSection>

      <div className="bg-surface py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <StitchLoop key={stat.label} index={index}>
                <div>
                  <h2 className="text-5xl font-black text-green-500 mb-2">{stat.value}</h2>
                  <p className="text-white/60 font-medium">{stat.label}</p>
                </div>
              </StitchLoop>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
