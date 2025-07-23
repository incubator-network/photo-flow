'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs/Tabs'
import { GeneralInformation } from '@/lib/feature/profile/ui/components/profile/GeneralInformation/GeneralInformation'
import { MyPayments } from '@/lib/feature/profile/ui/components/profile/MyPayments/MyPayments'

const ProfileSetings = () => {
  return (
    <div className='mb-[26px] pt-9'>
      {/*Поменять на семантические теги*/}
      <Tabs defaultValue='General information'>
        <TabsList className='flex w-[972px]'>
          <TabsTrigger value='General information' className='flex-1'>
            General information
          </TabsTrigger>
          <TabsTrigger value='Devices' className='flex-1'>
            Devices
          </TabsTrigger>
          <TabsTrigger value='Account Management' className='flex-1'>
            Account Management
          </TabsTrigger>
          <TabsTrigger value='My payments' className='flex-1'>
            My payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value='General information'>
          <GeneralInformation />
        </TabsContent>
        <TabsContent value='Devices'>Devices</TabsContent>
        <TabsContent value='Account Management'>Account Management</TabsContent>
        <TabsContent value='My payments'>
          <MyPayments />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileSetings
