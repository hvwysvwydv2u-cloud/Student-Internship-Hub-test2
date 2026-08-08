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
    const { id, name, governorate, academicYear, department, completedHours } = await request.json();

    if (!id || !name || !governorate || !academicYear || !department) {
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

    // تحديث بيانات الطالب في Sanity
    const updatedStudent = await writeClient
      .patch(id)
      .set({
        name,
        governorate,
        academicYear,
        department,
        completedHours: Number(completedHours) || 0,
      })
      .commit();

    return NextResponse.json({
      success: true,
      user: {
        id: updatedStudent._id,
        name: updatedStudent.name,
        phone: updatedStudent.phone,
        governorate: updatedStudent.governorate,
        academicYear: updatedStudent.academicYear,
        department: updatedStudent.department,
        completedHours: updatedStudent.completedHours || 0,
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات الملف الشخصي' },
      { status: 500 }
    );
  }
}
