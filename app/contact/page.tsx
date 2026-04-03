import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: '联系',
  description: '联系 TCwenzhou，发起合作、交流或项目讨论。',
}

export default function ContactPage() {
  return <ContactContent />
}
