import { FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { Badge } from "@/components/ui";
import { EmptyState } from "@/components/empty-state";
import { factories } from "@/data/mockData";

export default function MatchResultsPage() {
  if (!factories || factories.length === 0) {
    return (
      <StitchSection>
        <EmptyState
          icon="compass"
          title="لا توجد نتائج مطابقة"
          description="لم يتم العثور على نتائج مطابقة. جرب المطابقة الذكية أولاً."
          actionHref="/matching"
          actionLabel="جرّب المطابقة الذكية"
        />
      </StitchSection>
    );
  }

  return (
    <StitchSection>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">نتائج المطابقة</h2>
        <Badge variant="outline" className="px-4 py-1 text-sm">تم العثور على {factories.length} نتائج</Badge>
      </div>

      <div className="space-y-5">
        {[...factories].sort((a, b) => b.matchScore - a.matchScore).map((factory, index) => (
          <StitchLoop key={factory.id} index={index}>
            <FactoryCard {...factory} />
          </StitchLoop>
        ))}
      </div>
    </StitchSection>
  );
}
