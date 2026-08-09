"use client";

import React from "react";
import { cn } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";
import {
  Search,
  Briefcase,
  Building2,
  Home,
  User,
  FileText,
  Compass,
  AlertCircle,
} from "lucide-react";

const icons = {
  search: Search,
  internship: Briefcase,
  factory: Building2,
  housing: Home,
  profile: User,
  document: FileText,
  compass: Compass,
  default: AlertCircle,
};

export function EmptyState({
  icon = "default",
  title,
  description,
  action,
  actionHref,
  actionLabel,
  className,
}) {
  const Icon = icons[icon] || icons.default;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
      dir="rtl"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--primary-subtle)] flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[var(--primary)]" />
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {(actionHref || action) && (
        <div>
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary" size="sm">
                {actionLabel || "العودة للرئيسية"}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="sm" onClick={action}>
              {actionLabel || "العودة للرئيسية"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
