import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-08',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

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
      department
    }`;
    
    const student = await writeClient.fetch(query, { phone });

    if (!student) {
      return NextResponse.json(
        { error: 'رقم الهاتف غير مسجل. يرجى إنشاء حساب جديد.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        governorate: student.governorate,
        academicYear: student.academicYear,
        department: student.department,
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
