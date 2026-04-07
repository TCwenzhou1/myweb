import { loadLabVocabulary } from '@/lib/server/loadLabVocabulary'

export const revalidate = 3600

export async function GET() {
  const payload = await loadLabVocabulary()
  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
