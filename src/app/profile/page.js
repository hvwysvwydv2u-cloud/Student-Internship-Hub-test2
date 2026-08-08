"use client";

import React, { useState, useEffect } from 'react';
import { StitchSection, StitchLoop } from '@/components/stitch-loop';
import { Button, Card, CardContent, Input, Select, Badge } from '@/components/ui';
import { FactoryCard } from '@/components/react-components';
import { governorates } from '@/data/mockData';
import { client } from '@/sanity/lib/client';
import { User, Phone, MapPin, GraduationCap, BookOpen, Save, Edit3, LogOut, CheckCircle, Award, Compass, Plus, Minus } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    governorate: '',
    academicYear: '',
    department: '',
  });
  const [completedHours, setCompletedHours] = useState(0);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingHours, setSavingHours] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const targetHours = 120; // 120 hours target as requested

  useEffect(() => {
    const stored = localStorage.getItem('studentUser');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      setCompletedHours(Number(parsedUser.completedHours) || 0);
      setFormData({
        name: parsedUser.name || '',
        governorate: parsedUser.governorate || '',
        academicYear: parsedUser.academicYear || '',
        department: parsedUser.department || '',
      });
      fetchRecommendations(parsedUser.department);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchRecommendations = async (dept) => {
    if (!dept) return;
    try {
      // جلب فرص التدريب التي تطابق قسم الطالب
      const query = `*[_type == "internship" && $dept in departments]{
        _id,
        title,
        "name": title,
        "slug": slug.current,
        location,
        description,
        hours,
        price,
        departments,
        "image": image.asset->url,
        "factoryName": factory->name,
        "factoryLogo": factory.logo.asset->url
      }[0...3]`;
      const jobs = await client.fetch(query, { dept });
      setRecommendedJobs(jobs);
    } catch (err) {
      console.error("Error fetching recommended internships:", err);
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
        body: JSON.stringify({
          id: user.id,
          ...formData,
          completedHours,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء حفظ البيانات');
      }

      setSuccess('تم تحديث بيانات ملفك الشخصي بنجاح!');
      const updatedUser = data.user;
      setUser(updatedUser);
      localStorage.setItem('studentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
      fetchRecommendations(updatedUser.department);

      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (err) {
      setError(err.message);
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
        body: JSON.stringify({
          id: user.id,
          name: formData.name,
          governorate: formData.governorate,
          academicYear: formData.academicYear,
          department: formData.department,
          completedHours: newHours,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('studentUser', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to update hours:", err);
    } finally {
      setSavingHours(false);
    }
  };

  const adjustHours = (amount) => {
    const val = Math.max(0, Math.min(targetHours, completedHours + amount));
    setCompletedHours(val);
    updateHoursInDb(val);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse font-medium">جاري تحميل بيانات الملف الشخصي...</div>
      </div>
    );
  }

  // حساب النسبة المئوية للساعات المنجزة
  const percentage = Math.min(100, Math.round((completedHours / targetHours) * 100));

  return (
    <StitchSection>
      <div className="max-w-6xl mx-auto space-y-10 text-right" dir="rtl">
        {/* Custom Header Layout */}
        <StitchLoop index={0}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-[#121815] via-[#0c0d0d] to-black border border-green-500/10 p-8 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-500/5 border border-green-500/30 rounded-2xl flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(0,255,136,0.15)]">
                    <User className="w-12 h-12" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-green-500 text-black font-black text-xs px-2.5 py-1 rounded-lg">
                    طالب
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2.5">{user.name}</h1>
                  <div className="flex flex-wrap gap-2.5">
                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-3 py-1 rounded-full font-semibold">
                      الفرقة {user.academicYear}
                    </span>
                    <span className="bg-white/5 text-white/70 border border-white/10 text-xs px-3 py-1 rounded-full font-medium">
                      {user.department}
                    </span>
                    <span className="bg-white/5 text-white/70 border border-white/10 text-xs px-3 py-1 rounded-full font-medium">
                      📍 {user.governorate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  variant={isEditing ? 'outline' : 'primary'} 
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2 px-5 py-2.5 rounded-xl text-sm"
                >
                  <Edit3 className="w-4.5 h-4.5" />
                  <span>{isEditing ? 'إلغاء التعديل' : 'تعديل الملف الشخصي'}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-400 border-red-500/10 hover:bg-red-500/5 gap-2 px-5 py-2.5 rounded-xl text-sm" 
                  onClick={handleLogout}
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>خروج</span>
                </Button>
              </div>
            </div>
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </StitchLoop>

        {/* Global Feedback Messages */}
        {(error || success) && (
          <StitchLoop index={1}>
            <div className="max-w-xl mx-auto">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-2xl text-center font-medium">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-4 rounded-2xl text-center flex items-center justify-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {success}
                </div>
              )}
            </div>
          </StitchLoop>
        )}

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Right Column: Custom Progress Circle & Action Hub */}
          <div className="space-y-8">
            {/* Hours Counter Card (Custom styled, organic look) */}
            <StitchLoop index={2}>
              <Card className="overflow-hidden border border-green-500/15 relative bg-gradient-to-b from-[#111111] to-[#080808]">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-wider">ساعات التدريب العملي</span>
                    <Award className="w-5 h-5 text-green-500" />
                  </div>

                  {/* Circle SVG Progress Meter */}
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        className="text-white/5" 
                        strokeWidth="8" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                      />
                      <circle 
                        className="text-green-500 transition-all duration-700 ease-out" 
                        strokeWidth="8" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - percentage / 100)}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white">{completedHours}</span>
                      <span className="text-white/40 text-xs font-semibold">من {targetHours} ساعة</span>
                    </div>
                  </div>

                  {/* Custom Controls */}
                  <div className="space-y-4">
                    <p className="text-sm text-white/60">سجل عدد ساعات التدريب التي أنجزتها للوصول لهدفك.</p>
                    
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => adjustHours(10)} 
                        className="w-10 h-10 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 flex items-center justify-center hover:bg-green-500/10 active:scale-90 transition-all"
                        disabled={savingHours || completedHours >= targetHours}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <span className="text-xs text-white/40 font-bold">10 ساعات</span>
                      <button 
                        onClick={() => adjustHours(-10)} 
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                        disabled={savingHours || completedHours <= 0}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-white/40 font-medium">
                      <span>البداية</span>
                      <span className="text-green-500 font-bold">{percentage}% مكتمل</span>
                      <span>الهدف ({targetHours} س)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StitchLoop>

            {/* Application Quick Access */}
            <StitchLoop index={3}>
              <Card>
                <CardContent className="p-8 space-y-6">
                  <h4 className="font-bold border-b border-white/5 pb-4 text-white">إجراءات سريعة</h4>
                  <div className="space-y-3">
                    <Button variant="secondary" className="w-full py-3 rounded-xl font-bold" onClick={() => window.location.href = '/matching'}>
                      المطابقة الذكية للتدريب
                    </Button>
                    <Button variant="outline" className="w-full py-3 rounded-xl font-medium" onClick={() => window.location.href = '/search'}>
                      البحث عن فرص جديدة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StitchLoop>
          </div>

          {/* Left Column (2 Span): Profile Details Form & Recommendations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Fields Card */}
            <StitchLoop index={4}>
              <Card className="border border-white/5">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/5">بيانات الطالب</h3>

                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-green-500" />
                          الاسم الكامل
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          required
                          className={!isEditing ? "bg-transparent border-white/5 text-white opacity-85 select-none" : "border-green-500/30"}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-green-500" />
                          رقم الهاتف (معرّف تسجيل الدخول)
                        </label>
                        <Input
                          value={user.phone}
                          disabled
                          className="bg-transparent border-white/5 text-white/50 cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-green-500" />
                          المحافظة
                        </label>
                        <Select
                          options={governorates}
                          value={formData.governorate}
                          onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                          disabled={!isEditing}
                          required
                          className={!isEditing ? "bg-transparent border-white/5 text-white opacity-85 appearance-none" : "border-green-500/30"}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-green-500" />
                          السنة الدراسية
                        </label>
                        <Select
                          options={["الأولى", "الثانية", "الثالثة", "الرابعة"]}
                          value={formData.academicYear}
                          onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                          disabled={!isEditing}
                          required
                          className={!isEditing ? "bg-transparent border-white/5 text-white opacity-85 appearance-none" : "border-green-500/30"}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs text-white/40 font-bold flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-green-500" />
                          القسم الدراسي
                        </label>
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          disabled={!isEditing}
                          required
                          className={!isEditing ? "bg-transparent border-white/5 text-white opacity-85 select-none" : "border-green-500/30"}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={loading} className="gap-2 px-6 py-2.5 rounded-xl">
                          <Save className="w-4 h-4" />
                          <span>{loading ? 'جاري حفظ التغييرات...' : 'حفظ التغييرات'}</span>
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </StitchLoop>

            {/* Custom Organic Recommendation Section based on student department */}
            <StitchLoop index={5}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-6 h-6 text-green-500" />
                  <h3 className="text-2xl font-black text-white">توصيات تدريبية لقسم {formData.department}</h3>
                </div>

                {recommendedJobs.length === 0 ? (
                  <div className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center text-white/35">
                    لا توجد تدريبات متاحة حالياً متطابقة تماماً مع قسم {formData.department}، استمر في تفقد صفحة البحث.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
