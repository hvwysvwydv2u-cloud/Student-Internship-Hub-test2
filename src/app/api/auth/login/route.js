import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { setSessionCookie, ROLES } from '@/lib/auth';

function getWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });
}

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'رقم الهاتف مطلوب لتسجيل الدخول' },
        { status: 400 }
      );
    }

    // البحث عن الطالب في Sanity باستخدام رقم الهاتف
    const query = `*[_type == "student" && phone == $phone][0]{
      _id,
      name,
      phone,
      governorate,
      academicYear,
      department,
      completedHours,
      skills,
      avatar,
      role
    }`;
    
    const student = await getWriteClient().fetch(query, { phone });

    if (!student) {
      return NextResponse.json(
        { error: 'رقم الهاتف غير مسجل. يرجى إنشاء حساب جديد.' },
        { status: 404 }
      );
    }

    const role = student.role || ROLES.STUDENT;

    // Set secure httpOnly session cookie
    await setSessionCookie(student._id, role);

    return NextResponse.json({
      success: true,
      user: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        governorate: student.governorate,
        academicYear: student.academicYear,
        department: student.department,
        completedHours: student.completedHours || 0,
        skills: student.skills || [],
        avatar: student.avatar || null,
        role,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}
