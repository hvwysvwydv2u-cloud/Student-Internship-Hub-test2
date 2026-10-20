"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StitchSection, StitchLoop } from '@/components/stitch-loop';
import { Button, Card, CardContent, Input, Select, Badge } from '@/components/ui';
import { FactoryCard } from '@/components/react-components';
import { SkeletonProfile } from '@/components/skeleton';
import { EmptyState } from '@/components/empty-state';
import { governorates } from '@/data/mockData';
import { client } from '@/sanity/lib/client';
import { useToast } from '@/lib/toast-provider';
import { User, Phone, MapPin, GraduationCap, BookOpen, Save, Edit3, LogOut, CheckCircle, Award, Compass, Plus, Minus, Bookmark, Camera, Trash2, Upload } from 'lucide-react';

export default function ProfilePage() {
  const { toast } = useToast();

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      try { return JSON.parse(stored); } catch { localStorage.removeItem('studentUser'); }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [savingHours, setSavingHours] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return { name: '', governorate: '', academicYear: '', department: '' };
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          name: parsed.name || '',
          governorate: parsed.governorate || '',
          academicYear: parsed.academicYear || '',
          department: parsed.department || '',
        };
      } catch { /* ignore */ }
    }
    return { name: '', governorate: '', academicYear: '', department: '' };
  });
  const [skills, setSkills] = useState(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      try { return JSON.parse(stored).skills || []; } catch { /* ignore */ }
    }
    return [];
  });
  const [newSkill, setNewSkill] = useState('');
  const [completedHours, setCompletedHours] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      try { return Number(JSON.parse(stored).completedHours) || 0; } catch { /* ignore */ }
    }
    return 0;
  });
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    if (user === null) return;
    if (!user && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, [user]);

  const targetHours = 120;

  const fetchRecommendations = useCallback(async (dept) => {
    if (!dept) return;
    try {
      const query = `*[_type == "internship" && $dept in departments]{
        _id, title, "name": title, "slug": slug.current, location, description,
        hours, price, departments, "image": image.asset->url,
        "factoryName": factory->name, "factoryLogo": factory->logo.asset->url
      }[0...3]`;
      const jobs = await client.fetch(query, { dept });
      setRecommendedJobs(jobs);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (user?.department) {
      fetchRecommendations(user.department); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [user?.department, fetchRecommendations]);

  const fileInputRef = useRef(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast('يرجى اختيار ملف صورة صالح (PNG, JPG, WebP)', { type: 'error' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast('حجم الصورة كبير جداً، الحد الأقصى المسموح 5 ميجابايت', { type: 'error' });
      return;
    }

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result;
      if (!base64Image) {
        setUploadingAvatar(false);
        return;
      }

      // 1. Real-time preview & instant local persistence
      const updatedUser = { ...user, avatar: base64Image };
      setUser(updatedUser);
      localStorage.setItem('studentUser', JSON.stringify(updatedUser));

      // 2. Instant backend persistence
      try {
        const res = await fetch('/api/auth/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id || user._id,
            name: formData.name || user.name,
            governorate: formData.governorate || user.governorate,
            academicYear: formData.academicYear || user.academicYear,
            department: formData.department || user.department,
            completedHours,
            skills,
            avatar: base64Image,
          }),
        });
        const data = await res.json();
        if (data.user) {
          const merged = { ...updatedUser, ...data.user, avatar: base64Image };
          setUser(merged);
          localStorage.setItem('studentUser', JSON.stringify(merged));
        }
        toast('تم تحديث الصورة الشخصية بنجاح!', { type: 'success' });
      } catch (err) {
        toast('تم حفظ الصورة بنجاح محلياً', { type: 'success' });
      } finally {
        setUploadingAvatar(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      setUploadingAvatar(false);
      toast('حدث خطأ أثناء قراءة ملف الصورة', { type: 'error' });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    if (uploadingAvatar) return;
    setUploadingAvatar(true);

    // 1. Real-time preview & instant local persistence
    const updatedUser = { ...user, avatar: null, profileImage: null };
    setUser(updatedUser);
    localStorage.setItem('studentUser', JSON.stringify(updatedUser));

    // 2. Instant backend persistence
    try {
      await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id || user._id,
          name: formData.name || user.name,
          governorate: formData.governorate || user.governorate,
          academicYear: formData.academicYear || user.academicYear,
          department: formData.department || user.department,
          completedHours,
          skills,
          avatar: null,
        }),
      });
      toast('تمت إزالة الصورة الشخصية بنجاح', { type: 'info' });
    } catch {
      toast('تمت إزالة الصورة محلياً', { type: 'info' });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    window.location.href = '/login';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, ...formData, completedHours, skills, avatar: user.avatar || user.profileImage || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'حدث خطأ أثناء الحفظ');
      setSuccess('تم تحديث بيانات ملفك الشخصي بنجاح!');
      toast('تم تحديث الملف الشخصي', { type: 'success' });
      const updatedUser = data.user;
      setUser(updatedUser);
      localStorage.setItem('studentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
      fetchRecommendations(updatedUser.department);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      toast(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateHoursInDb = async (newHours) => {
    if (savingHours) return;
    setSavingHours(true);
    try {
      const res = await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, name: formData.name, governorate: formData.governorate, academicYear: formData.academicYear, department: formData.department, completedHours: newHours }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('studentUser', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch {
      // ignore
    } finally {
      setSavingHours(false);
    }
  };

  const adjustHours = (amount) => {
    const val = Math.max(0, Math.min(targetHours, completedHours + amount));
    setCompletedHours(val);
    updateHoursInDb(val);
  };

  if (user === undefined || user === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <SkeletonProfile />
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((completedHours / targetHours) * 100));

  return (
    <StitchSection>
      <div className="max-w-6xl mx-auto space-y-8 text-right" dir="rtl">
        {/* Profile Header */}
        <StitchLoop index={0}>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] p-6 md:p-8 transition-colors" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Avatar with Upload & Remove Controls */}
                <div className="relative group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--surface-elevated)] border-2 border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--primary)] overflow-hidden shadow-sm transition-all group-hover:border-[var(--primary)]/50">
                    {user?.avatar || user?.profileImage ? (
                      <img src={user.avatar || user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--text-muted)]" />
                    )}
                  </div>

                  {/* Camera Quick Button Overlay */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="absolute inset-0 bg-black/55 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer focus:opacity-100"
                    title="تغيير الصورة الشخصية"
                    aria-label="تغيير الصورة الشخصية"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-bold">تغيير</span>
                  </button>

                  <div className="absolute -bottom-1.5 -left-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[10px] px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
                    طالب
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-1">{user.name}</h1>

                  {/* Avatar Upload / Remove Actions */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline cursor-pointer disabled:opacity-50"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{user?.avatar || user?.profileImage ? 'تغيير الصورة' : 'رفع صورة شخصية'}</span>
                    </button>
                    {(user?.avatar || user?.profileImage) && (
                      <>
                        <span className="text-[var(--text-muted)] text-xs">•</span>
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          disabled={uploadingAvatar}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--error)] hover:underline cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إزالة</span>
                        </button>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <Badge variant="primary">الفرقة {user.academicYear}</Badge>
                    <Badge variant="secondary">{user.department}</Badge>
                    <Badge variant="secondary">📍 {user.governorate}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant={isEditing ? 'outline' : 'primary'} onClick={() => setIsEditing(!isEditing)} className="gap-2 text-sm">
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'إلغاء' : 'تعديل'}
                </Button>
                <Button variant="outline" className="text-[var(--error)] border-[var(--error)]/20 hover:bg-[var(--error)]/5 gap-2 text-sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  خروج
                </Button>
              </div>
            </div>
          </div>
        </StitchLoop>

        {/* Feedback Messages */}
        {(error || success) && (
          <StitchLoop index={1}>
            <div className="max-w-xl mx-auto">
              {error && (
                <div className="bg-[var(--error)]/10 border border-[var(--error)]/20 text-[var(--error)] text-sm p-3 rounded-xl text-center font-medium" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-sm p-3 rounded-xl text-center flex items-center justify-center gap-2 font-medium" role="status">
                  <CheckCircle className="w-4 h-4" />
                  {success}
                </div>
              )}
            </div>
          </StitchLoop>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Right Column */}
          <div className="space-y-6">
            {/* Hours Counter */}
            <StitchLoop index={2}>
              <Card>
                <CardContent className="p-6 text-center space-y-5">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                    <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider">ساعات التدريب</span>
                    <Award className="w-5 h-5 text-[var(--primary)]" />
                  </div>

                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle className="text-[var(--surface-elevated)]" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                      <circle className="text-[var(--primary)] transition-all duration-700 ease-out" strokeWidth="8" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - percentage / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-[var(--foreground)]">{completedHours}</span>
                      <span className="text-[var(--text-muted)] text-[10px] font-semibold">من {targetHours} ساعة</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-[var(--text-secondary)]">سجل ساعات التدريب التي أنجزتها.</p>
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => adjustHours(10)} className="w-9 h-9 rounded-full border border-[var(--primary)]/20 bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)]/15 active:scale-90 transition-all" disabled={savingHours || completedHours >= targetHours} aria-label="إضافة 10 ساعات">
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] text-[var(--text-muted)] font-bold">10 ساعات</span>
                      <button onClick={() => adjustHours(-10)} className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] flex items-center justify-center hover:bg-[var(--primary-subtle)] active:scale-90 transition-all" disabled={savingHours || completedHours <= 0} aria-label="خصم 10 ساعات">
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-full bg-[var(--surface-elevated)] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-medium">
                      <span>البداية</span>
                      <span className="text-[var(--primary)] font-bold">{percentage}%</span>
                      <span>الهدف ({targetHours} س)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StitchLoop>

            {/* Quick Actions */}
            <StitchLoop index={3}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold border-b border-[var(--border)] pb-3 text-[var(--foreground)] text-sm">إجراءات سريعة</h4>
                  <div className="space-y-2">
                    <Button variant="secondary" className="w-full py-2.5 text-sm" onClick={() => window.location.href = '/matching'}>
                      المطابقة الذكية
                    </Button>
                    <Button variant="outline" className="w-full py-2.5 text-sm gap-2" onClick={() => window.location.href = '/saved'}>
                      <Bookmark className="w-4 h-4" />
                      Opportunities saved
                    </Button>
                    <Button variant="outline" className="w-full py-2.5 text-sm" onClick={() => window.location.href = '/search'}>
                      البحث عن فرص جديدة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StitchLoop>
          </div>

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <StitchLoop index={4}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-5 pb-3 border-b border-[var(--border)] text-[var(--foreground)]">بيانات الطالب</h3>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[var(--primary)]" />
                          الاسم الكامل
                        </label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!isEditing} required className={!isEditing ? "bg-transparent border-[var(--border)] text-[var(--foreground)] opacity-80" : ""} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[var(--primary)]" />
                          رقم الهاتف
                        </label>
                        <Input value={user.phone} disabled className="bg-transparent border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                          المحافظة
                        </label>
                        <Select options={governorates} value={formData.governorate} onChange={(e) => setFormData({ ...formData, governorate: e.target.value })} disabled={!isEditing} required className={!isEditing ? "bg-transparent border-[var(--border)] text-[var(--foreground)]" : ""} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[var(--primary)]" />
                          السنة الدراسية
                        </label>
                        <Select options={["الأولى", "الثانية", "الثالثة", "الرابعة"]} value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })} disabled={!isEditing} required className={!isEditing ? "bg-transparent border-[var(--border)] text-[var(--foreground)]" : ""} />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
                          القسم الدراسي
                        </label>
                        <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} disabled={!isEditing} required className={!isEditing ? "bg-transparent border-[var(--border)] text-[var(--foreground)]" : ""} />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="space-y-1.5">
                        <label className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[var(--primary)]" />
                          المهارات
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="gap-1">
                              {skill}
                              <button type="button" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="text-[var(--error)] hover:text-[var(--error)]/80 ml-1">&times;</button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="أضف مهارة..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newSkill.trim()) {
                                e.preventDefault();
                                setSkills([...skills, newSkill.trim()]);
                                setNewSkill('');
                              }
                            }}
                          />
                          <Button type="button" variant="secondary" onClick={() => { if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(''); } }}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {isEditing && (
                      <div className="pt-3 flex justify-end">
                        <Button type="submit" disabled={loading} loading={loading} className="gap-2">
                          <Save className="w-4 h-4" />
                          حفظ التغييرات
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </StitchLoop>

            {/* Recommendations */}
            <StitchLoop index={5}>
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="text-xl font-bold text-[var(--foreground)]">توصيات تدريبية</h3>
                </div>
                {recommendedJobs.length === 0 ? (
                  <EmptyState
                    icon="compass"
                    title={`لا توجد تدريبات متاحة لقسم ${formData.department}`}
                    description="استمر في تفقد صفحة البحث لمعرفة الفرص الجديدة."
                    actionHref="/search"
                    actionLabel="صفحة البحث"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedJobs.map((job) => (
                      <FactoryCard
                        key={job._id}
                        {...job}
                        name={job.title || job.name}
                        logo={job.image || job.logo || job.factoryLogo}
                        factoryName={job.factoryName}
                      />
                    ))}
                  </div>
                )}
              </div>
            </StitchLoop>
          </div>
        </div>
      </div>
    </StitchSection>
  );
}
