import { FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { Badge } from "@/components/ui";
import { factories } from "@/data/mockData";

export default function MatchResultsPage() {
  return (
    <StitchSection>
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">نتائج المطابقة</h2>
        <Badge variant="outline" className="px-4 py-1 text-sm">تم العثور على {factories.length} نتائج</Badge>
      </div>
      
      <div className="space-y-6">
        {[...factories].sort((a,b) => b.matchScore - a.matchScore).map((factory, index) => (
          <StitchLoop key={factory.id} index={index}>
            <FactoryCard {...factory} />
          </StitchLoop>
        ))}
      </div>
    </StitchSection>
  );
}
