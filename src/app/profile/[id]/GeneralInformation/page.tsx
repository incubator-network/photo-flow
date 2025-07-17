'use client'

import NoImage from '@/assets/icons/img.svg'
import { Button } from '@/components/ui/button/Button'
import { DatePicker } from '@/components/ui/DatePicker/DatePicker'
import { Input } from '@/components/ui/input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs/Tabs'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { useState } from 'react'

const countriesData = [
  {
    title: 'Belarus',
  },
  {
    title: 'Poland',
  },
  {
    title: 'Russia',
  },
  {
    title: 'UK',
  },
  {
    title: 'Somali',
  },
]

const cityList = [
  // Возможно подгружать список в зависимости от страны
  {
    title: 'Minsk',
  },
  {
    title: 'Wrocław',
  },
  {
    title: 'Moscow',
  },
  {
    title: 'Liverpool',
  },
  {
    title: 'Mogadishu',
  },
]

const GeneralInformation = () => {
  const [countryValue, setCountryValue] = useState('Somali') // добавить default значение
  const [cityValue, setCityValue] = useState('Mogadishu') // добавить default значение
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
          <div className={`w-[972px]`}>
            {/*Ширину, возможно, поменять в будущем, без хардкода*/}
            {/*Основной контент*/}
            {/*Проверить по апи, нужно ли высылать картинку, или же это отдельный запрос. Если отдельный, то вынести див с картинкой из формы(возможно добавить форму под картинку)*/}
            <form action='#' className='flex w-full gap-9'>
              {/*Форма. Добавить аттрибуты*/}
              <div className='flex w-[196px] flex-col items-center'>
                {/*Див для фотки с кнопкой для изменения*/}
                <NoImage className={`bg-dark-500 my-6 h-[192px] w-[192px] rounded-full p-[72px]`} />
                {/*Добавить выражение: если есть фотка, то отобразить ее*/}
                <Button variant='outline'>Add a Profile Photo</Button> {/*Для изменения фотки*/}
              </div>
              <div className='flex w-[740px] flex-col gap-6'>
                {/*Див для остальных полей ввода*/}
                <Input label='Username*' />
                {/*Сделать звездочку красной, как обязательное поле для ввода(не может быть пустым при первом заполнении)*/}
                <Input label='First Name*' />
                <Input label='Last Name*' />
                <DatePicker title='Date of birth' isOnlySingleMode={true} />
                <div className='flex items-center gap-6'>
                  {/*Див для селектов*/}

                  <Select
                    items={countriesData}
                    title='Select your country'
                    placeholder='Country'
                    value={countryValue}
                    onValueChange={setCountryValue}
                    className='w-[358px]'
                  />
                  {/*Сделать списки взаимосвязанными*/}
                  <Select
                    items={cityList}
                    title='Select your city'
                    placeholder='City'
                    value={cityValue}
                    onValueChange={setCityValue}
                    className='w-[358px]'
                  />
                </div>
                <Textarea
                  className={'min-h-[85px] w-full'}
                  placeholder='About Me'
                  textareaLabel='About Me'
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
