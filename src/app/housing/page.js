import { HousingCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { client } from "@/sanity/lib/client";
import { HOUSING_QUERY } from "@/sanity/lib/queries";

export default async function HousingPage() {
  const housing = await client.fetch(HOUSING_QUERY);

  if (!housing || housing.length === 0) {
    return (
      <StitchSection>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">لا توجد خيارات سكن حالياً</h2>
          <p className="text-white/40">يرجى إضافة بيانات من خلال لوحة تحكم Sanity.</p>
        </div>
      </StitchSection>
    );
  }

  const currentHousing = housing.filter(h => !h.isComingSoon);
  const comingSoonHousing = housing.filter(h => h.isComingSoon);

  return (
    <StitchSection>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">السكن الطلابي</h2>
        <p className="text-white/40">خيارات سكن مريحة وقريبة من المناطق الصناعية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {currentHousing.map((h, index) => (
          <StitchLoop key={h._id} index={index}>
            <HousingCard {...h} />
          </StitchLoop>
        ))}
      </div>

      {comingSoonHousing.length > 0 && (
        <div className="border-t border-white/5 pt-20">
          <h3 className="text-2xl font-bold mb-8 text-white/60">المزيد من السكن في المستقبل</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoonHousing.map((h, index) => (
              <StitchLoop key={h._id} index={index}>
                <HousingCard {...h} />
              </StitchLoop>
            ))}
          </div>
        </div>
      )}
    </StitchSection>
  );
}
