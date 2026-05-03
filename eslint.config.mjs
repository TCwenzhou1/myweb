import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: [
      '.next/**',
      '.codex-main-publish/**',
      '.codex-main-sync/**',
      'node_modules/**',
      'public/company-agent-office/**',
      '**/*_backup.ts',
      '**/*_backup.tsx',
    ],
  },
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
