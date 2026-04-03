import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TCwenzhou',
    short_name: 'TCwenzhou',
    description: 'TCwenzhou 的个人主页，记录项目、实验和长期成长。',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5EE',
    theme_color: '#F8F5EE',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
