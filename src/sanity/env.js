export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-08'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Public project ID (also in sanity.cli.ts). Not a secret; used so the
// Next.js build can resolve the Sanity client when env vars are missing.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vxnowrpr'

export const useCdn = false
