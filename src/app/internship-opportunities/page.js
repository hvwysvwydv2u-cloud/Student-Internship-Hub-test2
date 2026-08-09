"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FactoryCard } from "@/components/react-components";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import { EmptyState } from "@/components/empty-state";
import { client } from "@/sanity/lib/client";
import { INTERNSHIPS_QUERY, FACTORIES_QUERY } from "@/sanity/lib/queries";

export default function InternshipOpportunities() {
  const [internships, setInternships] = useState([]);
  const [factories, setFactories] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [i, f] = await Promise.all([
          client.fetch(INTERNSHIPS_QUERY),
          client.fetch(FACTORIES_QUERY),
        ]);
        setInternships(i || []);
        setFactories(f || []);

        const stored = localStorage.getItem('studentUser');
        if (stored) {
          const user = JSON.parse(stored);
          const res = await fetch(`/api/favorites?studentId=${user.id}`);
          const data = await res.json();
          if (data.success) setSavedIds(data.savedIds || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleSave = async (internshipId) => {
    const stored = localStorage.getItem('studentUser');
    if (!stored) return;
    const user = JSON.parse(stored);

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user.id, opportunityId: internshipId }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedIds(prev =>
          data.saved ? [...prev, internshipId] : prev.filter(id => id !== internshipId)
        );
      }
    } catch {
      // ignore
    }
  };

  const displayItems = internships.length > 0 ? internships : factories;

  return (
    <StitchSection>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">فرص التدريب المتاحة</h2>
        <p className="text-[var(--text-secondary)]">اختر الفرصة التي تناسب تخصصك وطموحاتك المهنية.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-[var(--surface-elevated)] rounded animate-pulse" />
          ))}
        </div>
      ) : (!displayItems || displayItems.length === 0) ? (
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
                description={item.shortDescription || item.description}
                logo={item.image || item.logo || item.factoryLogo}
                factoryName={item.factoryName}
                slug={item.slug}
                isSaved={savedIds.includes(item._id)}
                onToggleSave={() => toggleSave(item._id)}
              />
            </StitchLoop>
          ))}
        </div>
      )}
    </StitchSection>
  );
}
