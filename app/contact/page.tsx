import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact | TCwenzhou',
  description: '片尾字幕 · 档案封存',
}

export default function ContactPage() {
  return <ContactContent />
}
