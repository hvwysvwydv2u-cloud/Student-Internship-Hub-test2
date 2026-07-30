import { FilterPanel } from "@/components/react-components";
import { Avatar, Badge, Button, Separator } from "@/components/ui";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { Phone } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { FACTORIES_QUERY } from "@/sanity/lib/queries";

export default async function FactoriesPage() {
  // Fetching data from Sanity
  const factories = await client.fetch(FACTORIES_QUERY);

  if (!factories || factories.length === 0) {
    return (
      <StitchSection>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">لا توجد مصانع حالياً</h2>
          <p className="text-white/40">يرجى إضافة بيانات من خلال لوحة تحكم Sanity.</p>
        </div>
      </StitchSection>
    );
  }

  return (
    <StitchSection>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">دليل المصانع</h2>
        <FilterPanel />
      </div>

      <div className="space-y-12">
        {factories.map((factory, index) => (
          <StitchLoop key={factory._id} index={index}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="md:col-span-1">
                  <Avatar 
                    src={factory.logo} 
                    fallback={factory.name.substring(0, 2)} 
                    className="w-24 h-24 text-2xl mb-4" 
                  />
                  <div className="space-y-2">
                    <p className="text-sm font-bold">{factory.name}</p>
                    <p className="text-xs text-white/40">{factory.location}</p>
                  </div>
               </div>
               <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4 text-green-500">{factory.name}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{factory.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-white/20 mb-1">الأقسام المتاحة</p>
                      <div className="flex flex-wrap gap-2">
                        {factory.departments?.map(d => <Badge key={d} variant="outline">{d}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/20 mb-1">ساعات التدريب</p>
                      <p className="text-white font-medium">{factory.hours} ساعة</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/20 mb-1">الموقع</p>
                      <p className="text-white font-medium">{factory.location}</p>
                    </div>
                    {factory.price && (
                      <div>
                        <p className="text-xs text-white/20 mb-1">المكافأة / التكلفة</p>
                        <p className="text-green-500 font-bold">{factory.price}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="secondary" className="gap-2">
                    <Phone className="w-4 h-4" />
                    تواصل مع المصنع
                  </Button>
               </div>
            </div>
            {index < factories.length - 1 && <Separator className="mt-12" />}
          </StitchLoop>
        ))}
      </div>
    </StitchSection>
  );
}
