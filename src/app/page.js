import { HeroSection } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { Card, Button, Badge } from "@/components/ui";
import { Search, CheckCircle, Building2, Briefcase, ArrowUpRight, MapPin, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { factories } from "@/data/mockData";

export default function Home() {
  const features = [
    {
      title: "ابحث عن تدريب",
      desc: "استكشف مئات الفرص المتاحة في كبرى المصانع والشركات الصناعية.",
      icon: <Search className="w-5 h-5" />,
      path: "/search",
    },
    {
      title: "المطابقة الذكية",
      desc: "دع خوارزمية المطابقة تختار لك أفضل الفرص الملائمة لتخصصك وفرقتك.",
      icon: <CheckCircle className="w-5 h-5" />,
      path: "/matching",
    },
    {
      title: "السكن الطلابي",
      desc: "خيارات سكن مريحة وقريبة وموثوقة بجوار مقر تدريبك العملي.",
      icon: <Building2 className="w-5 h-5" />,
      path: "/housing",
    },
    {
      title: "دليل المصانع",
      desc: "تعرف على شركاء النجاح وتفاصيل التخصصات وأماكن المصانع.",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/factories",
    },
  ];

  // Pick top 4 featured opportunities from mockData
  const featuredOpportunities = factories.slice(0, 4);


  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Dark Green Hero Section (Matches Screenshot 1) */}
      <HeroSection />

      {/* 2. Featured Opportunities Section (Matches Screenshot 1's "Random Picks..." Section) */}
      <StitchSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] font-mono">
                FEATURED OPPORTUNITIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
              أحدث فرص التدريب الصناعي
            </h2>
          </div>
          <Link
            href="/internship-opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline group"
          >
            <span>عرض جميع الفرص</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4 Cards Grid with Elzero Life rounded corners & subtle borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredOpportunities.map((item, index) => (
            <StitchLoop key={item.id} index={index}>
              <Card className="flex flex-col justify-between p-5 h-full group hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary)] font-black text-sm flex items-center justify-center">
                      {item.name.substring(5, 7) || "تد"}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.matchScore}% تطابق
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-[var(--text-muted)] mb-5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                      <span>{item.hours} ساعة تدريبية</span>
                    </div>
                  </div>
                </div>

                <Link href="/internship-opportunities" className="w-full">
                  <Button size="sm" className="w-full font-bold">
                    <span>تقدم الآن</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            </StitchLoop>
          ))}
        </div>
      </StitchSection>

      {/* 3. Main Services / Categories Section */}
      <StitchSection>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight mb-2">
            خدمات منصة TrainLink
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            كل ما يحتاجه طالب التعليم التكنولوجي والفني لبدء مسيرة تدريبية ناجحة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, index) => (
            <StitchLoop key={item.path} index={index}>
              <Link href={item.path} className="block h-full">
                <Card className="p-6 cursor-pointer hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-300 h-full group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[var(--primary-subtle)] rounded-2xl flex items-center justify-center text-[var(--primary)] mb-4 transition-transform group-hover:scale-105">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--primary)]">
                    <span>استكشف</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Card>
              </Link>
            </StitchLoop>
          ))}
        </div>
      </StitchSection>


    </div>
  );
}
