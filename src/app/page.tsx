'use client'

import { MyPayment } from '@/entities/profile/settings/myPayment/ui/MyPayment'

export default function Home() {
  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
        <MyPayment />
      </div>
    </div>
  )
}
