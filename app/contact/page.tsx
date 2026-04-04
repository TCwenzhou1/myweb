import type { Metadata } from 'next'
import ContactContentV2 from '@/components/ContactContentV2'

export const metadata: Metadata = {
  title: 'Contact TCwenzhou',
  description: 'Reach out about AI applications, learning products, prototypes, collaboration, or internships.',
}

export default function ContactPage() {
  return <ContactContentV2 />
}
