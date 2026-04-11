import LabPageClient from './LabPageClient'
import { searchLabVocabulary } from '@/lib/server/loadLabVocabulary'

export default async function LabPage() {
  const initialLibrary = await searchLabVocabulary({
    keyword: '',
    source: 'all',
    level: 'ALL',
    page: 1,
    pageSize: 14,
  })

  return <LabPageClient initialLibrary={initialLibrary} />
}