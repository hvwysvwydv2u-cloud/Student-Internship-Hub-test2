import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { FACTORY_BY_SLUG_QUERY, INTERNSHIPS_BY_FACTORY_QUERY } from "@/sanity/lib/queries";
import { Badge, Button } from "@/components/ui";
import { StitchLoop, StitchSection } from "@/components/stitch-loop";
import {
  MapPin,
  Clock,
  Briefcase,
  Phone,
  Mail,
  Globe,
  Star,
  ArrowRight,
  Building2,
  GraduationCap,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let factory = null;
  try {
    factory = await client.fetch(FACTORY_BY_SLUG_QUERY, { slug });
  } catch {
    return {};
  }
  if (!factory) return {};
  return {
    title: factory.name,
    description: factory.shortDescription || factory.description?.substring(0, 160) || ` صفحة ${factory.name} على ترين لينك`,
    openGraph: {
      title: `${factory.name} | ترين لينك`,
      description: factory.shortDescription || factory.description?.substring(0, 160),
      images: factory.coverImage ? [factory.coverImage] : factory.logo ? [factory.logo] : [],
    },
  };
}

function StarRating({ rating }) {
  if (!rating || rating <= 0) return null;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1.5" aria-label={`تقييم ${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]"
              : i === fullStars && hasHalf
              ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]/50"
              : "text-[var(--border)]"
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-[var(--text-secondary)] mr-1">{rating}</span>
    </div>
  );
}

export default async function FactoryProfilePage({ params }) {
  const { slug } = await params;

  let factory = null;
  let internships = [];

  try {
    factory = await client.fetch(FACTORY_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }

  if (!factory) {
    notFound();
  }

  try {
    internships = await client.fetch(INTERNSHIPS_BY_FACTORY_QUERY, {
      factoryId: factory._id,
    });
  } catch {
    // internships fetch failed, show empty
  }

  return (
    <div dir="rtl">
      {/* Cover / Hero */}
      <div className="relative h-48 md:h-64 bg-[var(--surface-elevated)] overflow-hidden">
        {factory.coverImage ? (
          <img
            src={factory.coverImage}
            alt={factory.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-bl from-[var(--primary-subtle)] to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
      </div>

      <StitchSection className="-mt-16 relative z-10">
        {/* Factory Identity Header */}
        <StitchLoop index={0}>
          <div className="flex flex-col md:flex-row md:items-end gap-5 mb-10">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[var(--surface)] border-4 border-[var(--background)] shadow-lg overflow-hidden shrink-0">
              {factory.logo ? (
                <img
                  src={factory.logo}
                  alt={`شعار ${factory.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--primary-subtle)]">
                  <Building2 className="w-10 h-10 text-[var(--primary)]" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                {factory.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                {factory.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[var(--primary)]" />
                    {factory.location}
                  </span>
                )}
                {factory.rating > 0 && <StarRating rating={factory.rating} />}
              </div>
              {factory.shortDescription && (
                <p className="text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed">
                  {factory.shortDescription}
                </p>
              )}
            </div>
          </div>
        </StitchLoop>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Right Column — Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {factory.description && (
              <StitchLoop index={1}>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">نبذة عن المصنع</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {factory.description}
                  </p>
                </div>
              </StitchLoop>
            )}

            {/* Training Info */}
            <StitchLoop index={2}>
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">معلومات التدريب</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {factory.hours && (
                    <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                      <Clock className="w-5 h-5 text-[var(--primary)] mb-2" />
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">ساعات التدريب</p>
                      <p className="text-sm font-bold text-[var(--foreground)]">{factory.hours} ساعة</p>
                    </div>
                  )}
                  {factory.price && (
                    <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                      <GraduationCap className="w-5 h-5 text-[var(--primary)] mb-2" />
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">المكافأة</p>
                      <p className="text-sm font-bold text-[var(--primary)]">{factory.price}</p>
                    </div>
                  )}
                  {factory.location && (
                    <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                      <MapPin className="w-5 h-5 text-[var(--primary)] mb-2" />
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">الموقع</p>
                      <p className="text-sm font-bold text-[var(--foreground)]">{factory.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </StitchLoop>

            {/* Departments */}
            {factory.departments && factory.departments.length > 0 && (
              <StitchLoop index={3}>
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">الأقسام المتاحة</h2>
                  <div className="flex flex-wrap gap-2">
                    {factory.departments.map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-sm py-1.5 px-3">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </StitchLoop>
            )}

            {/* Internship Opportunities */}
            <StitchLoop index={4}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">فرص التدريب</h2>
                  {internships.length > 0 && (
                    <Badge variant="primary">{internships.length} فرصة</Badge>
                  )}
                </div>
                {internships.length === 0 ? (
                  <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                    <Briefcase className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      لا توجد فرق تدريب متاحة حالياً tại هذا المصنع.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {internships.map((internship) => (
                      <div
                        key={internship._id}
                        className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-bold text-[var(--foreground)] mb-1">
                              {internship.title}
                            </h3>
                            {internship.location && (
                              <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {internship.location}
                              </p>
                            )}
                          </div>
                          {internship.price && (
                            <Badge variant="primary" className="shrink-0">
                              {internship.price}
                            </Badge>
                          )}
                        </div>
                        {internship.description && (
                          <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                            {internship.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                          {internship.hours && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {internship.hours} ساعة
                            </span>
                          )}
                          {internship.departments && internship.departments.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              {internship.departments.join("، ")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </StitchLoop>
          </div>

          {/* Left Column — Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <StitchLoop index={5}>
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="font-bold text-[var(--foreground)] mb-4">معلومات التواصل</h3>
                <div className="space-y-3">
                  {factory.phone && (
                    <a
                      href={`tel:${factory.phone}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span dir="ltr">{factory.phone}</span>
                    </a>
                  )}
                  {factory.contact && factory.contact !== factory.phone && (
                    <a
                      href={`tel:${factory.contact}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span dir="ltr">{factory.contact}</span>
                    </a>
                  )}
                  {factory.email && (
                    <a
                      href={`mailto:${factory.email}`}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span className="truncate">{factory.email}</span>
                    </a>
                  )}
                  {factory.website && (
                    <a
                      href={factory.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                    >
                      <Globe className="w-4 h-4 text-[var(--primary)] shrink-0" />
                      <span className="truncate" dir="ltr">
                        {factory.website.replace(/^https?:\/\//, "")}
                      </span>
                    </a>
                  )}
                  {!factory.phone && !factory.contact && !factory.email && !factory.website && (
                    <p className="text-sm text-[var(--text-muted)]">
                      لا توجد معلومات تواصل متاحة حالياً.
                    </p>
                  )}
                </div>
                {(factory.phone || factory.contact) && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <a href={`tel:${factory.phone || factory.contact}`}>
                      <Button variant="primary" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        اتصل الآن
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </StitchLoop>

            {/* Quick Facts */}
            <StitchLoop index={6}>
              <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="font-bold text-[var(--foreground)] mb-4">معلومات سريعة</h3>
                <div className="space-y-3 text-sm">
                  {factory.location && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">الموقع</span>
                      <span className="font-medium text-[var(--foreground)]">{factory.location}</span>
                    </div>
                  )}
                  {factory.hours && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">ساعات التدريب</span>
                      <span className="font-medium text-[var(--foreground)]">{factory.hours} ساعة</span>
                    </div>
                  )}
                  {factory.price && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">المكافأة</span>
                      <span className="font-medium text-[var(--primary)]">{factory.price}</span>
                    </div>
                  )}
                  {internships.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">فرص التدريب</span>
                      <span className="font-medium text-[var(--foreground)]">{internships.length} فرصة</span>
                    </div>
                  )}
                </div>
              </div>
            </StitchLoop>

            {/* Back Link */}
            <StitchLoop index={7}>
              <Link href="/factories">
                <Button variant="ghost" className="w-full gap-2 text-sm">
                  <ArrowRight className="w-4 h-4" />
                  العودة لدليل المصانع
                </Button>
              </Link>
            </StitchLoop>
          </div>
        </div>
      </StitchSection>
    </div>
  );
}
