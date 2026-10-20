/**
 * Server-side Auth Utility — JWT Session + RBAC
 * ================================================
 * Issues signed httpOnly cookies on login/register.
 * Every protected API route calls `getSession(request)` to verify the caller.
 * `requireOwnership(session, targetId)` enforces that a user can only modify their own profile.
 *
 * Roles:
 *   "student" (default) — can only read/write own data
 *   "admin"             — can view/manage all profiles (read), but cannot modify another user's avatar/profile unless explicitly allowed
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// ── Secret ──────────────────────────────────────────────────
// Falls back to a deterministic key derived from the Sanity project ID
// In production, always set AUTH_SECRET in your env vars.
const SECRET_STRING = process.env.AUTH_SECRET || process.env.SANITY_API_WRITE_TOKEN || 'trainlink-hub-default-secret-change-me';
const SECRET = new TextEncoder().encode(SECRET_STRING);

const COOKIE_NAME = 'trainlink_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// ── Roles ───────────────────────────────────────────────────
export const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
};

// ── Create a signed JWT ─────────────────────────────────────
export async function createSessionToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(SECRET);
}

// ── Set session cookie ──────────────────────────────────────
export async function setSessionCookie(userId, role = ROLES.STUDENT) {
  const token = await createSessionToken({ uid: userId, role });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return token;
}

// ── Clear session cookie (logout) ───────────────────────────
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// ── Read & verify session from request ──────────────────────
// Returns { uid, role } or null if invalid/missing.
export async function getSession(request) {
  try {
    // Try cookie first
    let token;
    if (request) {
      // NextRequest has cookies() method
      token = request.cookies?.get(COOKIE_NAME)?.value;
    }

    // Fallback: read from Authorization header (for programmatic clients)
    if (!token && request) {
      const authHeader = request.headers?.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }

    if (!token) return null;

    const { payload } = await jwtVerify(token, SECRET);
    if (!payload.uid) return null;

    return {
      uid: payload.uid,
      role: payload.role || ROLES.STUDENT,
    };
  } catch {
    return null;
  }
}

// ── Ownership guard ─────────────────────────────────────────
// Ensures the authenticated user can only modify their OWN profile.
// Admins CAN view other profiles but CANNOT modify avatar/profile of others.
export function requireOwnership(session, targetUserId, { allowAdminWrite = false } = {}) {
  if (!session) {
    return { allowed: false, status: 401, error: 'غير مصرح — يرجى تسجيل الدخول أولاً' };
  }

  // Owner always has access to their own data
  if (session.uid === targetUserId) {
    return { allowed: true };
  }

  // Admin can write only if explicitly allowed
  if (session.role === ROLES.ADMIN && allowAdminWrite) {
    return { allowed: true };
  }

  // Admin can read but not write by default
  if (session.role === ROLES.ADMIN) {
    return { allowed: false, status: 403, error: 'المسؤول لا يملك صلاحية تعديل بيانات مستخدم آخر' };
  }

  return { allowed: false, status: 403, error: 'غير مسموح — لا يمكنك تعديل بيانات مستخدم آخر' };
}

// ── Admin-only guard ────────────────────────────────────────
export function requireAdmin(session) {
  if (!session) {
    return { allowed: false, status: 401, error: 'غير مصرح — يرجى تسجيل الدخول أولاً' };
  }
  if (session.role !== ROLES.ADMIN) {
    return { allowed: false, status: 403, error: 'هذا الإجراء متاح فقط للمسؤولين' };
  }
  return { allowed: true };
}
