import { FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { client } from "@/sanity/lib/client";
import { INTERNSHIPS_QUERY, FACTORIES_QUERY } from "@/sanity/lib/queries";

export default async function InternshipOpportunities() {
  let internships = [];
  let factories = [];
  try {
    internships = await client.fetch(INTERNSHIPS_QUERY);
    factories = await client.fetch(FACTORIES_QUERY);
  } catch {
    // Sanity not configured yet
  }

  const displayItems = internships && internships.length > 0 ? internships : factories;

  return (
    <StitchSection>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">فرص التدريب المتاحة</h2>
        <p className="text-[var(--text-secondary)]">اختر الفرصة التي تناسب تخصصك وطموحاتك المهنية.</p>
      </div>

      {(!displayItems || displayItems.length === 0) ? (
        <EmptyState
          icon="internship"
          title="لا توجد فرص متاحة حالياً"
          description="لم نتمكن من العثور على فرص تدريب حالياً. يرجى المحاولة لاحقاً أو استخدم المطابقة الذكية لاكتشاف فرص مناسبة لك."
          actionHref="/matching"
          actionLabel="جرّب المطابقة الذكية"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayItems.map((item, index) => (
            <StitchLoop key={item._id} index={index}>
              <FactoryCard
                {...item}
                name={item.title || item.name}
                description={item.description}
                logo={item.image || item.logo || item.factoryLogo}
                factoryName={item.factoryName}
              />
            </StitchLoop>
          ))}
        </div>
      )}
    </StitchSection>
  );
}
