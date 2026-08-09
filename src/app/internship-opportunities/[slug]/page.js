"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { client } from '@/sanity/lib/client';
import { INTERNSHIP_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { MapPin, Clock, DollarSign, Building2, ArrowRight, ExternalLink, Mail, Phone } from 'lucide-react';

export default function InternshipDetailPage() {
  const params = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchInternship() {
      try {
        const data = await client.fetch(INTERNSHIP_BY_SLUG_QUERY, { slug: params.slug });
        if (data) {
          setInternship(data);
        } else {
          setError('لم يتم العثور على الفرصة');
        }
      } catch (err) {
        setError('خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) fetchInternship();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-[var(--surface-elevated)] rounded w-2/3" />
          <div className="h-4 bg-[var(--surface-elevated)] rounded w-1/2" />
          <div className="h-48 bg-[var(--surface-elevated)] rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center" dir="rtl">
        <p className="text-[var(--text-secondary)] text-lg mb-4">{error}</p>
        <Link href="/internship-opportunities">
          <Button variant="primary">العودة للفرص</Button>
        </Link>
      </div>
    );
  }

  if (!internship) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <Link href="/internship-opportunities" className="inline-flex items-center gap-2 text-[var(--primary)] mb-6 hover:underline text-sm">
        <ArrowRight className="w-4 h-4" />
        العودة لقائمة الفرص
      </Link>

      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">{internship.title}</h1>
            {internship.factory && (
              <p className="text-[var(--text-secondary)] flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {internship.factory.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {internship.location && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--primary)]" />
                <span>{internship.location}</span>
              </div>
            )}
            {internship.hours && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--primary)]" />
                <span>{internship.hours} ساعة</span>
              </div>
            )}
            {internship.duration && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--primary)]" />
                <span>{internship.duration}</span>
              </div>
            )}
            {internship.price && (
              <div className="flex items-center gap-2 text-sm text-[var(--primary)] font-bold">
                <DollarSign className="w-4 h-4" />
                <span>{internship.price}</span>
              </div>
            )}
          </div>

          {internship.departments && internship.departments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {internship.departments.map(dept => (
                <Badge key={dept} variant="secondary">{dept}</Badge>
              ))}
            </div>
          )}

          {internship.academicYears && internship.academicYears.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">الفرق الدراسية المناسبة</h4>
              <div className="flex flex-wrap gap-2">
                {internship.academicYears.map(year => (
                  <Badge key={year} variant="outline">السنة {year}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[var(--border)] pt-6">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">وصف الفرصة</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{internship.description}</p>
          </div>

          <div className="border-t border-[var(--border)] pt-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">التواصل والتقديم</h3>
            <div className="flex flex-wrap gap-3">
              {internship.applyUrl && (
                <a href={internship.applyUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    تقديم الآن
                  </Button>
                </a>
              )}
              {internship.contactEmail && (
                <a href={`mailto:${internship.contactEmail}`}>
                  <Button variant="secondary" className="gap-2">
                    <Mail className="w-4 h-4" />
                    {internship.contactEmail}
                  </Button>
                </a>
              )}
              {internship.contactPhone && (
                <a href={`tel:${internship.contactPhone}`}>
                  <Button variant="secondary" className="gap-2">
                    <Phone className="w-4 h-4" />
                    {internship.contactPhone}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {internship.factory && (
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">المصنع / الشركة</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--foreground)]">{internship.factory.name}</p>
                  {internship.factory.location && (
                    <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {internship.factory.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
