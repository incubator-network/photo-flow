'use client'

import { Button } from '@/components/ui/button/Button'
import { DatePicker } from '@/components/ui/DatePicker/DatePicker'
import { Input } from '@/components/ui/input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs/Tabs'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { cityList, countriesList, Country } from '@/constants/countries&cities'
import { useGetProfileQuery } from '@/lib/feature/profile/api/profileApi'
import { useEffect, useState } from 'react'
import { AddProfilePhoto } from './AddProfilePhoto'
import { Controller } from 'react-hook-form'
import {
  UpdateProfileFields,
  updateProfileSchema,
} from '@/lib/feature/profile/schemas/updateProfileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const GeneralInformation = () => {
  const { data: profile } = useGetProfileQuery()
  const [aboutMeValue, setAboutMeValue] = useState<string | undefined>(profile?.aboutMe)

  const { register, handleSubmit, reset, watch, control, setValue } = useForm<UpdateProfileFields>({
    mode: 'onTouched',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: profile
      ? {
          userName: profile?.userName,
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          city: profile?.city || '',
          country: profile?.country || '',
          region: profile?.region || '',
          dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth) : null,
          aboutMe: profile?.aboutMe || '',
        }
      : undefined,
  })

  const countryFromForm = watch('country') as Country

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
      })
    }
  }, [profile, reset])

  useEffect(() => {
    const cities = cityList[countryFromForm]
    if (cities && cities.length > 0) {
      const firstCity = cities[0].title
      setValue('city', firstCity)
    }
  }, [countryFromForm, setValue])

  const normalizeDateToMidnightUTC = (date: Date): string => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
  }

  const onSubmit = (data: UpdateProfileFields) => {
    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth ? normalizeDateToMidnightUTC(data.dateOfBirth) : null,
    }
    console.log(payload)
  }

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
            <form onSubmit={handleSubmit(onSubmit)} action='#' className='w-full'>
              {/*Форма. Добавить аттрибуты*/}
              <div className='flex w-[740px] flex-col gap-6'>
                {/*Див для остальных полей ввода*/}
                <Input
                  label='Username*'
                  {...register('userName')}
                  placeholder={profile?.userName || ''}
                />
                {/*Сделать звездочку красной, как обязательное поле для ввода(не может быть пустым при первом заполнении)*/}
                <Input
                  label='First Name*'
                  {...register('firstName')}
                  placeholder={profile?.firstName || ''}
                />
                <Input
                  label='Last Name*'
                  {...register('lastName')}
                  placeholder={profile?.lastName || ''}
                />

                <Controller
                  control={control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <DatePicker
                      isOnlySingleMode
                      value={field.value}
                      onValueChange={field.onChange}
                      title='Date of birth'
                    />
                  )}
                />
                {/* <DatePicker
                  title='Date of birth'
                  isOnlySingleMode={true}
                  {...register('dateOfBirth')}
                /> */}
                <div className='flex items-center gap-6'>
                  <Controller
                    control={control}
                    name='country'
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ''}
                        onValueChange={value => {
                          field.onChange(value)
                          setValue('city', '')
                        }}
                        items={countriesList}
                        title='Select your country'
                        placeholder='Country'
                        className='w-[358px]'
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name='city'
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        items={cityList[watch('country') as Country] || []}
                        title='Select your city'
                        placeholder='City'
                        className='w-[358px]'
                      />
                    )}
                  />
                </div>
                <Textarea
                  value={aboutMeValue}
                  {...register('aboutMe')}
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
                  <Button variant='primary' type='submit'>
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
