"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { client } from '@/sanity/lib/client';
import { INTERNSHIP_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { MapPin, Clock, DollarSign, Building2, ArrowRight, ExternalLink, Mail, Phone, Globe, MessageCircle } from 'lucide-react';

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
        <Button asChild variant="primary">
          <Link href="/internship-opportunities">العودة للفرص</Link>
        </Button>
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

  const rawDigits = (factoryPhone || '').replace(/[^0-9]/g, '');
  const whatsappNumber = rawDigits.startsWith('20')
    ? rawDigits
    : rawDigits.startsWith('0')
      ? `20${rawDigits.slice(1)}`
      : rawDigits;
  const hasApplyUrl = !!internship.applyUrl;
  const hasFactoryContact = !!(factoryPhone || factoryEmail);

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
                    <Button asChild variant="primary" className="gap-2">
                      <a href={internship.applyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        تقديم الآن
                      </a>
                    </Button>
                  )}
                  {!hasApplyUrl && hasFactoryContact && factorySlug && (
                    <Button asChild variant="primary" className="gap-2">
                      <Link href={`/factories/${factorySlug}`}>
                        <Building2 className="w-4 h-4" />
                        تواصل مع {factoryName || 'الشركة'} للتقديم
                      </Link>
                    </Button>
                  )}
                  {!hasApplyUrl && !hasFactoryContact && (
                    <p className="text-sm text-[var(--text-muted)]">
                      لا يوجد رابط تقديم مباشر. يرجى التواصل مع الشركة للاستفسار عن إجراءات التقدم.
                    </p>
                  )}

                  {internship.contactEmail && (
                    <Button asChild variant="secondary" className="gap-2">
                      <a href={`mailto:${internship.contactEmail}`}>
                        <Mail className="w-4 h-4" />
                        {internship.contactEmail}
                      </a>
                    </Button>
                  )}
                  {internship.contactPhone && (
                    <Button asChild variant="secondary" className="gap-2">
                      <a href={`tel:${internship.contactPhone}`}>
                        <Phone className="w-4 h-4" />
                        <span dir="ltr">{internship.contactPhone}</span>
                      </a>
                    </Button>
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
                {/* Clickable header — links to factory profile */}
                {factorySlug ? (
                  <Link
                    href={`/factories/${factorySlug}`}
                    className="flex items-center gap-4 group/header rounded-xl p-2 transition-colors hover:bg-[var(--primary-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center border border-[var(--border)] shrink-0 overflow-hidden">
                      {factory.image ? (
                        <img src={factory.image} alt={factoryName} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-7 h-7 text-[var(--primary)]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-[var(--foreground)] truncate group-hover/header:text-[var(--primary)] transition-colors">{factoryName}</h3>
                      {factory.location && (
                        <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{factory.location}</span>
                        </p>
                      )}
                    </div>
                  </Link>
                ) : (
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
                )}

                {/* Contact links — each row is a full-width clickable target */}
                <div className="space-y-1">
                  {factoryPhone && (
                    <a
                      href={`tel:${factoryPhone}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-lg px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
                      aria-label={`الاتصال على ${factoryPhone}`}
                    >
                      <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span dir="ltr">{factoryPhone}</span>
                    </a>
                  )}
                  {factoryEmail && (
                    <a
                      href={`mailto:${factoryEmail}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-lg px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
                      aria-label={`إرسال بريد إلكتروني إلى ${factoryEmail}`}
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
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-lg px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
                      aria-label={`زيارة الموقع الإلكتروني ${factoryWebsite.replace(/^https?:\/\//, '')}`}
                    >
                      <Globe className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span className="truncate" dir="ltr">{factoryWebsite.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                  {!factoryPhone && !factoryEmail && !factoryWebsite && (
                    <p className="text-sm text-[var(--text-muted)] py-2 px-2">
                      لا توجد معلومات تواصل متاحة.
                    </p>
                  )}
                </div>

                {/* Primary action buttons */}
                {factoryPhone && (
                  <div className="pt-3 border-t border-[var(--border)] space-y-2">
                    <Button asChild variant="primary" className="w-full gap-2" aria-label={`الاتصال بـ ${factoryName}`}>
                      <a href={`tel:${factoryPhone}`}>
                        <Phone className="w-4 h-4" />
                        اتصل الآن
                      </a>
                    </Button>
                    {whatsappNumber.length === 12 && (
                      <Button asChild variant="outline" className="w-full gap-2 text-sm" aria-label={`التواصل مع ${factoryName} عبر واتساب`}>
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          تواصل عبر واتساب
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {/* Fallback CTA when no phone but slug exists */}
                {!factoryPhone && factorySlug && (
                  <div className="pt-3 border-t border-[var(--border)]">
                    <Button asChild variant="primary" className="w-full gap-2" aria-label={`عرض ملف ${factoryName} للتواصل`}>
                      <Link href={`/factories/${factorySlug}`}>
                        <Building2 className="w-4 h-4" />
                        تواصل مع {factoryName}
                      </Link>
                    </Button>
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
