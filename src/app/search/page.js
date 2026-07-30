import { SearchBar, FilterPanel, FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { client } from "@/sanity/lib/client";
import { FACTORIES_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function SearchPage() {
  const factories = await client.fetch(FACTORIES_QUERY);

  return (
    <StitchSection>
      <h2 className="text-3xl font-bold mb-8 text-center">البحث عن فرص تدريب</h2>
      <SearchBar />
      <FilterPanel />
      
      {(!factories || factories.length === 0) ? (
        <div className="text-center py-10 text-white/20">لا توجد بيانات متاحة للبحث.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
