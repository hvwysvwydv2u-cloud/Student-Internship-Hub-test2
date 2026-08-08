"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, MapPin, Clock, Briefcase, Phone, User, LogIn, Filter, CheckCircle } from 'lucide-react';
import { Button, Card, CardContent, Input, Select, Badge, Progress, Avatar, Separator, Tabs, cn } from './ui';
import { governorates } from '../data/mockData';

export const NavBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'البحث', path: '/search' },
    { name: 'فرص التدريب', path: '/internship-opportunities' },
    { name: 'المطابقة الذكية', path: '/matching' },
    { name: 'السكن', path: '/housing' },
    { name: 'المصانع', path: '/factories' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20 py-4 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-12">
            <Briefcase className="text-black w-5 h-5 -rotate-12" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">TRAIN<span className="text-green-500">LINK</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium transition-all hover:text-green-500 relative py-1",
                pathname === link.path ? "text-green-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
              <User className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-white">{user.name}</span>
            </Link>
            <Button size="sm" variant="outline" className="text-red-400 hover:text-red-500 border-red-500/20 hover:bg-red-500/10 px-3" onClick={handleLogout}>
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
    </nav>
  );
};

export const HeroSection = ({ title, subtitle }) => (
  <div className="relative py-20 md:py-32 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-background to-background" dir="rtl">
    <div className="max-w-4xl mx-auto text-center px-6">
      <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
        {title} <br/> <span className="text-green-500">للمستقبل</span>
      </h1>
      <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
        {subtitle || "ترين لينك | تعلم. تدرب. اشتغل - منصة تربط بين الطلاب المتميزين وأكبر المصانع والشركات الصناعية في مصر."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

export const FactoryCard = ({ name, hours, location, department, matchScore, description, contact, departments, price, logo, factoryName }) => (
  <Card className="group hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1" dir="rtl">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <Avatar src={logo} fallback={name?.substring(0, 2)} className="h-12 w-12 text-lg" />
        {matchScore && (
          <div className="text-left">
            <Badge variant="outline" className="mb-1">{matchScore}% تطابق</Badge>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-1 group-hover:text-green-500 transition-colors">{name}</h3>
      {factoryName && <p className="text-sm text-white/40 mb-2 font-medium">{factoryName}</p>}
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <MapPin className="w-4 h-4 text-green-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Clock className="w-4 h-4 text-green-500" />
          <span>{hours} ساعة تدريبية</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Briefcase className="w-4 h-4 text-green-500" />
          <span>{department}</span>
        </div>
        {price && (
          <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
            <span>{price}</span>
          </div>
        )}
      </div>

      {matchScore && (
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-green-500">
              {matchScore >= 90 ? "تطابق ممتاز" : matchScore >= 75 ? "تطابق جيد" : "تطابق متوسط"}
            </span>
          </div>
          <Progress value={matchScore} />
        </div>
      )}

      {description && <p className="text-white/40 text-sm mb-6 line-clamp-2">{description}</p>}
      
      {departments && (
        <div className="flex flex-wrap gap-2 mb-6">
          {departments.map(dept => <Badge key={dept}>{dept}</Badge>)}
        </div>
      )}

      <div className="flex gap-2">
        <Link href="/internship-opportunities" className="flex-1">
          <Button variant="primary" size="sm" className="w-full">تقدم الآن</Button>
        </Link>
        {contact && (
          <Button variant="secondary" size="sm" className="px-3">
            <Phone className="w-4 h-4" />
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export const HousingCard = ({ name, location, price, contact, isComingSoon, image }) => (
  <Card className={cn("relative overflow-hidden", isComingSoon && "opacity-60 grayscale")} dir="rtl">
    {isComingSoon && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
        <Badge variant="primary" className="text-lg py-2 px-6">🔜 قريباً</Badge>
      </div>
    )}
    <CardContent className="p-6">
      <div className="h-48 bg-white/5 rounded-lg mb-4 flex items-center justify-center border border-white/5 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <MapPin className="w-12 h-12 text-white/10" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-green-500 text-sm font-medium mb-4">{location}</p>
      
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div>
          <p className="text-white/40 text-xs uppercase mb-1">السعر التقريبي</p>
          <p className="text-white font-bold">{price}</p>
        </div>
        {!isComingSoon && (
          <Button variant="outline" size="sm" className="gap-2">
            <Phone className="w-4 h-4" />
            اتصال
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export const SearchBar = () => (
  <div className="flex gap-2 w-full max-w-2xl mx-auto mb-8" dir="rtl">
    <div className="relative flex-1">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
      <Input className="pr-12" placeholder="ابحث عن اسم المصنع أو التدريب..." />
    </div>
    <Button className="px-8">بحث</Button>
  </div>
);

export const FilterPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10" dir="rtl">
    <Select options={governorates} placeholder="المحافظة" />
    <Select options={["هندسة ميكانيكية", "هندسة كهربائية", "هندسة كيميائية", "هندسة مدنية"]} placeholder="القسم" />
    <Select options={["40 ساعة", "80 ساعة", "120 ساعة", "160 ساعة", "200+ ساعة"]} placeholder="عدد الساعات" />
  </div>
);

export const MatchForm = ({ onSubmit }) => (
  <Card className="max-w-xl mx-auto" dir="rtl">
    <CardContent className="p-8 space-y-6">
      <div className="space-y-4">
        <label className="text-sm text-white/60">القسم الدراسي</label>
        <Select options={["هندسة ميكانيكية", "هندسة كهربائية", "هندسة كيميائية", "هندسة مواد"]} placeholder="اختر قسمك" />
      </div>
      <div className="space-y-4">
        <label className="text-sm text-white/60">السنة الدراسية</label>
        <Select options={["الأولى", "الثانية", "الثالثة", "الرابعة"]} placeholder="اختر سنتك" />
      </div>
      <div className="space-y-4">
        <label className="text-sm text-white/60">المحافظة المفضلة</label>
        <Select options={governorates} placeholder="اختر المحافظة" />
      </div>
      <div className="space-y-4">
        <label className="text-sm text-white/60">عدد الساعات المطلوب</label>
        <Input type="number" placeholder="مثال: 120" />
      </div>
      <Button className="w-full py-4 text-lg" onClick={onSubmit}>ابحث عن تطابق</Button>
    </CardContent>
  </Card>
);

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    governorate: '',
    academicYear: '',
    department: '',
    phone: '',
  });

  // Login Form State
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

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ ما');
      }

      setSuccess('تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...');
      localStorage.setItem('studentUser', JSON.stringify(data.user));
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (err) {
      setError(err.message);
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

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ ما');
      }

      setSuccess('تم تسجيل الدخول بنجاح!');
      localStorage.setItem('studentUser', JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto" dir="rtl">
      <Tabs 
        tabs={[{id: 'register', label: 'تسجيل حساب جديد'}, {id: 'login', label: 'تسجيل الدخول'}]} 
        activeTab={activeTab} 
        onChange={(tab) => {
          setActiveTab(tab);
          setError('');
          setSuccess('');
        }}
      />
      
      <Card className="mt-6 border-white/10">
        <CardContent className="p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          {activeTab === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <Input 
                placeholder="الاسم الكامل" 
                required
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
              />
              <Select 
                options={governorates} 
                placeholder="اختر المحافظة" 
                required
                value={registerForm.governorate}
                onChange={(e) => setRegisterForm({...registerForm, governorate: e.target.value})}
              />
              <Select 
                options={["الأولى", "الثانية", "الثالثة", "الرابعة"]} 
                placeholder="السنة الدراسية" 
                required
                value={registerForm.academicYear}
                onChange={(e) => setRegisterForm({...registerForm, academicYear: e.target.value})}
              />
              <Input 
                placeholder="القسم الدراسي (مثال: هندسة ميكانيكية)" 
                required
                value={registerForm.department}
                onChange={(e) => setRegisterForm({...registerForm, department: e.target.value})}
              />
              <Input 
                type="tel" 
                placeholder="رقم الهاتف (01XXXXXXXXX)" 
                required
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
              />
              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Input 
                type="tel" 
                placeholder="رقم الهاتف المسجل (01XXXXXXXXX)" 
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
              />
              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-12 px-6 mt-20" dir="rtl">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-12">
            <Briefcase className="text-black w-5 h-5 -rotate-12" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">TRAIN<span className="text-green-500">LINK</span></span>
        </Link>
        <p className="text-white/40 text-sm">ترين لينك | تعلم. تدرب. اشتغل - منصتك الأولى للتدريب الصناعي في مصر.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
        <ul className="space-y-2 text-white/60 text-sm">
          <li><Link href="/search" className="hover:text-green-500 transition-colors">البحث عن تدريب</Link></li>
          <li><Link href="/housing" className="hover:text-green-500 transition-colors">البحث عن سكن</Link></li>
          <li><Link href="/matching" className="hover:text-green-500 transition-colors">المطابقة الذكية</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
        <ul className="space-y-2 text-white/60 text-sm">
          <li>info@trainlink.eg</li>
          <li>+20 100 123 4567</li>
          <li>القاهرة، مصر</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">اشترك في النشرة البريدية</h4>
        <div className="flex gap-2">
          <Input placeholder="بريدك الإلكتروني" className="h-10" />
          <Button size="sm" className="h-10 px-4">اشترك</Button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/20 text-xs">© 2026 TrainLink | ترين لينك. جميع الحقوق محفوظة.</p>
      <div className="flex gap-6 text-white/20 text-xs">
        <a href="#" className="hover:text-green-500">سياسة الخصوصية</a>
        <a href="#" className="hover:text-green-500">شروط الخدمة</a>
      </div>
    </div>
  </footer>
);
