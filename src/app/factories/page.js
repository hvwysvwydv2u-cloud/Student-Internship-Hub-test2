import { Avatar, Badge, Button, Separator } from "@/components/ui";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { Phone } from "lucide-react";
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
        <p className="text-[var(--text-secondary)]">تعرّف على المصانع الشريكة وopportunities التدريب المتاحة.</p>
      </div>

      <div className="space-y-10">
        {factories.map((factory, index) => (
          <StitchLoop key={factory._id} index={index}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <Avatar
                  src={factory.logo}
                  fallback={factory.name.substring(0, 2)}
                  size="2xl"
                  className="mb-3"
                />
                <p className="text-sm font-bold text-[var(--foreground)]">{factory.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{factory.location}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-3 text-[var(--primary)]">{factory.name}</h3>
                <p className="text-[var(--text-secondary)] mb-5 leading-relaxed">{factory.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">الأقسام المتاحة</p>
                    <div className="flex flex-wrap gap-1.5">
                      {factory.departments?.map(d => <Badge key={d} variant="secondary">{d}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">ساعات التدريب</p>
                    <p className="text-[var(--foreground)] font-medium text-sm">{factory.hours} ساعة</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">الموقع</p>
                    <p className="text-[var(--foreground)] font-medium text-sm">{factory.location}</p>
                  </div>
                  {factory.price && (
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">المكافأة / التكلفة</p>
                      <p className="text-[var(--primary)] font-bold text-sm">{factory.price}</p>
                    </div>
                  )}
                </div>

                <Button variant="secondary" className="gap-2">
                  <Phone className="w-4 h-4" />
                  تواصل مع المصنع
                </Button>
              </div>
            </div>
            {index < factories.length - 1 && <Separator className="mt-10" />}
          </StitchLoop>
        ))}
      </div>
    </StitchSection>
  );
}
