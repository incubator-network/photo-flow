'use client'

import { AuthButtons } from '@/features/auth/ui/AuthButtons'

export default function Home() {
  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
      </div>
      <AuthButtons />
    </div>
  )
}
