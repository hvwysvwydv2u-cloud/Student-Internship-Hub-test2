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
    const { name, phone, governorate, academicYear, department } = await request.json();

    if (!name || !phone || !governorate || !academicYear || !department) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'مفتاح الكتابة لـ Sanity غير مهيأ بعد' },
        { status: 500 }
      );
    }

    // تحقق مما إذا كان رقم الهاتف مسجلاً مسبقاً
    const query = `*[_type == "student" && phone == $phone][0]`;
    const existingStudent = await writeClient.fetch(query, { phone });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'رقم الهاتف هذا مسجل بالفعل' },
        { status: 400 }
      );
    }

    // إنشاء طالب جديد
    const newStudent = {
      _type: 'student',
      name,
      phone,
      governorate,
      academicYear,
      department,
      createdAt: new Date().toISOString(),
    };

    const result = await writeClient.create(newStudent);

    return NextResponse.json({
      success: true,
      user: {
        id: result._id,
        name: result.name,
        phone: result.phone,
        governorate: result.governorate,
        academicYear: result.academicYear,
        department: result.department,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  }
}
