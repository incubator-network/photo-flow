'use client'

import './globals.css'
import React from 'react'
import { StoreProvider } from '@/app/StoreProvider'
import { AuthProvider } from '@/lib/feature/auth/ui/AuthProvider'
import { AlertProvider } from 'photo-flow-ui-kit'

import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { Header } from 'photo-flow-ui-kit/src/Header'
import { Sidebar } from '@/ui/Sidebar'

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
      <Header isAuth={isAuth} />
      <div className='max-w-[1920px]'>
        <div className='flex'>
          {isAuth && <Sidebar />}
          <main className={`${isAuth ? 'ml-[220px]' : ''} w-full px-6 pt-[96px]`}>{children}</main>
        </div>
      </div>
    </AlertProvider>
  )
}
