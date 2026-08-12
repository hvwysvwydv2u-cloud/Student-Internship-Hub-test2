"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, MapPin, Clock, Briefcase, Phone, User, LogIn, Moon, Sun, Home, Menu, X, Heart } from 'lucide-react';
import { Button, Card, CardContent, Input, Select, Badge, Progress, Avatar, Tabs, cn, Label } from './ui';
import { useTheme } from '@/lib/theme-provider';
import { useToast } from '@/lib/toast-provider';
import { governorates, departments } from '../data/mockData';

/* ============================================================
   THEME TOGGLE BUTTON
   ============================================================ */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] transition-colors"
      aria-label={theme === 'dark' ? 'التبديل للوضع النهاري' : 'التبديل للوضع الليلي'}
    >
      {theme === 'dark' ? (
        <Sun className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
      ) : (
        <Moon className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
      )}
    </button>
  );
};

/* ============================================================
   NAVBAR
   ============================================================ */
export const NavBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      try { return JSON.parse(stored); } catch { localStorage.removeItem('studentUser'); }
    }
    return null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'البحث', path: '/search' },
    { name: 'فرص التدريب', path: '/internship-opportunities' },
    { name: 'المطابقة', path: '/matching' },
    { name: 'السكن', path: '/housing' },
    { name: 'المصانع', path: '/factories' },
  ];

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b transition-colors duration-200"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'var(--nav-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center rotate-12">
              <Briefcase className="text-white w-4.5 h-4.5 -rotate-12" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              TRAIN<span className="text-[var(--primary)]">LINK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative px-3 py-2 rounded-lg",
                  pathname === link.path
                    ? "text-[var(--primary)] bg-[var(--primary-subtle)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--primary-subtle)]/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--primary-subtle)] transition-colors"
                >
                  <User className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">{user.name}</span>
                </Link>
                <Button size="sm" variant="ghost" className="text-[var(--error)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 px-3" onClick={handleLogout}>
                  خروج
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>دخول</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] transition-colors"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--foreground)]" /> : <Menu className="w-5 h-5 text-[var(--foreground)]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.path
                    ? "text-[var(--primary)] bg-[var(--primary-subtle)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--primary-subtle)]/50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] pt-2 mt-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                    <User className="w-4 h-4 text-[var(--primary)]" />
                    {user.name}
                  </Link>
                  <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-[var(--error)]">
                    خروج
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>دخول</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

/* ============================================================
   BOTTOM NAV (Mobile Only)
   ============================================================ */
const bottomNavLinks = [
  { name: 'الرئيسية', path: '/', icon: Home },
  { name: 'البحث', path: '/search', icon: Search },
  { name: 'التدريب', path: '/internship-opportunities', icon: Briefcase },
  { name: 'المحفوظات', path: '/saved', icon: Heart },
  { name: 'حسابي', path: '/profile', icon: User },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t transition-colors duration-200 pb-safe"
      style={{
        backgroundColor: 'var(--bottom-nav-bg)',
        borderColor: 'var(--bottom-nav-border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      dir="rtl"
      role="navigation"
      aria-label="التنقل السفلي"
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {bottomNavLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              )}
            >
              <link.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-semibold leading-none">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

/* ============================================================
   HERO SECTION
   ============================================================ */
export const HeroSection = ({ title, subtitle }) => (
  <div className="relative py-16 md:py-24 overflow-hidden" dir="rtl">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-glow)_0%,_transparent_60%)]" />
    <div className="relative max-w-4xl mx-auto text-center px-6">
      <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight text-[var(--foreground)]">
        {title} <br />
        <span className="text-[var(--primary)]">للمستقبل</span>
      </h1>
      <p className="text-base md:text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
        {subtitle || "ترين لينك — تعلم. تدرب. اشتغل. منصة تربط بين الطلاب المتميزين وأكبر المصانع والشركات الصناعية في مصر."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/search">
          <Button size="lg" className="w-full sm:w-auto">ابدأ البحث الآن</Button>
        </Link>
        <Link href="/matching">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">جرب المطابقة الذكية</Button>
        </Link>
      </div>
    </div>
  </div>
);

/* ============================================================
   FACTORY CARD
   ============================================================ */
export const FactoryCard = ({ name, hours, location, department, matchScore, description, contact, departments, price, logo, factoryName, isSaved, onToggleSave, slug }) => (
  <Card className="group hover:border-[var(--primary)]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--card-shadow-hover)]" dir="rtl">
    <CardContent className="p-5">
      <div className="flex justify-between items-start mb-3">
        <Avatar src={logo} fallback={name?.substring(0, 2)} size="lg" />
        <div className="flex items-center gap-2">
          {matchScore && (
            <Badge variant="outline" className="mb-1">{matchScore}% تطابق</Badge>
          )}
          {onToggleSave && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSave(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--primary-subtle)] transition-colors"
              aria-label={isSaved ? "إزالة من المحفوظات" : "حفظ"}
            >
              <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[var(--primary)] text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--primary)] transition-colors text-[var(--foreground)]">{name}</h3>
      {factoryName && <p className="text-sm text-[var(--text-muted)] mb-2 font-medium">{factoryName}</p>}

      <div className="space-y-2 mb-4">
        {location && (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span>{location}</span>
          </div>
        )}
        {hours && (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span>{hours} ساعة تدريبية</span>
          </div>
        )}
        {department && (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <Briefcase className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span>{department}</span>
          </div>
        )}
        {price && (
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-sm">
            <span>{price}</span>
          </div>
        )}
      </div>

      {matchScore && (
        <div className="mb-4 space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-[var(--primary)]">
              {matchScore >= 90 ? "تطابق ممتاز" : matchScore >= 75 ? "تطابق جيد" : "تطابق متوسط"}
            </span>
          </div>
          <Progress value={matchScore} />
        </div>
      )}

      {description && <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{description}</p>}

      {departments && departments.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {departments.map(dept => <Badge key={dept} variant="secondary">{dept}</Badge>)}
        </div>
      )}

      <div className="flex gap-2">
        <Link href={slug ? `/internship-opportunities/${slug}` : "/internship-opportunities"} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">تقدم الآن</Button>
        </Link>
        {contact && (
          <a href={`tel:${contact}`}>
            <Button variant="secondary" size="sm" className="px-3" aria-label="اتصال">
              <Phone className="w-4 h-4" />
            </Button>
          </a>
        )}
      </div>
    </CardContent>
  </Card>
);

/* ============================================================
   HOUSING CARD
   ============================================================ */
export const HousingCard = ({ name, location, price, contact, isComingSoon, image }) => (
  <Card className={cn("relative overflow-hidden transition-all duration-200", isComingSoon && "opacity-60")} dir="rtl">
    {isComingSoon && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--background)]/40 backdrop-blur-[2px]">
        <Badge variant="primary" className="text-base py-1.5 px-5">قريباً</Badge>
      </div>
    )}
    <CardContent className="p-5">
      <div className="h-44 bg-[var(--surface-elevated)] rounded-xl mb-4 flex items-center justify-center border border-[var(--border)] overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <MapPin className="w-10 h-10 text-[var(--text-muted)]/30" />
        )}
      </div>
      <h3 className="text-lg font-bold mb-1 text-[var(--foreground)]">{name}</h3>
      <p className="text-[var(--primary)] text-sm font-medium mb-3">{location}</p>

      <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
        <div>
          <p className="text-[var(--text-muted)] text-xs mb-0.5">السعر التقريبي</p>
          <p className="text-[var(--foreground)] font-bold text-sm">{price}</p>
        </div>
        {!isComingSoon && contact && (
          <a href={`tel:${contact}`}>
            <Button variant="outline" size="sm" className="gap-1.5" aria-label={`الاتصال بـ ${name}`}>
              <Phone className="w-3.5 h-3.5" />
              اتصال
            </Button>
          </a>
        )}
      </div>
    </CardContent>
  </Card>
);

/* ============================================================
   SEARCH BAR
   ============================================================ */
export const SearchBar = ({ value, onChange, onSearch, placeholder }) => (
  <div className="flex gap-2 w-full max-w-2xl mx-auto mb-8" dir="rtl">
    <div className="relative flex-1">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
      <Input
        className="pr-12"
        placeholder={placeholder || "ابحث عن اسم المصنع أو التدريب..."}
        value={value}
        onChange={onChange}
      />
    </div>
    <Button onClick={onSearch} className="px-8">بحث</Button>
  </div>
);

/* ============================================================
   FILTER PANEL
   ============================================================ */
export const FilterPanel = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8" dir="rtl">
    <Select
      options={governorates}
      placeholder="المحافظة"
      value={filters?.governorate || ''}
      onChange={(e) => onFilterChange?.({ ...filters, governorate: e.target.value })}
    />
    <Select
      options={departments}
      placeholder="القسم"
      value={filters?.department || ''}
      onChange={(e) => onFilterChange?.({ ...filters, department: e.target.value })}
    />
    <Select
      options={["40 ساعة", "80 ساعة", "120 ساعة", "160 ساعة", "200+ ساعة"]}
      placeholder="عدد الساعات"
      value={filters?.hours || ''}
      onChange={(e) => onFilterChange?.({ ...filters, hours: e.target.value })}
    />
  </div>
);

/* ============================================================
   MATCH FORM
   ============================================================ */
export const MatchForm = ({ onSubmit }) => (
  <Card className="max-w-xl mx-auto" dir="rtl">
    <CardContent className="p-8 space-y-5">
      <div className="space-y-2">
        <Label>القسم الدراسي</Label>
        <Select options={departments} placeholder="اختر قسمك" />
      </div>
      <div className="space-y-2">
        <Label>الفرقة</Label>
        <Select options={["الأولى", "الثانية", "الثالثة", "الرابعة"]} placeholder="اختر فرقتك" />
      </div>
      <div className="space-y-2">
        <Label>المحافظة المفضلة</Label>
        <Select options={governorates} placeholder="اختر المحافظة" />
      </div>
      <div className="space-y-2">
        <Label>عدد الساعات المطلوب</Label>
        <Input type="number" placeholder="مثال: 120" />
      </div>
      <Button className="w-full py-3 text-base" onClick={onSubmit}>ابحث عن فرصك</Button>
    </CardContent>
  </Card>
);

/* ============================================================
   LOGIN FORM
   ============================================================ */
export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { toast } = useToast();

  const [registerForm, setRegisterForm] = useState({
    name: '', governorate: '', academicYear: '', department: '', phone: '',
  });
  const [loginPhone, setLoginPhone] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'حدث خطأ ما');
      setSuccess('تم إنشاء الحساب بنجاح!');
      toast('تم إنشاء الحساب بنجاح', { type: 'success' });
      localStorage.setItem('studentUser', JSON.stringify(data.user));
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (err) {
      setError(err.message);
      toast(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'حدث خطأ ما');
      setSuccess('تم تسجيل الدخول بنجاح!');
      toast('تم تسجيل الدخول بنجاح', { type: 'success' });
      localStorage.setItem('studentUser', JSON.stringify(data.user));
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (err) {
      setError(err.message);
      toast(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto" dir="rtl">
      <Tabs
        tabs={[{ id: 'register', label: 'تسجيل حساب جديد' }, { id: 'login', label: 'تسجيل الدخول' }]}
        activeTab={activeTab}
        onChange={(tab) => { setActiveTab(tab); setError(''); setSuccess(''); }}
      />
      <Card className="mt-4">
        <CardContent className="p-6">
          {error && (
            <div className="bg-[var(--error)]/10 border border-[var(--error)]/20 text-[var(--error)] text-sm p-3 rounded-xl mb-4 text-center" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-sm p-3 rounded-xl mb-4 text-center" role="status">
              {success}
            </div>
          )}

          {activeTab === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <Label required>الاسم الكامل</Label>
                <Input placeholder="أدخل اسمك الكامل" required value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
              </div>
              <div>
                <Label required>المحافظة</Label>
                <Select options={governorates} placeholder="اختر المحافظة" required value={registerForm.governorate} onChange={(e) => setRegisterForm({ ...registerForm, governorate: e.target.value })} />
              </div>
              <div>
                <Label required>الفرقة</Label>
                <Select options={["الأولى", "الثانية", "الثالثة", "الرابعة"]} placeholder="اختر فرقتك" required value={registerForm.academicYear} onChange={(e) => setRegisterForm({ ...registerForm, academicYear: e.target.value })} />
              </div>
              <div>
                <Label required>القسم</Label>
                <Select options={departments} placeholder="اختر قسمك" required value={registerForm.department} onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })} />
              </div>
              <div>
                <Label required>رقم الهاتف</Label>
                <Input type="tel" placeholder="01XXXXXXXXX" required value={registerForm.phone} onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })} />
              </div>
              <Button type="submit" disabled={loading} loading={loading} className="w-full mt-2">
                إنشاء حساب
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <Label required>رقم الهاتف</Label>
                <Input type="tel" placeholder="أدخل رقم هاتفك المسجل" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} loading={loading} className="w-full mt-2">
                تسجيل الدخول
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

/* ============================================================
   FOOTER
   ============================================================ */
export const Footer = () => (
  <footer className="border-t border-[var(--border)] py-10 px-6 mt-16 pb-24 md:pb-10 transition-colors" dir="rtl" style={{ backgroundColor: 'var(--surface)' }}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center rotate-12">
            <Briefcase className="text-white w-4 h-4 -rotate-12" />
          </div>
          <span className="text-lg font-bold text-[var(--foreground)]">TRAIN<span className="text-[var(--primary)]">LINK</span></span>
        </Link>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">ترين لينك — منصتك الأولى للتدريب الصناعي في مصر.</p>
      </div>
      <div>
        <h4 className="text-[var(--foreground)] font-bold mb-3 text-sm">روابط سريعة</h4>
        <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
          <li><Link href="/search" className="hover:text-[var(--primary)] transition-colors">البحث عن تدريب</Link></li>
          <li><Link href="/housing" className="hover:text-[var(--primary)] transition-colors">البحث عن سكن</Link></li>
          <li><Link href="/matching" className="hover:text-[var(--primary)] transition-colors">المطابقة الذكية</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-[var(--foreground)] font-bold mb-3 text-sm">تواصل معنا</h4>
        <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
          <li>info@trainlink.eg</li>
          <li dir="ltr">+20 100 123 4567</li>
          <li>القاهرة، مصر</li>
        </ul>
      </div>
      <div>
        <h4 className="text-[var(--foreground)] font-bold mb-3 text-sm">اشترك في النشرة</h4>
        <div className="flex gap-2">
          <Input placeholder="بريدك الإلكتروني" className="h-10" />
          <Button size="sm" className="h-10 px-4">اشترك</Button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="text-[var(--text-muted)] text-xs">© 2026 TrainLink. جميع الحقوق محفوظة.</p>
      <div className="flex gap-4 text-[var(--text-muted)] text-xs">
        <a href="#" className="hover:text-[var(--primary)] transition-colors">سياسة الخصوصية</a>
        <a href="#" className="hover:text-[var(--primary)] transition-colors">شروط الخدمة</a>
      </div>
    </div>
  </footer>
);
