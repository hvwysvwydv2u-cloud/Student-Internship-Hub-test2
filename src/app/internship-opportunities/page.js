import { FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { client } from "@/sanity/lib/client";
import { INTERNSHIPS_QUERY, FACTORIES_QUERY } from "@/sanity/lib/queries";

export default async function InternshipOpportunities() {
  const internships = await client.fetch(INTERNSHIPS_QUERY);
  const factories = await client.fetch(FACTORIES_QUERY);

  // Combine or prioritize internships
  const displayItems = internships && internships.length > 0 ? internships : factories;

  return (
    <StitchSection>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black mb-4">فرص التدريب المتاحة</h2>
        <p className="text-white/40">اختر الفرصة التي تناسب تخصصك الدراسي وطموحاتك المهنية.</p>
      </div>
      
      {(!displayItems || displayItems.length === 0) ? (
        <div className="text-center py-10 text-white/20">لا توجد فرص متاحة حالياً.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
