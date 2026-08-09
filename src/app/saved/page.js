"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';
import { FactoryCard } from '@/components/react-components';
import { EmptyState } from '@/components/empty-state';
import { client } from '@/sanity/lib/client';
import { INTERNSHIPS_QUERY } from '@/sanity/lib/queries';
import { Bookmark, Heart } from 'lucide-react';

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState([]);
  const [savedInternships, setSavedInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      const stored = localStorage.getItem('studentUser');
      if (!stored) {
        setLoading(false);
        return;
      }

      try {
        const user = JSON.parse(stored);
        const res = await fetch(`/api/favorites?studentId=${user.id}`);
        const data = await res.json();

        if (data.success && data.savedIds.length > 0) {
          setSavedIds(data.savedIds);
          const allInternships = await client.fetch(INTERNSHIPS_QUERY);
          const matched = allInternships.filter(i => data.savedIds.includes(i._id));
          setSavedInternships(matched);
        }
      } catch (err) {
        console.error('Error loading saved:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, []);

  const handleUnsave = async (internshipId) => {
    const stored = localStorage.getItem('studentUser');
    if (!stored) return;
    const user = JSON.parse(stored);

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user.id, opportunityId: internshipId }),
      });
      setSavedIds(prev => prev.filter(id => id !== internshipId));
      setSavedInternships(prev => prev.filter(i => i._id !== internshipId));
    } catch (err) {
      console.error('Error unsaving:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[var(--surface-elevated)] rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-[var(--surface-elevated)] rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-6 h-6 text-[var(--primary)]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">الفرص المحفوظة</h1>
      </div>

      {savedInternships.length === 0 ? (
        <EmptyState
          icon="bookmark"
          title="لا توجد فرص محفوظة"
          description="قم بحفظ فرص التدريب التي تهمك للرجوع إليها لاحقاً."
          actionHref="/internship-opportunities"
          actionLabel="تصفح الفرص"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedInternships.map(internship => (
            <div key={internship._id} className="relative group">
              <Link href={`/internship-opportunities/${internship.slug}`}>
                <FactoryCard
                  name={internship.title}
                  hours={internship.hours}
                  location={internship.location}
                  departments={internship.departments}
                  description={internship.shortDescription || internship.description}
                  price={internship.price}
                  logo={internship.image || internship.factoryLogo}
                  factoryName={internship.factoryName}
                />
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); handleUnsave(internship._id); }}
                className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="إزالة من المحفوظات"
              >
                <Heart className="w-4 h-4 fill-[var(--primary)] text-[var(--primary)]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
