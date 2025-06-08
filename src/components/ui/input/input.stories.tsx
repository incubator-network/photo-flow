import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from '@/components/ui/input/Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    errorText: {
      control: 'text',
      description: 'Текст ошибки под инпутом',
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'error', 'disabled'],
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

export const VariantDefault: Story = {
  args: {
    type: 'text',
    variant: 'default',
    placeholder: 'Введите текст',
  },
}

export const VariantError = {
  args: {
    variant: 'error',
    type: 'search',
    errorText: 'Error text',
  },
}
export const VariantDisabled = () => (
  <Input type='search' variant='disabled' placeholder='Disabled' disabled />
)

// История для тестирования всех типов
export const AllTypes = () => (
  <div className='space-y-4'>
    <Input type='text' placeholder='Текстовое поле' />
    <Input type='password' placeholder='Пароль' />
    <Input type='email' placeholder='Email' />
    <Input type='search' placeholder='Поиск' />
  </div>
)
