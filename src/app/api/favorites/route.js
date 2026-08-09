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

// GET: Fetch saved opportunity IDs for a student
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'studentId مطلوب' }, { status: 400 });
    }

    const client = createClient({ projectId, dataset, apiVersion, useCdn: false });
    const student = await client.fetch(
      `*[_type == "student" && _id == $id][0]{ savedOpportunities }`,
      { id: studentId }
    );

    return NextResponse.json({
      success: true,
      savedIds: student?.savedOpportunities || [],
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json({ error: 'خطأ في جلب البيانات' }, { status: 500 });
  }
}

// POST: Toggle save/unsave an opportunity
export async function POST(request) {
  try {
    const { studentId, opportunityId } = await request.json();

    if (!studentId || !opportunityId) {
      return NextResponse.json(
        { error: 'studentId و opportunityId مطلوبان' },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'مفتاح الكتابة لـ Sanity غير مهيأ' },
        { status: 500 }
      );
    }

    const client = createClient({ projectId, dataset, apiVersion, useCdn: false });
    const student = await client.fetch(
      `*[_type == "student" && _id == $id][0]{ savedOpportunities }`,
      { id: studentId }
    );

    const currentSaved = student?.savedOpportunities || [];
    const isSaved = currentSaved.includes(opportunityId);

    let patch;
    if (isSaved) {
      patch = getWriteClient()
        .patch(studentId)
        .unset([`savedOpportunities[_key == "${opportunityId}"]`]);
    } else {
      patch = getWriteClient()
        .patch(studentId)
        .setIfMissing({ savedOpportunities: [] })
        .append('savedOpportunities', [opportunityId]);
    }

    await patch.commit();

    return NextResponse.json({
      success: true,
      saved: !isSaved,
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return NextResponse.json(
      { error: 'خطأ في تحديث المفضلة' },
      { status: 500 }
    );
  }
}
