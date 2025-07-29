'use client'

import './globals.css'
import React from 'react'
import { StoreProvider } from '@/app/StoreProvider'
import { AuthProvider } from '@/lib/feature/auth/ui/AuthProvider'
import { AlertProvider } from '@/components/ui/Alert/AlertProvider'
import { Header } from '@/components/ui/header/Header'
import { Sidebar } from '@/components/ui/sidebar/Sidebar'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <div id='alert-root' />
        <StoreProvider>
          <AuthProvider>
            <Content>{children}</Content>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <AlertProvider>
      <Header />
      <div className='max-w-[1920px]'>
        <div className='flex'>
          {isAuth && <Sidebar />}
          <main className={`${isAuth ? 'ml-[220px]' : ''} w-full px-6 pt-[96px]`}>{children}</main>
        </div>
      </div>
    </AlertProvider>
  )
}
