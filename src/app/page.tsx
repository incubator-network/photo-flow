'use client'

import { DatePicker } from '@/components/ui/DatePicker/DatePicker'

export default function Home() {
  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <DatePicker />
      <div className={'bg-danger-700 text-h1 mt-20 text-center font-sans'}>
        Hello this a test string
      </div>
    </div>
  )
}
