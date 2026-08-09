import { HousingCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { client } from "@/sanity/lib/client";
import { HOUSING_QUERY } from "@/sanity/lib/queries";

export default async function HousingPage() {
  let housing = [];
  try {
    housing = await client.fetch(HOUSING_QUERY);
  } catch {
    // Sanity not configured yet
  }

  if (!housing || housing.length === 0) {
    return (
      <StitchSection>
        <EmptyState
          icon="housing"
          title="لا توجد خيارات سكن حالياً"
          description="لم نتمكن من تحميل بيانات السكن. يرجى المحاولة لاحقاً أو التحقق من إعدادات Sanity."
          actionHref="/"
          actionLabel="العودة للرئيسية"
        />
      </StitchSection>
    );
  }

  const currentHousing = housing.filter(h => !h.isComingSoon);
  const comingSoonHousing = housing.filter(h => h.isComingSoon);

  return (
    <StitchSection>
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">السكن الطلابي</h2>
        <p className="text-[var(--text-secondary)]">خيارات سكن مريحة وقريبة من المناطق الصناعية.</p>
      </div>

      {currentHousing.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {currentHousing.map((h, index) => (
            <StitchLoop key={h._id} index={index}>
              <HousingCard {...h} />
            </StitchLoop>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="housing"
          title="لا توجد خيارات سكن متاحة"
          description="لم نتمكن من العثور على خيارات سكن متاحة حالياً."
        />
      )}

      {comingSoonHousing.length > 0 && (
        <div className="border-t border-[var(--border)] pt-14">
          <h3 className="text-xl font-bold mb-6 text-[var(--text-secondary)]">المزيد من السكن في المستقبل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
