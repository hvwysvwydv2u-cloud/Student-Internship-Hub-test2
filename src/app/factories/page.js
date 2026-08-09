import Link from "next/link";
import { Avatar, Badge } from "@/components/ui";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { FACTORIES_QUERY } from "@/sanity/lib/queries";

export default async function FactoriesPage() {
  let factories = [];
  try {
    factories = await client.fetch(FACTORIES_QUERY);
  } catch {
    // Sanity not configured yet
  }

  if (!factories || factories.length === 0) {
    return (
      <StitchSection>
        <EmptyState
          icon="factory"
          title="لا توجد مصانع حالياً"
          description="لم نتمكن من تحميل بيانات المصانع. يرجى المحاولة لاحقاً أو التحقق من إعدادات Sanity."
          actionHref="/"
          actionLabel="العودة للرئيسية"
        />
      </StitchSection>
    );
  }

  return (
    <StitchSection>
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">دليل المصانع</h2>
        <p className="text-[var(--text-secondary)]">
          تعرّف على المصانع الشريكة وفرص التدريب المتاحة.
        </p>
      </div>

      <div className="space-y-8">
        {factories.map((factory, index) => (
          <StitchLoop key={factory._id} index={index}>
            <Link href={`/factories/${factory.slug}`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-5 md:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-200 cursor-pointer group">
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4">
                  <Avatar
                    src={factory.logo}
                    fallback={factory.name.substring(0, 2)}
                    size="2xl"
                    className="shrink-0"
                  />
                  <div className="md:mt-1">
                    <p className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {factory.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {factory.location}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed line-clamp-2">
                    {factory.shortDescription || factory.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                    {factory.hours && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                        {factory.hours} ساعة تدريب
                      </span>
                    )}
                    {factory.departments && factory.departments.length > 0 && (
                      <span className="flex items-center gap-1">
                        {factory.departments.length} أقسام
                      </span>
                    )}
                    {factory.price && (
                      <span className="text-[var(--primary)] font-semibold">{factory.price}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {factory.departments?.slice(0, 3).map((d) => (
                        <Badge key={d} variant="secondary" className="text-[10px]">
                          {d}
                        </Badge>
                      ))}
                      {factory.departments && factory.departments.length > 3 && (
                        <Badge variant="secondary" className="text-[10px]">
                          +{factory.departments.length - 3}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-[var(--primary)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      عرض التفاصيل
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </StitchLoop>
        ))}
      </div>
    </StitchSection>
  );
}
