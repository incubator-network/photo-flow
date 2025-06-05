import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Input } from '@/components/input/Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'error', 'active', 'focus', 'disabled', 'hover'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['email', 'password', 'search'],
      },
    },
  },

  tags: ['autodocs'],
}
type Story = StoryObj<typeof meta>
export default meta

// //
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Введите текст',
  },
}
export const AllVariants = () => (
  <div className='space-y-4'>
    <Input type='text' placeholder='Default' />
    <Input type='text' variant='active' placeholder='Active' />
    <Input type='text' variant='hover' placeholder='Hover' />
    <Input type='text' variant='focus' placeholder='Focus' />
    <Input type='text' variant='disabled' placeholder='Disabled' disabled />
    <Input type='text' variant='error' placeholder='Error' error='Ошибка' />
  </div>
)

// История с переключением пароля
export const PasswordInput = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      type='password'
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder='Введите пароль'
    />
  )
}

// История с поиском
export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Поиск...',
  },
}

// История для тестирования всех типов
export const AllTypes = () => (
  <div className='space-y-4'>
    <Input type='text' placeholder='Текстовое поле' />
    <Input type='password' placeholder='Пароль' />
    <Input type='email' placeholder='Email' />
    <Input type='search' placeholder='Поиск' />
  </div>
)
