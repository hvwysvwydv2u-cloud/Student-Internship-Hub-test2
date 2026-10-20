import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { getSession, requireOwnership } from '@/lib/auth';

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
    // ── 1. Verify authenticated session ────────────────────────
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح — يرجى تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, governorate, academicYear, department, completedHours, skills, avatar } = body;

    if (!id && !name) {
      return NextResponse.json(
        { error: 'بيانات المستخدم غير مكتملة' },
        { status: 400 }
      );
    }

    // ── 2. Enforce ownership: user can only update their OWN profile ──
    const targetId = id || session.uid;
    const ownership = requireOwnership(session, targetId, { allowAdminWrite: false });
    if (!ownership.allowed) {
      return NextResponse.json(
        { error: ownership.error },
        { status: ownership.status }
      );
    }

    // ── 3. Gracefully handle environments without Sanity write token ──
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json({
        success: true,
        user: {
          id: targetId,
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

    // ── 4. Build and execute Sanity patch ──────────────────────
    const patchPayload = {};
    if (name) patchPayload.name = name;
    if (governorate) patchPayload.governorate = governorate;
    if (academicYear) patchPayload.academicYear = academicYear;
    if (department) patchPayload.department = department;
    if (completedHours !== undefined) patchPayload.completedHours = Number(completedHours) || 0;
    if (skills !== undefined) patchPayload.skills = Array.isArray(skills) ? skills : [];
    if (avatar !== undefined) patchPayload.avatar = avatar;

    // SECURITY: Never allow role to be changed via this endpoint
    // Role changes can only be done directly in Sanity Studio by an admin.

    const updatedStudent = await getWriteClient()
      .patch(targetId)
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
