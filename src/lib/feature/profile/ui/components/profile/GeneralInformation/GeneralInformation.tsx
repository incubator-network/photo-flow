'use client'

import { Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { differenceInYears } from 'date-fns'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/lib/feature/profile/api/profileApi'
import { useEffect, useState } from 'react'
import { useAlert } from '@/components/ui/Alert/AlertContext'
import { cityList, countriesList, Country } from '@/constants/countries&cities'
import {
  UpdateProfileFields,
  updateProfileSchema,
} from '@/lib/feature/profile/schemas/updateProfileSchema'
import { AddProfilePhoto } from '@/app/profile/[id]/ProfileSetings/AddProfilePhoto'
import { Input } from '@/components/ui/input/Input'
import { DatePicker } from '@/components/ui/DatePicker/DatePicker'
import { Select } from '@/components/ui/Select/Select'
import { Button } from '@/components/ui/button/Button'
import { Textarea } from '@/components/ui/textarea/Textarea'

export const normalizeDateToMidnightUTC = (date: Date): string => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
}

export const GeneralInformation = () => {
  const { data: profile } = useGetProfileQuery()
  const [aboutMeValue, setAboutMeValue] = useState<string | undefined>(profile?.aboutMe)
  const [updateProfile, result] = useUpdateProfileMutation()
  const { showAlert } = useAlert()!

  const { register, handleSubmit, reset, watch, control, setValue } = useForm<UpdateProfileFields>({
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: profile
      ? {
          userName: profile?.userName,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          city: profile?.city,
          country: profile?.country,
          region: profile?.region,
          dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth) : null,
          aboutMe: profile?.aboutMe,
        }
      : undefined,
  })

  const checkAge = (birthDate: string | null) => {
    if (birthDate == null) {
      return false
    }

    const age = differenceInYears(new Date(), new Date(birthDate))

    if (age < 13) {
      showAlert({
        message: 'A user under 13 cannot create a profile. <u>Privacy Policy</u>', // ДОДЕЛАТЬ
        type: 'error',
      })
      return false
    }

    if (age > 130) {
      showAlert({ message: 'A user after 130 cannot create a profile', type: 'error' })
      return false
    }

    return true
  }

  const countryFromForm = watch('country') as Country

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
      })
    }
  }, [profile, reset, setValue])

  useEffect(() => {
    const cities = cityList[countryFromForm]
    if (cities && cities.length > 0) {
      setValue('city', profile?.city) // Что-то вызывает перерендер. Обнуляется город. Это костыль, чтобы выбранный город отображался
    }
  }, [countryFromForm, setValue, profile?.city])

  useEffect(() => {
    if (result.isSuccess) {
      showAlert({ message: 'Your settings are saved!', type: 'success' })
    }

    if (result.isError) {
      showAlert({ message: 'Error! Server is not available!', type: 'error' })
    }
  }, [result.isSuccess, showAlert, result.isError])

  const onSubmit = async (data: UpdateProfileFields) => {
    try {
      const payload = {
        ...data,
        dateOfBirth: data.dateOfBirth ? normalizeDateToMidnightUTC(data.dateOfBirth) : null,
      }

      if (payload.dateOfBirth === null) {
        throw new Error('Date of birth is required')
      }

      checkAge(payload?.dateOfBirth)

      if (!checkAge(payload.dateOfBirth)) return

      await updateProfile(payload)
    } catch (error: unknown) {
      if (typeof error === 'string') {
        showAlert({ message: error, type: 'error' })
      } else if (error instanceof Error) {
        showAlert({ message: error.message, type: 'error' })
      } else {
        showAlert({ message: 'Something went wrong', type: 'error' })
      }
    }
  }

  const country = useWatch({
    control,
    name: 'country',
  })
  return (
    <div className={`flex w-[972px] gap-9`}>
      {/*Ширину, возможно, поменять в будущем, без хардкода*/}
      <AddProfilePhoto />
      <form onSubmit={handleSubmit(onSubmit)} action='#' className='w-full'>
        <div className='flex w-[740px] flex-col gap-6'>
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
                defaultDate={profile?.dateOfBirth}
              />
            )}
          />
          <div className='flex items-center gap-6'>
            <Controller
              control={control}
              name='country'
              render={({ field }) => {
                return (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={value => {
                      field.onChange(value)
                    }}
                    items={countriesList}
                    title='Select your country'
                    placeholder='Country'
                    className='w-[358px]'
                  />
                )
              }}
            />
            <Controller
              control={control}
              name='city'
              render={({ field }) => {
                return (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    items={cityList[country as Country] || []}
                    title='Select your city'
                    placeholder='City'
                    className='w-[358px]'
                  />
                )
              }}
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
  )
}
