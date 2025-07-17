'use client'

import { Button } from '@/components/ui/button/Button'
import { DatePicker } from '@/components/ui/DatePicker/DatePicker'
import { Input } from '@/components/ui/input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs/Tabs'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { cityList, countriesData } from '@/constants/countries&cities'
import { useGetProfileQuery } from '@/lib/feature/profile/api/profileApi'
import { useEffect, useState } from 'react'
import { AddProfilePhoto } from './AddProfilePhoto'

type Country = keyof typeof cityList // 'Belarus' | 'Poland' | 'Russia' | 'UK'

const GeneralInformation = () => {
  const { data: profile } = useGetProfileQuery()
  const [countryValue, setCountryValue] = useState<Country>('Belarus') // добавить default значение, если заполнено
  const [cityValue, setCityValue] = useState<string>('Minsk') // добавить default значение, если заполнено
  const [aboutMeValue, setAboutMeValue] = useState<string | undefined>(profile?.aboutMe)

  console.log(profile)

  const handleCountryChange = (value: Country) => {
    setCountryValue(value)
    setCityValue('')
  }

  useEffect(() => {
    if (cityList[countryValue].length > 0) {
      setCityValue(cityList[countryValue][0].title)
    }
  }, [countryValue])

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
          <div className={`flex w-[972px] gap-9`}>
            {/*Ширину, возможно, поменять в будущем, без хардкода*/}
            {/*Основной контент*/}
            <AddProfilePhoto />
            <form action='#' className='w-full'>
              {/*Форма. Добавить аттрибуты*/}
              <div className='flex w-[740px] flex-col gap-6'>
                {/*Див для остальных полей ввода*/}
                <Input label='Username*' placeholder={profile?.userName || ''} />
                {/*Сделать звездочку красной, как обязательное поле для ввода(не может быть пустым при первом заполнении)*/}
                <Input label='First Name*' placeholder={profile?.firstName || ''} />
                <Input label='Last Name*' placeholder={profile?.lastName || ''} />
                <DatePicker title='Date of birth' isOnlySingleMode={true} />
                <div className='flex items-center gap-6'>
                  {/*Див для селектов*/}

                  <Select
                    items={countriesData}
                    title='Select your country'
                    placeholder='Country'
                    value={countryValue}
                    onValueChange={handleCountryChange}
                    className='w-[358px]'
                  />
                  {/*Сделать списки взаимосвязанными*/}
                  <Select
                    items={cityList[countryValue]}
                    title='Select your city'
                    placeholder='City'
                    value={cityValue}
                    onValueChange={setCityValue}
                    className='w-[358px]'
                  />
                </div>
                <Textarea
                  value={aboutMeValue}
                  changeValue={() => {
                    setAboutMeValue(aboutMeValue)
                  }}
                  className={'min-h-[85px] w-full'}
                  placeholder='About Me'
                  textareaLabel='About Me'
                  maxLength={200}
                ></Textarea>
                <hr className='border-dark-300 -ml-[232px] flex w-[972px] justify-end self-center border-t' />
                {/*Хардкод с позиционированием. Изменить позже*/}
                <div className='flex justify-end'>
                  {/*Временное решение. Для позиционирования нижней кнопки. Должна остаться в форме, так как для отсылки. Нужно избавиться от дива*/}
                  <Button variant='primary' type='submit' disabled={true}>
                    {/*Заглушка с disabled*/}
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </TabsContent>
        <TabsContent value='Devices'>Devices</TabsContent>
        <TabsContent value='Account Management'>Account Management</TabsContent>
        <TabsContent value='My payments'>My payments</TabsContent>
      </Tabs>
    </div>
  )
}

export default GeneralInformation
