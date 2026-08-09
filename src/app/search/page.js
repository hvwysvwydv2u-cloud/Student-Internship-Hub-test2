import { SearchBar, FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { client } from "@/sanity/lib/client";
import { FACTORIES_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function SearchPage() {
  let factories = [];
  try {
    factories = await client.fetch(FACTORIES_QUERY);
  } catch {
    // Sanity not configured yet
  }

  return (
    <StitchSection>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">البحث عن فرص تدريب</h2>
        <p className="text-[var(--text-secondary)]">ابحث واستكشف فرص التدريب المتاحة في مصر.</p>
      </div>
      <SearchBar />

      {(!factories || factories.length === 0) ? (
        <EmptyState
          icon="search"
          title="لا توجد نتائج حالياً"
          description="لم نتمكن من العثور على فرص تدريب حالياً. يرجى المحاولة لاحقاً أو تصفح المصانع مباشرة."
          actionHref="/factories"
          actionLabel="تصفح المصانع"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {factories.map((factory, index) => (
            <StitchLoop key={factory._id} index={index}>
              <Link href="/internship-opportunities">
                <FactoryCard {...factory} />
              </Link>
            </StitchLoop>
          ))}
        </div>
      )}
    </StitchSection>
  );
}
