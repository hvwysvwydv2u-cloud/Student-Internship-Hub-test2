"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { client } from '@/sanity/lib/client';
import { INTERNSHIP_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { MapPin, Clock, DollarSign, Building2, ArrowRight, ExternalLink, Mail, Phone, Globe } from 'lucide-react';

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
      } catch {
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

  const factory = internship.factory;
  const factoryPhone = factory?.phone || factory?.contact;
  const factoryEmail = factory?.email;
  const factoryWebsite = factory?.website;
  const factorySlug = factory?.slug?.current;
  const factoryName = factory?.name;

  const whatsappPhone = (factoryPhone || '').replace(/[^0-9]/g, '');
  const hasApplyUrl = !!internship.applyUrl;
  const hasFactoryContact = !!(factoryPhone || factoryEmail);
  const hasInternshipContact = !!(internship.contactEmail || internship.contactPhone);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <Link href="/internship-opportunities" className="inline-flex items-center gap-2 text-[var(--primary)] mb-6 hover:underline text-sm">
        <ArrowRight className="w-4 h-4" />
        العودة لقائمة الفرص
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">{internship.title}</h1>
                {factoryName && (
                  <Link
                    href={factorySlug ? `/factories/${factorySlug}` : '#'}
                    className="text-[var(--text-secondary)] flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    {factoryName}
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {internship.location && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{internship.location}</span>
                  </div>
                )}
                {internship.hours && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{internship.hours} ساعة</span>
                  </div>
                )}
                {internship.duration && (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{internship.duration}</span>
                  </div>
                )}
                {internship.price && (
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)] font-bold">
                    <DollarSign className="w-4 h-4 shrink-0" />
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

              {internship.description && (
                <div className="border-t border-[var(--border)] pt-6">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">وصف الفرصة</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{internship.description}</p>
                </div>
              )}

              {/* Apply / Contact Actions */}
              <div className="border-t border-[var(--border)] pt-6 space-y-4">
                <h3 className="text-lg font-bold text-[var(--foreground)]">التواصل والتقديم</h3>
                <div className="flex flex-wrap gap-3">
                  {hasApplyUrl && (
                    <a href={internship.applyUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        تقديم الآن
                      </Button>
                    </a>
                  )}
                  {!hasApplyUrl && hasFactoryContact && factorySlug && (
                    <Link href={`/factories/${factorySlug}`}>
                      <Button variant="primary" className="gap-2">
                        <Building2 className="w-4 h-4" />
                        تواصل مع {factoryName || 'الشركة'} للتقديم
                      </Button>
                    </Link>
                  )}
                  {!hasApplyUrl && !hasFactoryContact && (
                    <p className="text-sm text-[var(--text-muted)]">
                      لا يوجد رابط تقديم مباشر. يرجى التواصل مع الشركة للاستفسار عن إجراءات التقدم.
                    </p>
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
                        <span dir="ltr">{internship.contactPhone}</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Company Contact Card */}
        <div className="space-y-6">
          {factory && (
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center border border-[var(--border)] shrink-0 overflow-hidden">
                    {factory.image ? (
                      <img src={factory.image} alt={factoryName} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-7 h-7 text-[var(--primary)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[var(--foreground)] truncate">{factoryName}</h3>
                    {factory.location && (
                      <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{factory.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {factorySlug && (
                  <Link href={`/factories/${factorySlug}`}>
                    <Button variant="ghost" className="w-full text-sm gap-2">
                      عرض ملف الشركة
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                )}

                <div className="space-y-2.5">
                  {factoryPhone && (
                    <a
                      href={`tel:${factoryPhone}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-1"
                    >
                      <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span dir="ltr">{factoryPhone}</span>
                    </a>
                  )}
                  {factoryEmail && (
                    <a
                      href={`mailto:${factoryEmail}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-1"
                    >
                      <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span className="truncate">{factoryEmail}</span>
                    </a>
                  )}
                  {factoryWebsite && (
                    <a
                      href={factoryWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-1"
                    >
                      <Globe className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span className="truncate" dir="ltr">{factoryWebsite.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                  {!factoryPhone && !factoryEmail && !factoryWebsite && (
                    <p className="text-sm text-[var(--text-muted)] py-1">
                      لا توجد معلومات تواصل متاحة.
                    </p>
                  )}
                </div>

                {factoryPhone && (
                  <div className="pt-3 border-t border-[var(--border)] space-y-2">
                    <a href={`tel:${factoryPhone}`}>
                      <Button variant="primary" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        اتصل الآن
                      </Button>
                    </a>
                    {whatsappPhone.length >= 10 && (
                      <a
                        href={`https://wa.me/${whatsappPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full gap-2 text-sm">
                          تواصل عبر واتساب
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
