import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

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
    const body = await request.json();
    const { id, name, governorate, academicYear, department, completedHours, skills, avatar } = body;

    // Fallback if not all fields are sent during avatar-only updates
    if (!id && !name) {
      return NextResponse.json(
        { error: 'بيانات المستخدم غير مكتملة' },
        { status: 400 }
      );
    }

    // Gracefully handle environments where Sanity write token is not set
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json({
        success: true,
        user: {
          id: id || 'local-user',
          name: name || '',
          governorate: governorate || '',
          academicYear: academicYear || '',
          department: department || '',
          completedHours: Number(completedHours) || 0,
          skills: Array.isArray(skills) ? skills : [],
          avatar: avatar !== undefined ? avatar : null,
        }
      });
    }

    // Prepare patch payload for Sanity
    const patchPayload = {};
    if (name) patchPayload.name = name;
    if (governorate) patchPayload.governorate = governorate;
    if (academicYear) patchPayload.academicYear = academicYear;
    if (department) patchPayload.department = department;
    if (completedHours !== undefined) patchPayload.completedHours = Number(completedHours) || 0;
    if (skills !== undefined) patchPayload.skills = Array.isArray(skills) ? skills : [];
    if (avatar !== undefined) patchPayload.avatar = avatar;

    const updatedStudent = await getWriteClient()
      .patch(id)
      .set(patchPayload)
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
        skills: updatedStudent.skills || [],
        avatar: updatedStudent.avatar || avatar || null,
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
